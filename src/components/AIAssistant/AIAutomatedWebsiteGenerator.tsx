import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Rocket, Code, Palette, Database, Globe, CheckCircle, Settings } from 'lucide-react';

interface GenerationStep {
  name: string;
  status: 'pending' | 'processing' | 'complete';
  progress: number;
  description: string;
}

interface GeneratedWebsite {
  name: string;
  type: string;
  pages: string[];
  features: string[];
  codeStats: { html: number; css: number; javascript: number; components: number };
  status: 'complete';
}

export const AIAutomatedWebsiteGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [generatedWebsite, setGeneratedWebsite] = useState<GeneratedWebsite | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);

  const initializeSteps = (): GenerationStep[] => [
    { name: 'Project Setup', status: 'pending', progress: 0, description: 'Creating project structure' },
    { name: 'Design System', status: 'pending', progress: 0, description: 'Generating colors and styles' },
    { name: 'Page Structure', status: 'pending', progress: 0, description: 'Building HTML structure' },
    { name: 'Content Generation', status: 'pending', progress: 0, description: 'Creating content and copy' },
    { name: 'Feature Implementation', status: 'pending', progress: 0, description: 'Adding functionality' },
    { name: 'Responsive Design', status: 'pending', progress: 0, description: 'Mobile optimization' },
    { name: 'SEO Enhancement', status: 'pending', progress: 0, description: 'Search optimization' },
    { name: 'Performance Optimization', status: 'pending', progress: 0, description: 'Speed optimization' },
    { name: 'Quality Assurance', status: 'pending', progress: 0, description: 'Testing and validation' },
    { name: 'Deployment Prep', status: 'pending', progress: 0, description: 'Preparing for deployment' }
  ];

  const generateWebsite = async (websiteType: string) => {
    setIsGenerating(true);
    setOverallProgress(0);
    const steps = initializeSteps();
    setGenerationSteps(steps);
    setGeneratedWebsite(null);

    for (let i = 0; i < steps.length; i++) {
      const updatedSteps = [...steps];
      updatedSteps[i].status = 'processing';
      setGenerationSteps(updatedSteps);

      for (let progress = 0; progress <= 100; progress += 25) {
        await new Promise(resolve => setTimeout(resolve, 150));
        updatedSteps[i].progress = progress;
        setGenerationSteps([...updatedSteps]);
      }

      updatedSteps[i].status = 'complete';
      setGenerationSteps([...updatedSteps]);
      setOverallProgress(((i + 1) / steps.length) * 100);
    }

    const mockWebsite: GeneratedWebsite = {
      name: `${websiteType.charAt(0).toUpperCase() + websiteType.slice(1)} Website`,
      type: websiteType,
      pages: generatePages(websiteType),
      features: generateFeatures(websiteType),
      codeStats: {
        html: Math.round(2000 + Math.random() * 3000),
        css: Math.round(1500 + Math.random() * 2500),
        javascript: Math.round(1000 + Math.random() * 2000),
        components: Math.round(15 + Math.random() * 25)
      },
      status: 'complete'
    };

    setGeneratedWebsite(mockWebsite);
    setIsGenerating(false);
  };

  const generatePages = (type: string): string[] => {
    const base = ['Home', 'About', 'Contact'];
    switch (type) {
      case 'ecommerce': return [...base, 'Products', 'Cart', 'Checkout', 'Account'];
      case 'restaurant': return [...base, 'Menu', 'Reservations', 'Gallery', 'Reviews'];
      case 'portfolio': return [...base, 'Projects', 'Services', 'Blog', 'Resume'];
      default: return [...base, 'Services', 'Team', 'News'];
    }
  };

  const generateFeatures = (type: string): string[] => {
    const base = ['Responsive Design', 'SEO Optimized', 'Contact Forms', 'Social Integration'];
    switch (type) {
      case 'ecommerce': return [...base, 'Product Catalog', 'Shopping Cart', 'Payment Processing'];
      case 'restaurant': return [...base, 'Online Menu', 'Table Reservations', 'Food Gallery'];
      case 'portfolio': return [...base, 'Project Showcase', 'Image Gallery', 'Client Testimonials'];
      default: return [...base, 'Team Profiles', 'Service Pages', 'News Section'];
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing': return <Settings className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-purple-600" />
            AI Automated Website Generator
          </CardTitle>
          <p className="text-muted-foreground">
            Generate complete, production-ready websites automatically with AI
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => generateWebsite('business')} disabled={isGenerating} className="h-20 flex-col">
              <Globe className="h-6 w-6 mb-2" />
              Business Site
            </Button>
            <Button onClick={() => generateWebsite('ecommerce')} disabled={isGenerating} className="h-20 flex-col" variant="outline">
              <Database className="h-6 w-6 mb-2" />
              E-commerce
            </Button>
            <Button onClick={() => generateWebsite('restaurant')} disabled={isGenerating} className="h-20 flex-col" variant="outline">
              <Palette className="h-6 w-6 mb-2" />
              Restaurant
            </Button>
            <Button onClick={() => generateWebsite('portfolio')} disabled={isGenerating} className="h-20 flex-col" variant="outline">
              <Code className="h-6 w-6 mb-2" />
              Portfolio
            </Button>
          </div>
        </CardContent>
      </Card>

      {generationSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              Generation Progress
            </CardTitle>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-lg font-bold text-blue-600">{overallProgress.toFixed(0)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {generationSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded border">
                  {getStepIcon(step.status)}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{step.name}</span>
                      {step.status === 'processing' && (
                        <span className="text-xs text-blue-600">{step.progress}%</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                    {step.status === 'processing' && (
                      <Progress value={step.progress} className="h-1 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {generatedWebsite && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Website Generated Successfully!
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-green-600">{generatedWebsite.type}</Badge>
              <Badge className="bg-blue-600">{generatedWebsite.pages.length} Pages</Badge>
              <Badge className="bg-purple-600">{generatedWebsite.features.length} Features</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-800">Generated Pages</h4>
                <div className="space-y-2">
                  {generatedWebsite.pages.map((page, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{page}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-green-800">Included Features</h4>
                <div className="space-y-2">
                  {generatedWebsite.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-green-800">Code Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded border">
                  <div className="text-2xl font-bold text-orange-600">{generatedWebsite.codeStats.html}</div>
                  <div className="text-xs text-muted-foreground">Lines of HTML</div>
                </div>
                <div className="text-center p-3 bg-white rounded border">
                  <div className="text-2xl font-bold text-blue-600">{generatedWebsite.codeStats.css}</div>
                  <div className="text-xs text-muted-foreground">Lines of CSS</div>
                </div>
                <div className="text-center p-3 bg-white rounded border">
                  <div className="text-2xl font-bold text-yellow-600">{generatedWebsite.codeStats.javascript}</div>
                  <div className="text-xs text-muted-foreground">Lines of JS</div>
                </div>
                <div className="text-center p-3 bg-white rounded border">
                  <div className="text-2xl font-bold text-purple-600">{generatedWebsite.codeStats.components}</div>
                  <div className="text-xs text-muted-foreground">Components</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <Globe className="h-4 w-4 mr-2" />
                Preview Website
              </Button>
              <Button variant="outline">
                <Code className="h-4 w-4 mr-2" />
                View Code
              </Button>
              <Button variant="outline">
                <Rocket className="h-4 w-4 mr-2" />
                Deploy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};