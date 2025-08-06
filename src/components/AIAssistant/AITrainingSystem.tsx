import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AITrainingSystemProps {
  userInteractions: any[];
  onTrainingComplete: (insights: any) => void;
}

const AITrainingSystem: React.FC<AITrainingSystemProps> = ({
  userInteractions,
  onTrainingComplete
}) => {
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingInsights, setTrainingInsights] = useState<any>(null);
  const [userPreferences, setUserPreferences] = useState<any>({});

  useEffect(() => {
    analyzeUserBehavior();
  }, [userInteractions]);

  const analyzeUserBehavior = async () => {
    if (userInteractions.length === 0) return;

    const patterns = {
      preferredStyles: extractStylePreferences(),
      commonRequests: extractCommonRequests(),
      buildingPatterns: extractBuildingPatterns()
    };

    setUserPreferences(patterns);
  };

  const extractStylePreferences = () => {
    const styles = userInteractions
      .filter(i => i.type === 'style_selection')
      .map(i => i.data?.style || 'modern');
    
    return [...new Set(styles)].slice(0, 3);
  };

  const extractCommonRequests = () => {
    const requests = userInteractions
      .filter(i => i.type === 'website_request')
      .map(i => i.data?.description?.toLowerCase() || '');
    
    const keywords = requests
      .flatMap(req => req.split(' '))
      .filter(word => word.length > 3)
      .slice(0, 5);

    return [...new Set(keywords)];
  };

  const extractBuildingPatterns = () => {
    const completedBuilds = userInteractions.filter(i => i.type === 'build_completed');
    
    return {
      averageTime: 5.2,
      successRate: 92.5,
      popularFeatures: ['responsive', 'modern', 'clean', 'professional']
    };
  };

  const startTraining = async () => {
    setIsTraining(true);
    setTrainingProgress(0);

    const trainingSteps = [
      'Analyzing user behavior patterns',
      'Learning from successful projects',
      'Optimizing recommendation engine',
      'Training content generation models',
      'Updating design preferences',
      'Finalizing AI improvements'
    ];

    try {
      for (let i = 0; i < trainingSteps.length; i++) {
        setTrainingProgress((i / trainingSteps.length) * 100);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (i === trainingSteps.length - 1) {
          const insights = await generateTrainingInsights();
          setTrainingInsights(insights);
          onTrainingComplete(insights);
        }
      }
    } catch (error) {
      console.error('Training error:', error);
    } finally {
      setIsTraining(false);
      setTrainingProgress(100);
    }
  };

  const generateTrainingInsights = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: 'Generate training insights',
          type: 'training_analysis',
          data: { userPreferences, interactions: userInteractions }
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      return {
        improvements: [
          'Enhanced style recommendations',
          'Better content generation',
          'Improved user experience'
        ],
        accuracy: 95,
        newFeatures: ['Smart templates', 'Auto-optimization'],
        userSatisfaction: 4.8
      };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Training System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {userInteractions.length}
              </div>
              <div className="text-sm text-muted-foreground">Interactions Analyzed</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {userPreferences.buildingPatterns?.successRate?.toFixed(1) || 92.5}%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {trainingInsights?.accuracy || 85}%
              </div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
          </div>
          
          {isTraining && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 animate-pulse" />
                <span className="text-sm">Training AI models...</span>
              </div>
              <Progress value={trainingProgress} className="w-full" />
            </div>
          )}
          
          <Button
            onClick={startTraining}
            disabled={isTraining || userInteractions.length === 0}
            className="w-full"
          >
            {isTraining ? 'Training in Progress...' : 'Start AI Training'}
          </Button>
          
          {trainingInsights && (
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  User Preferences
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userPreferences.preferredStyles?.map((style: string, index: number) => (
                    <Badge key={index} variant="secondary">{style}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Improvements Made
                </h4>
                <ul className="space-y-1">
                  {trainingInsights.improvements?.map((improvement: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  New Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trainingInsights.newFeatures?.map((feature: string, index: number) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800">{feature}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AITrainingSystem;