import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Brain, Zap, Globe, ArrowRight } from 'lucide-react';
import AIUniversalBuilder from './AIUniversalBuilder';
import AIIntelligentAssistant from './AIIntelligentAssistant';
import AIPopSitesTrainingSystem from './AIPopSitesTrainingSystem';
import AIWebsitePreview from './AIWebsitePreview';

interface AIEnhancedDoneForYouProps {
  onClose: () => void;
}

const AIEnhancedDoneForYou: React.FC<AIEnhancedDoneForYouProps> = ({ onClose }) => {
  const [generatedWebsite, setGeneratedWebsite] = useState(null);
  const [currentView, setCurrentView] = useState<'main' | 'preview'>('main');

  const handleWebsiteGenerated = (website: any) => {
    setGeneratedWebsite(website);
    setCurrentView('preview');
  };

  const handleEdit = () => {
    window.location.href = '/template-editor';
  };

  const handleDeploy = () => {
    alert('Deploying your website... This feature will be available soon!');
  };

  const handleDownload = () => {
    alert('Downloading your website code... This feature will be available soon!');
  };

  const capabilities = [
    {
      icon: Brain,
      title: 'Universal Understanding',
      description: 'AI understands any website request, from simple landing pages to complex applications'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Complete websites built in minutes with all features, content, and design'
    },
    {
      icon: Globe,
      title: 'Any Industry',
      description: 'E-commerce, portfolios, restaurants, blogs, SaaS, and any custom requirements'
    },
    {
      icon: Sparkles,
      title: 'Production Ready',
      description: 'Professional quality code with SEO, performance, and accessibility built-in'
    }
  ];

  if (currentView === 'preview' && generatedWebsite) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Your Website is Ready!</h2>
                <p className="text-muted-foreground">AI has built your complete website</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentView('main')}>
                  Back
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
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
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-blue-600" />
                PopSites AI - Done For You
              </h2>
              <p className="text-muted-foreground mt-1">
                The most advanced AI website builder - builds anything you can imagine
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          <Tabs defaultValue="builder" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="builder">AI Builder</TabsTrigger>
              <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
              <TabsTrigger value="training">AI Training</TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="space-y-6">
              <div className="text-center py-4">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                  🚀 Most Advanced AI Website Builder
                </Badge>
                <h3 className="text-xl font-semibold mb-2">
                  Build Any Website with AI
                </h3>
                <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
                  Our AI can build absolutely anything - from simple landing pages to complex e-commerce stores, 
                  SaaS applications, portfolios, blogs, and custom business websites. Just describe what you want!
                </p>
              </div>
              
              <AIUniversalBuilder onComplete={handleWebsiteGenerated} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {capabilities.map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <Card key={index} className="text-center">
                      <CardHeader className="pb-3">
                        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-sm">{capability.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">{capability.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="assistant" className="space-y-6">
              <div className="text-center py-4">
                <h3 className="text-xl font-semibold mb-2">
                  Chat with AI Assistant
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  Have a conversation with our AI. Describe your ideas, ask questions, 
                  and let the AI guide you through building your perfect website.
                </p>
              </div>
              
              <AIIntelligentAssistant onWebsiteGenerated={handleWebsiteGenerated} />
            </TabsContent>

            <TabsContent value="training" className="space-y-6">
              <div className="text-center py-4">
                <h3 className="text-xl font-semibold mb-2">
                  AI Training & Analytics
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  See how our AI continuously learns and improves to build better websites. 
                  Monitor training progress and system performance.
                </p>
              </div>
              
              <AIPopSitesTrainingSystem />
            </TabsContent>
          </Tabs>

          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Ready to Build?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start by describing your website idea, and watch our AI bring it to life instantly.
                </p>
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
        </div>
      </div>
    </div>
  );
};

export default AIEnhancedDoneForYou;