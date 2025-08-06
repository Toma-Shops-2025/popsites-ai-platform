import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Sparkles, Eye, Download, Share, Settings, Zap, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface GenerationStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  duration?: number;
}

interface GeneratedSite {
  id: string;
  name: string;
  type: string;
  pages: string[];
  features: string[];
  designStyle: string;
  previewUrl?: string;
}

export const AIIntelligentSiteGenerator: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [generationSteps] = useState<GenerationStep[]>([
    {
      id: 'analyze',
      name: 'Analyzing Requirements',
      description: 'Understanding your needs and industry requirements',
      status: 'pending'
    },
    {
      id: 'design',
      name: 'Creating Design System',
      description: 'Generating colors, fonts, and visual style',
      status: 'pending'
    },
    {
      id: 'structure',
      name: 'Building Site Structure',
      description: 'Creating pages, navigation, and content hierarchy',
      status: 'pending'
    },
    {
      id: 'content',
      name: 'Generating Content',
      description: 'Writing copy, selecting images, and creating forms',
      status: 'pending'
    },
    {
      id: 'features',
      name: 'Adding Functionality',
      description: 'Implementing interactive features and integrations',
      status: 'pending'
    },
    {
      id: 'optimize',
      name: 'Optimizing Performance',
      description: 'Ensuring mobile responsiveness and fast loading',
      status: 'pending'
    }
  ]);

  const examplePrompts = [
    "Create a modern e-commerce store for handmade jewelry with payment processing and inventory management",
    "Build a restaurant website with online ordering, menu display, and table reservations",
    "Design a portfolio site for a photographer with gallery, client testimonials, and booking system",
    "Generate a landing page for a SaaS product with pricing tiers and free trial signup",
    "Create a real estate website with property listings, search filters, and agent profiles"
  ];

  const handleGenerate = async () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    setCurrentStep(0);
    
    try {
      // Simulate step-by-step generation
      for (let i = 0; i < generationSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Call AI service
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userInput,
          context: 'intelligent-site-generation',
          generateComplete: true
        }
      });
      
      // Mock generated site data
      const mockSite: GeneratedSite = {
        id: 'site-' + Date.now(),
        name: 'Your Generated Website',
        type: 'E-commerce Store',
        pages: ['Home', 'Products', 'About', 'Contact', 'Checkout'],
        features: ['Shopping Cart', 'Payment Processing', 'User Accounts', 'Product Search', 'Reviews'],
        designStyle: 'Modern & Clean',
        previewUrl: '#preview'
      };
      
      setGeneratedSite(mockSite);
      
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep && isGenerating) return 'processing';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Intelligent Site Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Describe your website needs - AI will build it completely
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="result">Result</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Describe your website in detail
                </label>
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="E.g., I need a professional e-commerce website for selling organic skincare products. It should have a clean, modern design with product categories, customer reviews, secure checkout, and integration with social media..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Example prompts:</p>
                <div className="space-y-2">
                  {examplePrompts.map((prompt, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => setUserInput(prompt)}
                    >
                      <p className="text-sm">{prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !userInput.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                <Wand2 className="h-5 w-5 mr-2" />
                {isGenerating ? 'Generating Your Website...' : 'Generate Complete Website'}
              </Button>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4">
              {isGenerating && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Building Your Website</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our AI is creating a complete website based on your requirements
                    </p>
                    <Progress value={(currentStep / generationSteps.length) * 100} className="h-3" />
                  </div>
                  
                  <div className="space-y-3">
                    {generationSteps.map((step, index) => {
                      const status = getStepStatus(index);
                      return (
                        <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg border">
                          <div className="flex-shrink-0">
                            {status === 'completed' && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {status === 'processing' && <Zap className="h-5 w-5 text-blue-600 animate-pulse" />}
                            {status === 'pending' && <div className="h-5 w-5 rounded-full border-2 border-muted" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{step.name}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <Badge 
                            variant={status === 'completed' ? 'default' : 
                                   status === 'processing' ? 'secondary' : 'outline'}
                          >
                            {status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {!isGenerating && (
                <div className="text-center py-8">
                  <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Start generation to see progress</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="result" className="space-y-4">
              {generatedSite ? (
                <div className="space-y-4">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5" />
                        Website Generated Successfully!
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold mb-2">Site Details</h4>
                          <p className="text-sm mb-1"><strong>Name:</strong> {generatedSite.name}</p>
                          <p className="text-sm mb-1"><strong>Type:</strong> {generatedSite.type}</p>
                          <p className="text-sm"><strong>Style:</strong> {generatedSite.designStyle}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Pages Created</h4>
                          <div className="flex flex-wrap gap-1">
                            {generatedSite.pages.map((page, index) => (
                              <Badge key={index} variant="outline">{page}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Features Included</h4>
                        <div className="flex flex-wrap gap-1">
                          {generatedSite.features.map((feature, index) => (
                            <Badge key={index} variant="secondary">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap">
                        <Button>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview Site
                        </Button>
                        <Button variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Customize
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline">
                          <Share className="h-4 w-4 mr-2" />
                          Publish
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Wand2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Generate a website to see results</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};