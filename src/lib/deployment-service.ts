import { supabase } from './supabase';

export interface DeploymentConfig {
  platform: 'netlify' | 'vercel' | 'github' | 'firebase';
  projectName: string;
  domain?: string;
  environment?: 'production' | 'preview' | 'development';
  buildCommand?: string;
  outputDirectory?: string;
  environmentVariables?: Record<string, string>;
}

export interface DeploymentResult {
  success: boolean;
  deploymentUrl?: string;
  deploymentId?: string;
  error?: string;
  logs?: string;
}

export class DeploymentService {
  private static instance: DeploymentService;

  public static getInstance(): DeploymentService {
    if (!DeploymentService.instance) {
      DeploymentService.instance = new DeploymentService();
    }
    return DeploymentService.instance;
  }

  async deployToNetlify(projectData: any, config: DeploymentConfig): Promise<DeploymentResult> {
    try {
      const netlifyToken = import.meta.env.VITE_NETLIFY_ACCESS_TOKEN;
      
      if (!netlifyToken) {
        throw new Error('Netlify access token not configured');
      }

      // Create Netlify site
      const siteResponse = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${netlifyToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: config.projectName,
          custom_domain: config.domain,
        }),
      });

      if (!siteResponse.ok) {
        throw new Error('Failed to create Netlify site');
      }

      const siteData = await siteResponse.json();
      const siteId = siteData.id;

      // Generate build files
      const buildFiles = await this.generateBuildFiles(projectData);

      // Deploy files to Netlify
      const deployResponse = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${netlifyToken}`,
          'Content-Type': 'application/zip',
        },
        body: buildFiles,
      });

      if (!deployResponse.ok) {
        throw new Error('Failed to deploy to Netlify');
      }

      const deployData = await deployResponse.json();

      // Save deployment record
      await this.saveDeploymentRecord({
        projectId: projectData.id,
        platform: 'netlify',
        deploymentUrl: siteData.ssl_url || siteData.url,
        deploymentId: deployData.id,
        status: 'deployed',
        config: config,
      });

      return {
        success: true,
        deploymentUrl: siteData.ssl_url || siteData.url,
        deploymentId: deployData.id,
      };
    } catch (error) {
      console.error('Netlify deployment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async deployToVercel(projectData: any, config: DeploymentConfig): Promise<DeploymentResult> {
    try {
      const vercelToken = import.meta.env.VITE_VERCEL_ACCESS_TOKEN;
      
      if (!vercelToken) {
        throw new Error('Vercel access token not configured');
      }

      // Create Vercel project
      const projectResponse = await fetch('https://api.vercel.com/v9/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: config.projectName,
          framework: 'create-react-app', // or detect from project
        }),
      });

      if (!projectResponse.ok) {
        throw new Error('Failed to create Vercel project');
      }

      const projectInfo = await projectResponse.json();

      // Generate and upload files
      const buildFiles = await this.generateBuildFiles(projectData);
      
      // Deploy to Vercel
      const deployResponse = await fetch(`https://api.vercel.com/v13/deployments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: config.projectName,
          files: buildFiles,
          projectId: projectInfo.id,
          target: config.environment || 'production',
        }),
      });

      if (!deployResponse.ok) {
        throw new Error('Failed to deploy to Vercel');
      }

      const deployData = await deployResponse.json();

      // Save deployment record
      await this.saveDeploymentRecord({
        projectId: projectData.id,
        platform: 'vercel',
        deploymentUrl: deployData.url,
        deploymentId: deployData.id,
        status: 'deployed',
        config: config,
      });

      return {
        success: true,
        deploymentUrl: deployData.url,
        deploymentId: deployData.id,
      };
    } catch (error) {
      console.error('Vercel deployment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async deployToGitHub(projectData: any, config: DeploymentConfig): Promise<DeploymentResult> {
    try {
      const githubToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
      
      if (!githubToken) {
        throw new Error('GitHub access token not configured');
      }

      // Create GitHub repository
      const repoResponse = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: config.projectName,
          description: `Website generated by PopSites AI`,
          private: false,
          auto_init: true,
        }),
      });

      if (!repoResponse.ok) {
        throw new Error('Failed to create GitHub repository');
      }

      const repoData = await repoResponse.json();

      // Generate build files
      const buildFiles = await this.generateBuildFiles(projectData);

      // Upload files to GitHub
      const uploadResponse = await fetch(`https://api.github.com/repos/${repoData.owner.login}/${repoData.name}/contents`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Initial commit - Website generated by PopSites AI',
          content: btoa(JSON.stringify(buildFiles)),
        }),
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload files to GitHub');
      }

      // Save deployment record
      await this.saveDeploymentRecord({
        projectId: projectData.id,
        platform: 'github',
        deploymentUrl: repoData.html_url,
        deploymentId: repoData.id.toString(),
        status: 'deployed',
        config: config,
      });

      return {
        success: true,
        deploymentUrl: repoData.html_url,
        deploymentId: repoData.id.toString(),
      };
    } catch (error) {
      console.error('GitHub deployment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async generateBuildFiles(projectData: any): Promise<Blob> {
    // Generate the actual website files based on project data
    const files = {
      'index.html': this.generateHTML(projectData),
      'styles.css': this.generateCSS(projectData),
      'script.js': this.generateJavaScript(projectData),
      'package.json': this.generatePackageJson(projectData),
    };

    // Convert to zip file (simplified - in real implementation, use a proper zip library)
    const fileBlob = new Blob([JSON.stringify(files)], { type: 'application/json' });
    return fileBlob;
  }

  private generateHTML(projectData: any): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectData.name || 'PopSites Website'}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        ${this.renderElements(projectData.elements || [])}
    </div>
    <script src="script.js"></script>
</body>
</html>`;
  }

  private generateCSS(projectData: any): string {
    return `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}

#app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

${this.generateElementStyles(projectData.elements || [])}
`;
  }

  private generateJavaScript(projectData: any): string {
    return `
// PopSites AI Generated JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Add any interactive functionality here
    ${this.generateInteractiveFeatures(projectData.elements || [])}
});
`;
  }

  private generatePackageJson(projectData: any): string {
    return JSON.stringify({
      name: projectData.name || 'popsites-website',
      version: '1.0.0',
      description: 'Website generated by PopSites AI',
      main: 'index.html',
      scripts: {
        start: 'serve .',
        build: 'echo "Build complete"',
      },
      dependencies: {},
      devDependencies: {
        serve: '^14.0.0',
      },
    }, null, 2);
  }

  private renderElements(elements: any[]): string {
    return elements.map(element => {
      switch (element.type) {
        case 'text':
          return `<p class="text-element">${element.content}</p>`;
        case 'heading':
          return `<h1 class="heading-element">${element.content}</h1>`;
        case 'button':
          return `<button class="button-element">${element.content}</button>`;
        case 'image':
          return `<img src="${element.content || 'https://via.placeholder.com/300x200'}" alt="Image" class="image-element">`;
        case 'card':
          return `<div class="card-element"><h3>Card Title</h3><p>${element.content}</p></div>`;
        default:
          return `<div class="${element.type}-element">${element.content}</div>`;
      }
    }).join('\n');
  }

  private generateElementStyles(elements: any[]): string {
    return elements.map(element => {
      const baseStyles = `
        position: absolute;
        left: ${element.x}px;
        top: ${element.y}px;
      `;

      switch (element.type) {
        case 'text':
          return `.text-element { ${baseStyles} font-size: 16px; }`;
        case 'heading':
          return `.heading-element { ${baseStyles} font-size: 32px; font-weight: bold; }`;
        case 'button':
          return `.button-element { ${baseStyles} padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }`;
        case 'image':
          return `.image-element { ${baseStyles} max-width: 100%; height: auto; }`;
        case 'card':
          return `.card-element { ${baseStyles} padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }`;
        default:
          return `.${element.type}-element { ${baseStyles} }`;
      }
    }).join('\n');
  }

  private generateInteractiveFeatures(elements: any[]): string {
    return elements
      .filter(element => element.type === 'button')
      .map((_, index) => `
        document.querySelectorAll('.button-element')[${index}].addEventListener('click', function() {
            alert('Button clicked!');
        });
      `).join('\n');
  }

  private async saveDeploymentRecord(deploymentData: any): Promise<void> {
    try {
      const { error } = await supabase
        .from('deployments')
        .insert(deploymentData);

      if (error) {
        console.error('Error saving deployment record:', error);
      }
    } catch (error) {
      console.error('Error saving deployment record:', error);
    }
  }

  async getDeploymentStatus(deploymentId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('deployments')
        .select('*')
        .eq('deployment_id', deploymentId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching deployment status:', error);
      return null;
    }
  }

  async listDeployments(projectId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('deployments')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching deployments:', error);
      return [];
    }
  }
}

export const deploymentService = DeploymentService.getInstance(); 