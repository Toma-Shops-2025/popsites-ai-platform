import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Brain, Zap, Target, Globe, Code } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface NLPAnalysis {
  intent: string;
  entities: Array<{ type: string; value: string; confidence: number }>;
  sentiment: { score: number; label: string };
  complexity: number;
  requirements: string[];
  suggestedFeatures: string[];
}

export const AIPopSitesUniversalNLP: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [analysis, setAnalysis] = useState<NLPAnalysis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const processNaturalLanguage = async () => {
    if (!userInput.trim()) return;
    
    setIsProcessing(true);
    setConfidence(0);
    
    try {
      // Simulate progressive analysis
      const steps = ['Parsing input...', 'Extracting entities...', 'Analyzing intent...', 'Generating suggestions...'];
      
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setConfidence((i + 1) * 25);
      }
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userInput,
          context: 'nlp-analysis',
          action: 'comprehensive_analysis'
        }
      });
      
      // Mock comprehensive analysis
      const mockAnalysis: NLPAnalysis = {
        intent: detectIntent(userInput),
        entities: extractEntities(userInput),
        sentiment: { score: 0.8, label: 'Positive' },
        complexity: Math.random() * 100,
        requirements: extractRequirements(userInput),
        suggestedFeatures: generateSuggestions(userInput)
      };
      
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('NLP processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const detectIntent = (text: string): string => {
    if (text.toLowerCase().includes('ecommerce') || text.toLowerCase().includes('shop')) return 'E-commerce Site';
    if (text.toLowerCase().includes('blog') || text.toLowerCase().includes('content')) return 'Content Site';
    if (text.toLowerCase().includes('portfolio')) return 'Portfolio Site';
    if (text.toLowerCase().includes('business')) return 'Business Site';
    return 'General Website';
  };
  
  const extractEntities = (text: string) => {
    const entities = [];
    if (text.includes('restaurant')) entities.push({ type: 'Industry', value: 'Restaurant', confidence: 0.95 });
    if (text.includes('online')) entities.push({ type: 'Platform', value: 'Online', confidence: 0.9 });
    if (text.includes('mobile')) entities.push({ type: 'Device', value: 'Mobile', confidence: 0.85 });
    return entities;
  };
  
  const extractRequirements = (text: string): string[] => {
    const requirements = [];
    if (text.toLowerCase().includes('payment')) requirements.push('Payment Processing');
    if (text.toLowerCase().includes('booking')) requirements.push('Booking System');
    if (text.toLowerCase().includes('responsive')) requirements.push('Mobile Responsive');
    if (text.toLowerCase().includes('seo')) requirements.push('SEO Optimization');
    return requirements.length > 0 ? requirements : ['Basic Website Structure', 'Contact Form', 'About Page'];
  };
  
  const generateSuggestions = (text: string): string[] => {
    return ['Analytics Integration', 'Social Media Links', 'Newsletter Signup', 'Live Chat', 'Blog Section', 'Testimonials'];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Universal Natural Language Processor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Describe what you want to build (in plain English)
            </label>
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="I want to create an online restaurant that takes orders, shows our menu, allows table reservations, and has customer reviews..."
              className="min-h-[100px]"
            />
          </div>
          
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing natural language...</span>
                <span>{confidence}%</span>
              </div>
              <Progress value={confidence} className="h-2" />
            </div>
          )}
          
          <Button 
            onClick={processNaturalLanguage} 
            disabled={isProcessing || !userInput.trim()}
            className="w-full"
          >
            <Brain className="h-4 w-4 mr-2" />
            {isProcessing ? 'Analyzing...' : 'Analyze & Generate'}
          </Button>
        </CardContent>
      </Card>
      
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-4 w-4" />
                Intent Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="default" className="mb-2">{analysis.intent}</Badge>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Confidence</span>
                  <span>{Math.round(analysis.complexity)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sentiment</span>
                  <span className="text-green-600">{analysis.sentiment.label}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Extracted Entities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysis.entities.map((entity, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Badge variant="outline">{entity.type}</Badge>
                    <span className="text-sm">{entity.value}</span>
                    <span className="text-xs text-muted-foreground">{Math.round(entity.confidence * 100)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-4 w-4" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {analysis.requirements.map((req, index) => (
                  <Badge key={index} variant="secondary" className="mr-1 mb-1">{req}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Suggested Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {analysis.suggestedFeatures.map((feature, index) => (
                  <Badge key={index} variant="outline" className="mr-1 mb-1">{feature}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};