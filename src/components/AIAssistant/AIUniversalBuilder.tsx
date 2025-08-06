import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Globe, Palette, Code, Zap } from 'lucide-react';
import { AIService } from './AIService';

interface AIUniversalBuilderProps {
  onComplete: (website: any) => void;
}

const AIUniversalBuilder: React.FC<AIUniversalBuilderProps> = ({ onComplete }) => {
  const [userRequest, setUserRequest] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [detectedType, setDetectedType] = useState('');

  const buildingSteps = [
    { id: 'analyze', label: 'Understanding your request', icon: Sparkles },
    { id: 'plan', label: 'Planning website structure', icon: Globe },
    { id: 'design', label: 'Creating design system', icon: Palette },
    { id: 'build', label: 'Building components', icon: Code },
    { id: 'optimize', label: 'Optimizing performance', icon: Zap },
    { id: 'finalize', label: 'Finalizing website', icon: Sparkles }
  ];

  const exampleRequests = [
    'Build me a restaurant website with online ordering and table reservations',
    'Create a portfolio site for a photographer with image galleries',
    'I need an e-commerce store for selling handmade crafts',
    'Build a SaaS landing page with pricing tiers and testimonials',
    'Create a blog website for travel stories with social sharing',
    'I want a fitness coaching website with class schedules'
  ];

  const detectWebsiteType = (request: string) => {
    const types = {
      'e-commerce': ['store', 'shop', 'sell', 'buy', 'product', 'cart', 'checkout'],
      'portfolio': ['portfolio', 'gallery', 'showcase', 'work', 'artist', 'designer'],
      'restaurant': ['restaurant', 'food', 'menu', 'order', 'delivery', 'dining'],
      'blog': ['blog', 'article', 'news', 'content', 'story', 'post'],
      'business': ['company', 'service', 'professional', 'corporate', 'agency'],
      'landing': ['landing', 'saas', 'app', 'software', 'pricing', 'signup']
    };

    const lowerRequest = request.toLowerCase();
    for (const [type, keywords] of Object.entries(types)) {
      if (keywords.some(keyword => lowerRequest.includes(keyword))) {
        return type;
      }
    }
    return 'custom';
  };

  const buildWebsite = async () => {
    if (!userRequest.trim()) return;
    
    setIsBuilding(true);
    setBuildProgress(0);
    
    const websiteType = detectWebsiteType(userRequest);
    setDetectedType(websiteType);
    
    try {
      for (let i = 0; i < buildingSteps.length; i++) {
        const step = buildingSteps[i];
        setCurrentStep(step.label);
        setBuildProgress((i / buildingSteps.length) * 100);
        
        // Simulate AI processing with realistic timing
        await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
        
        if (i === buildingSteps.length - 1) {
          // Generate the complete website
          const website = await AIService.generateUniversalWebsite(userRequest, websiteType);
          const completeWebsite = {
            ...website,
            id: `popsites-${Date.now()}`,
            name: `AI Generated ${websiteType.charAt(0).toUpperCase() + websiteType.slice(1)} Site`,
            description: userRequest,
            type: websiteType,
            ready: true,
            timestamp: new Date().toISOString(),
            features: website.features || [],
            pages: website.pages || []
          };
          
          setBuildProgress(100);
          setTimeout(() => onComplete(completeWebsite), 500);
        }
      }
    } catch (error) {
      console.error('Error building website:', error);
      setIsBuilding(false);
    }
  };

  const useExample = (example: string) => {
    setUserRequest(example);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-blue-600" />
          Universal AI Website Builder
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Describe any website you want to create, and our AI will build it completely for you. 
          Just type what you need - be as specific as possible!
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            What do you want to build?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              value={userRequest}
              onChange={(e) => setUserRequest(e.target.value)}
              placeholder="Describe your website in detail... For example: 'I want to create a modern e-commerce website for selling organic skincare products. It should have a clean, minimalist design with product categories, detailed product pages, customer reviews, shopping cart, and secure checkout. The color scheme should be green and white to reflect the natural theme.'"
              className="min-h-[120px] resize-none"
              disabled={isBuilding}
            />
            <div className="text-xs text-muted-foreground mt-2">
              {userRequest.length}/2000 characters
            </div>
          </div>

          {detectedType && (
            <div className="flex items-center gap-2">
              <span className="text-sm">Detected type:</span>
              <Badge variant="outline" className="capitalize">
                {detectedType} Website
              </Badge>
            </div>
          )}
          
          {isBuilding && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{currentStep}</span>
              </div>
              <Progress value={buildProgress} className="w-full" />
              <div className="text-xs text-muted-foreground text-center">
                Building your {detectedType} website... {Math.round(buildProgress)}% complete
              </div>
            </div>
          )}
          
          <Button
            onClick={buildWebsite}
            disabled={!userRequest.trim() || isBuilding}
            className="w-full"
            size="lg"
          >
            {isBuilding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Building Your Website...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Build My Website with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">Need inspiration? Try these examples:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleRequests.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left h-auto p-3 justify-start"
                onClick={() => useExample(example)}
                disabled={isBuilding}
              >
                <div className="text-sm">{example}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIUniversalBuilder;