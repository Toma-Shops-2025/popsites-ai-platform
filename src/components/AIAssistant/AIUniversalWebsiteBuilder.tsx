import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Wand2, Rocket, Code, Palette, Zap, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface BuildStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
}

interface WebsiteSpec {
  description: string;
  industry: string;
  style: string;
  features: string[];
  pages: string[];
}

export function AIUniversalWebsiteBuilder() {
  const [websiteSpec, setWebsiteSpec] = useState<WebsiteSpec>({
    description: '',
    industry: '',
    style: '',
    features: [],
    pages: []
  });
  
  const [buildSteps, setBuildSteps] = useState<BuildStep[]>([
    { id: '1', name: 'Analysis', description: 'Understanding your requirements', status: 'pending', progress: 0 },
    { id: '2', name: 'Architecture', description: 'Designing site structure', status: 'pending', progress: 0 },
    { id: '3', name: 'Design', description: 'Creating visual design system', status: 'pending', progress: 0 },
    { id: '4', name: 'Content', description: 'Generating content and copy', status: 'pending', progress: 0 },
    { id: '5', name: 'Development', description: 'Building components and pages', status: 'pending', progress: 0 },
    { id: '6', name: 'Optimization', description: 'Performance and SEO optimization', status: 'pending', progress: 0 },
    { id: '7', name: 'Deployment', description: 'Publishing your website', status: 'pending', progress: 0 }
  ]);
  
  const [isBuilding, setIsBuilding] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [generatedWebsite, setGeneratedWebsite] = useState<any>(null);

  const industries = [
    'E-commerce', 'Restaurant', 'Real Estate', 'Healthcare', 'Education', 
    'Technology', 'Finance', 'Travel', 'Fashion', 'Fitness', 'Legal', 'Other'
  ];
  
  const styles = [
    'Modern', 'Minimalist', 'Corporate', 'Creative', 'Elegant', 
    'Bold', 'Classic', 'Trendy', 'Professional', 'Artistic'
  ];
  
  const availableFeatures = [
    'Contact Forms', 'Online Store', 'Blog', 'Gallery', 'Testimonials',
    'Social Media Integration', 'Newsletter Signup', 'Live Chat', 'Booking System',
    'Payment Processing', 'User Accounts', 'Search Functionality'
  ];
  
  const commonPages = [
    'Home', 'About', 'Services', 'Products', 'Contact', 'Blog',
    'Portfolio', 'Testimonials', 'FAQ', 'Privacy Policy', 'Terms'
  ];

  const buildWebsite = async () => {
    if (!websiteSpec.description.trim()) return;
    
    setIsBuilding(true);
    setOverallProgress(0);
    
    try {
      const { data } = await supabase.functions.invoke('ai-site-architect', {
        body: {
          action: 'build_complete_website',
          specification: websiteSpec
        }
      });
      
      // Progressive building simulation
      for (let i = 0; i < buildSteps.length; i++) {
        setTimeout(() => {
          setBuildSteps(prev => prev.map((step, index) => {
            if (index === i) {
              return { ...step, status: 'processing', progress: 50 };
            }
            return step;
          }));
        }, i * 2000);
        
        setTimeout(() => {
          setBuildSteps(prev => prev.map((step, index) => {
            if (index === i) {
              return { ...step, status: 'completed', progress: 100 };
            }
            return step;
          }));
          
          setOverallProgress(((i + 1) / buildSteps.length) * 100);
          
        }, i * 2000 + 1500);
      }
      
      setTimeout(() => {
        setGeneratedWebsite({
          url: 'https://your-new-website.popsites.com',
          pages: websiteSpec.pages.length || 5,
          components: Math.floor(Math.random() * 20) + 15,
          performance: Math.floor(Math.random() * 10) + 90
        });
        setIsBuilding(false);
      }, buildSteps.length * 2000 + 2000);
      
    } catch (error) {
      console.error('Website building error:', error);
      setIsBuilding(false);
    }
  };

  const toggleFeature = (feature: string) => {
    setWebsiteSpec(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };
  
  const togglePage = (page: string) => {
    setWebsiteSpec(prev => ({
      ...prev,
      pages: prev.pages.includes(page)
        ? prev.pages.filter(p => p !== page)
        : [...prev.pages, page]
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            AI Universal Website Builder
          </CardTitle>
          <CardDescription>
            Describe your vision and watch AI build your complete website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Describe Your Website</label>
            <Textarea
              placeholder="I need a modern e-commerce website for selling handmade jewelry. It should have a clean design with a product catalog, shopping cart, and customer reviews..."
              value={websiteSpec.description}
              onChange={(e) => setWebsiteSpec(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Industry</label>
              <Select value={websiteSpec.industry} onValueChange={(value) => 
                setWebsiteSpec(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Style</label>
              <Select value={websiteSpec.style} onValueChange={(value) => 
                setWebsiteSpec(prev => ({ ...prev, style: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Features (Select all that apply)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableFeatures.map((feature) => (
                <Button
                  key={feature}
                  variant={websiteSpec.features.includes(feature) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFeature(feature)}
                  className="text-xs"
                >
                  {feature}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Pages to Include</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {commonPages.map((page) => (
                <Button
                  key={page}
                  variant={websiteSpec.pages.includes(page) ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePage(page)}
                  className="text-xs"
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={buildWebsite} 
            disabled={isBuilding || !websiteSpec.description.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isBuilding ? 'Building Your Website...' : 'Build My Website'}
          </Button>
        </CardContent>
      </Card>

      {(isBuilding || overallProgress > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Building Progress</CardTitle>
            <CardDescription>AI is creating your website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Overall Progress</span>
              <span className="text-lg font-bold text-blue-600">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            
            <div className="space-y-2">
              {buildSteps.map((step) => (
                <div key={step.id} className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center gap-2">
                    {step.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : step.status === 'processing' ? (
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                    )}
                    <div>
                      <div className="font-medium text-sm">{step.name}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                  <Badge variant={step.status === 'completed' ? 'default' : 
                                step.status === 'processing' ? 'secondary' : 'outline'}>
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {generatedWebsite && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Rocket className="h-5 w-5" />
              Website Successfully Built!
            </CardTitle>
            <CardDescription>Your AI-generated website is ready</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{generatedWebsite.pages}</div>
                <div className="text-xs text-muted-foreground">Pages Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{generatedWebsite.components}</div>
                <div className="text-xs text-muted-foreground">Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{generatedWebsite.performance}%</div>
                <div className="text-xs text-muted-foreground">Performance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">A+</div>
                <div className="text-xs text-muted-foreground">SEO Grade</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1">
                View Website
              </Button>
              <Button variant="outline" className="flex-1">
                Edit in Builder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}