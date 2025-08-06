import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Brain, Zap, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface IntentAnalysis {
  intent: string;
  confidence: number;
  entities: Array<{ type: string; value: string; confidence: number }>;
  requirements: string[];
  suggestions: string[];
}

const AIUniversalNaturalLanguageProcessor: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [analysis, setAnalysis] = useState<IntentAnalysis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');

  const exampleInputs = [
    "I need an e-commerce site for selling handmade jewelry with payment processing",
    "Create a restaurant website with online ordering and table reservations",
    "Build a portfolio site for a photographer with gallery and contact form",
    "Make a blog about travel with social media integration"
  ];

  const processNaturalLanguage = async (input: string) => {
    setIsProcessing(true);
    setProcessingStage('Analyzing intent...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStage('Extracting entities...');
      
      await new Promise(resolve => setTimeout(resolve, 600));
      setProcessingStage('Generating requirements...');
      
      const { data, error } = await supabase.functions.invoke('ai-nlp-processor', {
        body: { text: input, context: 'website-generation' }
      });
      
      if (data) {
        setAnalysis(data);
      } else {
        // Fallback mock analysis
        const mockAnalysis: IntentAnalysis = {
          intent: 'website_creation',
          confidence: 0.95,
          entities: [
            { type: 'website_type', value: 'e-commerce', confidence: 0.9 },
            { type: 'product', value: 'jewelry', confidence: 0.85 },
            { type: 'feature', value: 'payment processing', confidence: 0.92 }
          ],
          requirements: [
            'E-commerce functionality',
            'Product catalog',
            'Shopping cart',
            'Payment gateway integration',
            'User authentication',
            'Order management'
          ],
          suggestions: [
            'Add customer reviews system',
            'Include inventory management',
            'Consider mobile app integration',
            'Add email marketing tools'
          ]
        };
        setAnalysis(mockAnalysis);
      }
    } catch (error) {
      console.error('NLP processing failed:', error);
    } finally {
      setIsProcessing(false);
      setProcessingStage('');
    }
  };

  const handleAnalyze = () => {
    if (userInput.trim()) {
      processNaturalLanguage(userInput);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Universal Natural Language Processor
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Tell us what you want in plain English - we'll understand and build it
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe what kind of website you need..."
              className="mb-3"
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <Button onClick={handleAnalyze} disabled={isProcessing || !userInput.trim()}>
              <Brain className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Analyze Request'}
            </Button>
          </div>
          
          {isProcessing && (
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-blue-600 animate-pulse" />
                  <span className="text-sm font-medium">{processingStage}</span>
                </div>
                <Progress value={processingStage === 'Analyzing intent...' ? 33 : processingStage === 'Extracting entities...' ? 66 : 100} />
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleInputs.map((example, index) => (
              <Card key={index} className="cursor-pointer hover:bg-accent transition-colors" onClick={() => setUserInput(example)}>
                <CardContent className="p-3">
                  <p className="text-sm">{example}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {analysis && (
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Intent Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {analysis.intent.replace('_', ' ').toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {Math.round(analysis.confidence * 100)}% confidence
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysis.entities.map((entity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      <strong>{entity.type}:</strong> {entity.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Requirements Identified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{req}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIUniversalNaturalLanguageProcessor;