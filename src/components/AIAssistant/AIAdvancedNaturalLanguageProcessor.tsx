import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Brain, Zap, Target, CheckCircle, AlertCircle, Code } from 'lucide-react';

interface ProcessingResult {
  intent: string;
  confidence: number;
  entities: Array<{ type: string; value: string; confidence: number }>;
  requirements: string[];
  suggestedFeatures: string[];
  industryMatch: string;
  complexity: 'simple' | 'moderate' | 'complex';
}

interface ProcessingStep {
  name: string;
  status: 'pending' | 'processing' | 'complete';
  description: string;
}

export const AIAdvancedNaturalLanguageProcessor: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  const initializeProcessingSteps = (): ProcessingStep[] => [
    { name: 'Intent Analysis', status: 'pending', description: 'Understanding user requirements' },
    { name: 'Entity Extraction', status: 'pending', description: 'Identifying key components' },
    { name: 'Industry Classification', status: 'pending', description: 'Determining business type' },
    { name: 'Requirement Generation', status: 'pending', description: 'Creating technical specs' },
    { name: 'Feature Recommendation', status: 'pending', description: 'Suggesting optimal features' },
    { name: 'Complexity Assessment', status: 'pending', description: 'Evaluating project scope' }
  ];

  const processNaturalLanguage = async () => {
    if (!userInput.trim()) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    const steps = initializeProcessingSteps();
    setProcessingSteps(steps);
    setResult(null);

    for (let i = 0; i < steps.length; i++) {
      const updatedSteps = [...steps];
      updatedSteps[i].status = 'processing';
      setProcessingSteps(updatedSteps);
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      updatedSteps[i].status = 'complete';
      setProcessingSteps(updatedSteps);
      setProcessingProgress(((i + 1) / steps.length) * 100);
    }

    const mockResult: ProcessingResult = {
      intent: detectIntent(userInput),
      confidence: 92 + Math.random() * 7,
      entities: extractEntities(userInput),
      requirements: generateRequirements(userInput),
      suggestedFeatures: suggestFeatures(userInput),
      industryMatch: detectIndustry(userInput),
      complexity: assessComplexity(userInput)
    };

    setResult(mockResult);
    setIsProcessing(false);
  };

  const detectIntent = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('restaurant')) return 'Create Restaurant Website';
    if (lowerInput.includes('shop') || lowerInput.includes('store')) return 'Build E-commerce Store';
    if (lowerInput.includes('portfolio')) return 'Create Portfolio Website';
    if (lowerInput.includes('blog')) return 'Build Blog Platform';
    return 'Build Business Website';
  };

  const extractEntities = (input: string): Array<{ type: string; value: string; confidence: number }> => {
    const entities = [];
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('restaurant')) entities.push({ type: 'Business', value: 'Restaurant', confidence: 0.95 });
    if (lowerInput.includes('payment')) entities.push({ type: 'Feature', value: 'Payment', confidence: 0.92 });
    if (lowerInput.includes('booking')) entities.push({ type: 'Feature', value: 'Booking', confidence: 0.89 });
    
    return entities;
  };

  const generateRequirements = (input: string): string[] => {
    const base = ['Responsive Design', 'SEO Optimization', 'Fast Loading'];
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('ecommerce')) base.push('Product Catalog', 'Shopping Cart', 'Payment Integration');
    if (lowerInput.includes('booking')) base.push('Calendar Integration', 'Appointment Scheduling');
    
    return base;
  };

  const suggestFeatures = (input: string): string[] => {
    const features = ['Contact Forms', 'Social Media Integration', 'Analytics'];
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('restaurant')) features.push('Online Menu', 'Table Reservations');
    if (lowerInput.includes('portfolio')) features.push('Image Gallery', 'Project Showcase');
    
    return features;
  };

  const detectIndustry = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('restaurant')) return 'Food & Beverage';
    if (lowerInput.includes('shop')) return 'E-commerce';
    if (lowerInput.includes('health')) return 'Healthcare';
    return 'General Business';
  };

  const assessComplexity = (input: string): 'simple' | 'moderate' | 'complex' => {
    const features = (input.match(/payment|booking|ecommerce|integration|custom/gi) || []).length;
    if (features >= 3) return 'complex';
    if (features >= 1) return 'moderate';
    return 'simple';
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing': return <AlertCircle className="h-4 w-4 text-blue-600 animate-pulse" />;
      default: return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            Advanced Natural Language Processor
          </CardTitle>
          <p className="text-muted-foreground">
            Describe what you want to build in plain English
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Textarea
              placeholder="e.g., I want to create a restaurant website with online ordering and reservations"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-[100px]"
              disabled={isProcessing}
            />
            <Button 
              onClick={processNaturalLanguage} 
              disabled={!userInput.trim() || isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <><Brain className="h-4 w-4 mr-2 animate-pulse" />Processing...</>
              ) : (
                <><Zap className="h-4 w-4 mr-2" />Process Requirements</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {processingSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              Processing Steps
            </CardTitle>
            <Progress value={processingProgress} className="h-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processingSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                  {getStepIcon(step.status)}
                  <div className="flex-1">
                    <div className="font-medium">{step.name}</div>
                    <div className="text-sm text-muted-foreground">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Target className="h-5 w-5" />
              Processing Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-green-700">Intent:</label>
                <div className="text-lg font-semibold text-green-800">{result.intent}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700">Confidence:</label>
                <div className="text-lg font-semibold text-green-800">{result.confidence.toFixed(1)}%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-green-700">Industry:</label>
                <Badge className="mt-1 bg-blue-600">{result.industryMatch}</Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700">Complexity:</label>
                <Badge className={`mt-1 ${getComplexityColor(result.complexity)}`}>{result.complexity}</Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-green-700 mb-2 block">Entities:</label>
              <div className="flex flex-wrap gap-2">
                {result.entities.map((entity, index) => (
                  <Badge key={index} variant="outline" className="bg-white">
                    <Code className="h-3 w-3 mr-1" />
                    {entity.type}: {entity.value}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-green-700 mb-2 block">Requirements:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-green-700 mb-2 block">Suggested Features:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.suggestedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};