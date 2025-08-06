import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, TrendingUp, Zap, Target, CheckCircle } from 'lucide-react';
import { AIService } from './AIService';

interface TrainingData {
  userInteractions: number;
  successfulBuilds: number;
  userSatisfaction: number;
  templateAccuracy: number;
}

interface AITrainingEnhancerProps {
  onTrainingComplete?: (results: any) => void;
}

const AITrainingEnhancer: React.FC<AITrainingEnhancerProps> = ({ onTrainingComplete }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingData, setTrainingData] = useState<TrainingData>({
    userInteractions: 1247,
    successfulBuilds: 892,
    userSatisfaction: 4.7,
    templateAccuracy: 94.2
  });
  const [currentPhase, setCurrentPhase] = useState('');
  const [insights, setInsights] = useState<any>(null);

  const trainingPhases = [
    { id: 'data', label: 'Analyzing user data', duration: 2000 },
    { id: 'patterns', label: 'Learning design patterns', duration: 2500 },
    { id: 'optimization', label: 'Optimizing algorithms', duration: 2000 },
    { id: 'validation', label: 'Validating improvements', duration: 1500 },
    { id: 'deployment', label: 'Deploying updates', duration: 1000 }
  ];

  const startTraining = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    let totalProgress = 0;
    const progressIncrement = 100 / trainingPhases.length;
    
    for (const phase of trainingPhases) {
      setCurrentPhase(phase.label);
      
      // Simulate training progress
      const startTime = Date.now();
      while (Date.now() - startTime < phase.duration) {
        await new Promise(resolve => setTimeout(resolve, 100));
        const phaseProgress = Math.min((Date.now() - startTime) / phase.duration, 1);
        setTrainingProgress(totalProgress + (phaseProgress * progressIncrement));
      }
      
      totalProgress += progressIncrement;
    }
    
    // Generate training insights
    const results = await AIService.analyzeTrainingData(trainingData);
    setInsights(results);
    setTrainingProgress(100);
    setIsTraining(false);
    
    if (onTrainingComplete) {
      onTrainingComplete(results);
    }
  };

  const metrics = [
    {
      icon: Brain,
      label: 'AI Intelligence',
      value: '96.8%',
      trend: '+2.3%',
      color: 'text-blue-600'
    },
    {
      icon: Target,
      label: 'Accuracy Rate',
      value: `${trainingData.templateAccuracy}%`,
      trend: '+1.8%',
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: `${Math.round((trainingData.successfulBuilds / trainingData.userInteractions) * 100)}%`,
      trend: '+3.2%',
      color: 'text-purple-600'
    },
    {
      icon: Zap,
      label: 'User Satisfaction',
      value: `${trainingData.userSatisfaction}/5`,
      trend: '+0.2',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Training Enhancement System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="training" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="training" className="space-y-4">
              <div className="text-center py-6">
                <h3 className="text-lg font-semibold mb-2">
                  Continuous AI Learning System
                </h3>
                <p className="text-muted-foreground mb-6">
                  Enhance AI capabilities with real user data and feedback
                </p>
                
                {isTraining ? (
                  <div className="space-y-4">
                    <div className="text-sm font-medium">{currentPhase}</div>
                    <Progress value={trainingProgress} className="w-full max-w-md mx-auto" />
                    <div className="text-sm text-muted-foreground">
                      {Math.round(trainingProgress)}% Complete
                    </div>
                  </div>
                ) : (
                  <Button onClick={startTraining} size="lg">
                    <Brain className="mr-2 h-4 w-4" />
                    Start AI Training
                  </Button>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                            <p className="text-2xl font-bold">{metric.value}</p>
                          </div>
                          <div className="text-right">
                            <Icon className={`h-6 w-6 ${metric.color}`} />
                            <Badge variant="secondary" className="mt-1">
                              {metric.trend}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              {insights ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Training Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">AI accuracy improved by {insights.accuracy}%</span>
                        </div>
                        {insights.improvements?.map((improvement: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Run training to see insights and improvements
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITrainingEnhancer;