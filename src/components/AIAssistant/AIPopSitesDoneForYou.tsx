import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Rocket, Settings, Eye, Zap, Globe, ShoppingCart, Users, BarChart3 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SiteConfig {
  industry: string;
  businessName: string;
  description: string;
  features: string[];
  style: string;
  colors: string[];
}

export const AIPopSitesDoneForYou: React.FC = () => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    industry: '',
    businessName: '',
    description: '',
    features: [],
    style: 'modern',
    colors: ['#3B82F6', '#1E40AF']
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [generatedSite, setGeneratedSite] = useState<any>(null);

  const industries = [
    { name: 'E-commerce', icon: ShoppingCart, desc: 'Online stores & marketplaces' },
    { name: 'Restaurant', icon: Users, desc: 'Food & dining experiences' },
    { name: 'Real Estate', icon: Globe, desc: 'Property listings & agencies' },
    { name: 'Healthcare', icon: BarChart3, desc: 'Medical & wellness services' },
    { name: 'Education', icon: Users, desc: 'Schools & online courses' },
    { name: 'Technology', icon: Zap, desc: 'Tech companies & startups' }
  ];

  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Simulate AI generation process
      const steps = [
        'Analyzing requirements...',
        'Generating design system...',
        'Creating page layouts...',
        'Adding content sections...',
        'Optimizing for mobile...',
        'Finalizing your site...'
      ];
      
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress((i + 1) * (100 / steps.length));
      }
      
      // Call AI service to generate site
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: `Generate a complete website for: ${userPrompt}`,
          context: 'popsites-done-for-you',
          config: siteConfig
        }
      });
      
      if (data) {
        setGeneratedSite(data);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600" />
            PopSites Done-For-You AI
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Just tell us what you need - we'll build it completely for you
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="describe" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="describe">Describe</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="generate">Generate</TabsTrigger>
            </TabsList>
            
            <TabsContent value="describe" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  What kind of website do you need?
                </label>
                <Textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="E.g., 'I need an e-commerce site for selling handmade jewelry with payment processing, inventory management, and customer reviews'"
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <Card 
                      key={industry.name} 
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => setSiteConfig({...siteConfig, industry: industry.name})}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium text-sm">{industry.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{industry.desc}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="customize" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <Input
                    value={siteConfig.businessName}
                    onChange={(e) => setSiteConfig({...siteConfig, businessName: e.target.value})}
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <Input
                    value={siteConfig.industry}
                    onChange={(e) => setSiteConfig({...siteConfig, industry: e.target.value})}
                    placeholder="Your industry"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Business Description</label>
                <Textarea
                  value={siteConfig.description}
                  onChange={(e) => setSiteConfig({...siteConfig, description: e.target.value})}
                  placeholder="Brief description of your business"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="generate" className="space-y-4">
              {isGenerating && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Generating your complete website...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="text-center text-sm text-muted-foreground">
                    This may take a few minutes. We're creating everything from scratch!
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !userPrompt.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate Complete Site'}
                </Button>
                
                {generatedSite && (
                  <>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Site
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                  </>
                )}
              </div>
              
              {generatedSite && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Site is Ready!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      We've generated a complete website based on your requirements.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Mobile Responsive</Badge>
                      <Badge variant="secondary">SEO Optimized</Badge>
                      <Badge variant="secondary">Fast Loading</Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};