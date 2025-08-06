import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Sparkles, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import AIWebsiteBuilder from './AIWebsiteBuilder';
import AIWebsitePreview from './AIWebsitePreview';

interface AIDoneForYouSystemProps {
  onClose: () => void;
}

const AIDoneForYouSystem: React.FC<AIDoneForYouSystemProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<'input' | 'building' | 'preview'>('input');
  const [generatedWebsite, setGeneratedWebsite] = useState(null);

  const handleWebsiteComplete = (website: any) => {
    setGeneratedWebsite(website);
    setCurrentStep('preview');
  };

  const handleEdit = () => {
    // Navigate to template editor with generated website
    window.location.href = '/template-editor';
  };

  const handleDeploy = () => {
    // Handle deployment logic
    alert('Deploying your website... This feature will be available soon!');
  };

  const handleDownload = () => {
    // Handle download logic
    alert('Downloading your website code... This feature will be available soon!');
  };

  const features = [
    {
      icon: Wand2,
      title: 'AI-Powered Generation',
      description: 'Describe your vision and watch AI build your complete website'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get a fully functional website in minutes, not days'
    },
    {
      icon: Sparkles,
      title: '100% Ready to Use',
      description: 'Complete with content, design, and functionality'
    },
    {
      icon: CheckCircle,
      title: 'Professional Quality',
      description: 'Enterprise-grade websites built to modern standards'
    }
  ];

  if (currentStep === 'preview' && generatedWebsite) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Website is Ready!</h2>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
            <AIWebsitePreview
              website={generatedWebsite}
              onEdit={handleEdit}
              onDeploy={handleDeploy}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-blue-600" />
                AI Done-For-You Website Builder
              </h2>
              <p className="text-muted-foreground mt-1">
                Tell us what you want, and we'll build your complete website instantly
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          <Tabs defaultValue="builder" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="builder">Build My Website</TabsTrigger>
              <TabsTrigger value="features">How It Works</TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="space-y-6">
              <div className="text-center py-8">
                <div className="mb-6">
                  <Badge className="bg-blue-100 text-blue-800 mb-4">
                    🚀 Powered by Advanced AI
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">
                    Describe Your Dream Website
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Simply tell our AI what kind of website you want to create. Be as detailed as possible - 
                    include your business type, design preferences, features needed, and target audience.
                  </p>
                </div>
                
                <AIWebsiteBuilder onComplete={handleWebsiteComplete} />
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="text-left p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">✨ Example Ideas:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• E-commerce store for handmade jewelry</li>
                      <li>• Professional portfolio for photographer</li>
                      <li>• Restaurant website with online ordering</li>
                      <li>• SaaS landing page with pricing tiers</li>
                    </ul>
                  </div>
                  <div className="text-left p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">🎯 What You'll Get:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Complete website structure</li>
                      <li>• Professional design system</li>
                      <li>• AI-generated content</li>
                      <li>• Mobile-responsive layout</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-blue-600" />
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <span>Describe</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <span>AI Builds</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                        <span>Deploy</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AIDoneForYouSystem;