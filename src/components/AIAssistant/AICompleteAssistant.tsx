import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Wand2, Rocket, Brain, Zap, Globe, Settings, Eye, Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AIPopSitesDoneForYou } from './AIPopSitesDoneForYou';
import { AIUniversalSiteBuilder } from './AIUniversalSiteBuilder';
import { AITrainingCore } from './AITrainingCore';

interface GenerationResult {
  id: string;
  type: string;
  title: string;
  description: string;
  features: string[];
  status: 'generating' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
}

export const AICompleteAssistant: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [activeTab, setActiveTab] = useState('chat');

  const quickPrompts = [
    'Build me a modern e-commerce store for selling handmade jewelry',
    'Create a professional business website for a law firm',
    'I need a portfolio site for a photographer with gallery features',
    'Build a blog platform for food recipes with social sharing',
    'Create a landing page for a SaaS product with pricing tiers',
    'I want a community forum for gamers with user profiles'
  ];

  const handleGenerate = async () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    
    const newResult: GenerationResult = {
      id: Date.now().toString(),
      type: 'website',
      title: 'Custom Website',
      description: userInput,
      features: [],
      status: 'generating',
      progress: 0,
      createdAt: new Date().toISOString()
    };
    
    setResults(prev => [newResult, ...prev]);
    
    try {
      // Simulate generation progress
      const progressInterval = setInterval(() => {
        setResults(prev => prev.map(result => 
          result.id === newResult.id 
            ? { ...result, progress: Math.min(result.progress + 10, 90) }
            : result
        ));
      }, 500);
      
      // Call AI service
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userInput,
          context: 'complete-assistant',
          action: 'generate-website'
        }
      });
      
      clearInterval(progressInterval);
      
      if (error) throw error;
      
      // Update result with completion
      setResults(prev => prev.map(result => 
        result.id === newResult.id 
          ? { 
              ...result, 
              status: 'completed', 
              progress: 100,
              title: data?.title || 'Generated Website',
              features: data?.features || ['Responsive Design', 'SEO Optimized']
            }
          : result
      ));
      
    } catch (error) {
      console.error('Generation failed:', error);
      setResults(prev => prev.map(result => 
        result.id === newResult.id 
          ? { ...result, status: 'failed', progress: 0 }
          : result
      ));
    } finally {
      setIsGenerating(false);
      setUserInput('');
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setUserInput(prompt);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-gradient bg-gradient-to-r from-purple-600 to-blue-600" />
            PopSites Complete AI Assistant
          </CardTitle>
          <p className="text-muted-foreground">
            Your all-in-one AI companion for building anything on PopSites. Just describe what you need!
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="builder">Site Builder</TabsTrigger>
          <TabsTrigger value="done-for-you">Done For You</TabsTrigger>
          <TabsTrigger value="training">AI Training</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What would you like me to build for you?
                  </label>
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Describe your website, app, or any digital project in detail. The more specific you are, the better I can help!"
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !userInput.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Now'}
                  </Button>
                  
                  <Button variant="outline" disabled={isGenerating}>
                    <Brain className="h-4 w-4 mr-2" />
                    Smart Suggestions
                  </Button>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Quick Start Ideas:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.slice(0, 3).map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickPrompt(prompt)}
                        className="text-xs h-8"
                      >
                        {prompt.slice(0, 40)}...
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Generations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.slice(0, 3).map((result) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{result.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                        <Badge variant={result.status === 'completed' ? 'default' : 
                                     result.status === 'generating' ? 'secondary' : 'destructive'}>
                          {result.status}
                        </Badge>
                      </div>
                      
                      {result.status === 'generating' && (
                        <div className="space-y-2">
                          <Progress value={result.progress} className="h-1" />
                          <p className="text-xs text-muted-foreground">
                            Generating... {result.progress}%
                          </p>
                        </div>
                      )}
                      
                      {result.status === 'completed' && (
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex flex-wrap gap-1">
                            {result.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Export
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="builder">
          <AIUniversalSiteBuilder />
        </TabsContent>
        
        <TabsContent value="done-for-you">
          <AIPopSitesDoneForYou />
        </TabsContent>
        
        <TabsContent value="training">
          <AITrainingCore />
        </TabsContent>
      </Tabs>
    </div>
  );
};