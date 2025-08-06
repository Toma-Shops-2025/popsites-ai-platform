import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Wand2, Rocket, Zap, Globe, ShoppingCart, Users, Camera, Music, BookOpen, Briefcase } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface BuildRequest {
  prompt: string;
  siteType: string;
  features: string[];
  style: string;
  industry: string;
  urgency: string;
}

export const AIUniversalSiteBuilder: React.FC = () => {
  const [buildRequest, setBuildRequest] = useState<BuildRequest>({
    prompt: '',
    siteType: '',
    features: [],
    style: 'modern',
    industry: '',
    urgency: 'standard'
  });
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const siteTypes = [
    { id: 'ecommerce', name: 'E-commerce Store', icon: ShoppingCart },
    { id: 'business', name: 'Business Website', icon: Briefcase },
    { id: 'portfolio', name: 'Portfolio/Gallery', icon: Camera },
    { id: 'blog', name: 'Blog/News Site', icon: BookOpen },
    { id: 'community', name: 'Community/Social', icon: Users },
    { id: 'entertainment', name: 'Entertainment/Media', icon: Music }
  ];

  const commonFeatures = [
    'Contact Forms', 'Payment Processing', 'User Accounts', 'Search Functionality',
    'Social Media Integration', 'Email Newsletter', 'Live Chat', 'Analytics',
    'SEO Optimization', 'Mobile App', 'Multi-language', 'Admin Dashboard'
  ];

  const handleFeatureToggle = (feature: string) => {
    setBuildRequest(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleBuild = async () => {
    if (!buildRequest.prompt.trim()) return;
    
    setIsBuilding(true);
    setBuildProgress(0);
    
    const buildSteps = [
      'Analyzing your requirements...',
      'Designing site architecture...',
      'Creating custom components...',
      'Generating content sections...',
      'Implementing requested features...',
      'Optimizing performance...',
      'Testing responsiveness...',
      'Finalizing your website...'
    ];
    
    try {
      for (let i = 0; i < buildSteps.length; i++) {
        setCurrentStep(buildSteps[i]);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setBuildProgress((i + 1) * (100 / buildSteps.length));
      }
      
      // Call AI service
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: buildRequest.prompt,
          context: 'universal-site-builder',
          config: buildRequest
        }
      });
      
      if (error) throw error;
      
      setCurrentStep('Build completed successfully!');
    } catch (error) {
      console.error('Build failed:', error);
      setCurrentStep('Build failed. Please try again.');
    } finally {
      setTimeout(() => setIsBuilding(false), 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-blue-600" />
            Universal AI Site Builder
          </CardTitle>
          <p className="text-muted-foreground">
            Describe anything you want to build - our AI will create it completely for you
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              What do you want to build? (Be as detailed as possible)
            </label>
            <Textarea
              value={buildRequest.prompt}
              onChange={(e) => setBuildRequest({...buildRequest, prompt: e.target.value})}
              placeholder="Example: 'I need a modern e-commerce site for selling organic skincare products. It should have a clean design, product reviews, subscription options, blog section, and integration with Instagram. I want a green and white color scheme with nature-inspired imagery.'"
              className="min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-3">Site Type</label>
              <div className="grid grid-cols-2 gap-2">
                {siteTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        buildRequest.siteType === type.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setBuildRequest({...buildRequest, siteType: type.id})}
                    >
                      <CardContent className="p-3 text-center">
                        <Icon className="h-6 w-6 mx-auto mb-1" />
                        <p className="text-xs font-medium">{type.name}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Additional Features</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {commonFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={buildRequest.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <label htmlFor={feature} className="text-xs cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Style</label>
              <Select value={buildRequest.style} onValueChange={(value) => setBuildRequest({...buildRequest, style: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="elegant">Elegant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <Input
                value={buildRequest.industry}
                onChange={(e) => setBuildRequest({...buildRequest, industry: e.target.value})}
                placeholder="e.g., Healthcare, Fashion"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <Select value={buildRequest.urgency} onValueChange={(value) => setBuildRequest({...buildRequest, urgency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isBuilding && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Building Your Site</span>
                    <span className="text-sm text-muted-foreground">{Math.round(buildProgress)}%</span>
                  </div>
                  <Progress value={buildProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{currentStep}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={handleBuild}
              disabled={isBuilding || !buildRequest.prompt.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Rocket className="h-4 w-4 mr-2" />
              {isBuilding ? 'Building...' : 'Build My Site'}
            </Button>
            
            <Button variant="outline" disabled={isBuilding}>
              <Zap className="h-4 w-4 mr-2" />
              Quick Build
            </Button>
            
            <Button variant="outline" disabled={isBuilding}>
              <Globe className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>

          {buildRequest.features.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Selected Features:</p>
              <div className="flex flex-wrap gap-1">
                {buildRequest.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};