import { supabase } from './supabase';

export interface BuildRequest {
  description: string;
  projectType: 'website' | 'mobile-app' | 'pwa' | 'desktop-app';
  framework?: string;
  platforms: string[];
}

export interface DeploymentConfig {
  github?: { repo: string; branch: string };
  netlify?: { siteName: string };
  vercel?: { projectName: string };
  appStores?: string[];
}

class AIPlatformService {
  async processUserRequest(request: BuildRequest) {
    try {
      // Step 1: Analyze user description with AI
      const analysis = await this.analyzeDescription(request.description);
      
      // Step 2: Generate code based on analysis
      const codeGeneration = await this.generateCode({
        ...request,
        analysis
      });
      
      // Step 3: Setup project structure
      const projectSetup = await this.setupProject(codeGeneration);
      
      return {
        success: true,
        generationId: codeGeneration.id,
        projectSetup,
        nextSteps: ['review', 'deploy', 'publish']
      };
    } catch (error) {
      console.error('AI Platform Service Error:', error);
      return { success: false, error: error.message };
    }
  }

  private async analyzeDescription(description: string) {
    const { data, error } = await supabase.functions.invoke('ai-nlp-processor', {
      body: { 
        text: description,
        analysis_type: 'comprehensive',
        include_features: true,
        include_tech_stack: true
      }
    });
    
    if (error) throw error;
    return data;
  }

  private async generateCode(request: any) {
    const { data, error } = await supabase.functions.invoke('code-generator', {
      body: {
        description: request.description,
        project_type: request.projectType,
        framework: request.framework || 'react',
        analysis: request.analysis
      }
    });
    
    if (error) throw error;
    return data;
  }

  private async setupProject(codeGeneration: any) {
    // Create project structure in database
    const { data, error } = await supabase
      .from('generated_projects')
      .insert({
        generation_id: codeGeneration.id,
        project_structure: codeGeneration.structure,
        code_files: codeGeneration.files,
        status: 'ready_for_deployment'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deployToGitHub(generationId: string, config: { repo: string; branch: string }) {
    const { data, error } = await supabase.functions.invoke('github-deploy', {
      body: {
        generation_id: generationId,
        repo_name: config.repo,
        branch: config.branch
      }
    });
    
    if (error) throw error;
    return data;
  }

  async deployToNetlify(generationId: string, config: { siteName: string }) {
    const { data, error } = await supabase.functions.invoke('netlify-deploy', {
      body: {
        generation_id: generationId,
        site_name: config.siteName
      }
    });
    
    if (error) throw error;
    return data;
  }

  async publishToAppStore(generationId: string, store: string) {
    const { data, error } = await supabase.functions.invoke('app-store-publish', {
      body: {
        generation_id: generationId,
        store_type: store
      }
    });
    
    if (error) throw error;
    return data;
  }

  async getTrainingMetrics() {
    const { data, error } = await supabase
      .from('ai_training_modules')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async updateTrainingData(module: string, data: any, accuracy: number) {
    const { data: result, error } = await supabase.functions.invoke('update-ai-training', {
      body: {
        module_name: module,
        training_data: data,
        accuracy_score: accuracy
      }
    });
    
    if (error) throw error;
    return result;
  }
}

export const aiPlatformService = new AIPlatformService();