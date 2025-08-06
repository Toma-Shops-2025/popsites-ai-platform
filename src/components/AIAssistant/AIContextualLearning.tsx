import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, TrendingUp, Target, Lightbulb, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LearningPattern {
  id: string;
  pattern: string;
  frequency: number;
  accuracy: number;
  lastSeen: Date;
  examples: string[];
}

interface UserBehavior {
  action: string;
  context: string;
  success: boolean;
  timestamp: Date;
  improvements: string[];
}

export const AIContextualLearning: React.FC = () => {
  const [learningPatterns] = useState<LearningPattern[]>([
    {
      id: '1',
      pattern: 'E-commerce with payment integration',
      frequency: 85,
      accuracy: 94,
      lastSeen: new Date(),
      examples: ['online store', 'shopping cart', 'stripe integration']
    },
    {
      id: '2',
      pattern: 'Restaurant with online ordering',
      frequency: 67,
      accuracy: 91,
      lastSeen: new Date(),
      examples: ['menu display', 'food ordering', 'delivery system']
    },
    {
      id: '3',
      pattern: 'Portfolio with contact forms',
      frequency: 72,
      accuracy: 96,
      lastSeen: new Date(),
      examples: ['image gallery', 'project showcase', 'contact form']
    },
    {
      id: '4',
      pattern: 'Landing page with lead capture',
      frequency: 89,
      accuracy: 98,
      lastSeen: new Date(),
      examples: ['hero section', 'email signup', 'testimonials']
    }
  ]);

  const [recentBehaviors] = useState<UserBehavior[]>([
    {
      action: 'Generated e-commerce site',
      context: 'Jewelry store with inventory',
      success: true,
      timestamp: new Date(),
      improvements: ['Added wishlist feature', 'Enhanced product filters']
    },
    {
      action: 'Created restaurant website',
      context: 'Italian restaurant with reservations',
      success: true,
      timestamp: new Date(),
      improvements: ['Improved menu layout', 'Added table booking']
    },
    {
      action: 'Built portfolio site',
      context: 'Photography portfolio',
      success: false,
      timestamp: new Date(),
      improvements: ['Need better image optimization', 'Gallery loading issues']
    }
  ]);

  const [isLearning, setIsLearning] = useState(false);
  const [learningProgress, setLearningProgress] = useState(0);

  const startContextualLearning = async () => {
    setIsLearning(true);
    setLearningProgress(0);
    
    try {
      // Simulate learning process
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setLearningProgress(i);
      }
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: 'Update contextual learning patterns',
          context: 'contextual-learning',
          patterns: learningPatterns,
          behaviors: recentBehaviors
        }
      });
      
    } catch (error) {
      console.error('Learning update failed:', error);
    } finally {
      setIsLearning(false);
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-green-600';
    if (accuracy >= 90) return 'text-blue-600';
    if (accuracy >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Contextual Learning
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            AI learns from user interactions to improve website generation
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patterns" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="patterns">Learning Patterns</TabsTrigger>
              <TabsTrigger value="behaviors">User Behaviors</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="training">Active Learning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="patterns" className="space-y-4">
              <div className="grid gap-4">
                {learningPatterns.map((pattern) => (
                  <Card key={pattern.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold">{pattern.pattern}</h3>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {pattern.examples.map((example, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {pattern.frequency}% frequency
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Accuracy: </span>
                          <span className={`font-medium ${getAccuracyColor(pattern.accuracy)}`}>
                            {pattern.accuracy}%
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last seen: </span>
                          <span className="font-medium">
                            {pattern.lastSeen.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <Progress value={pattern.accuracy} className="h-2 mt-3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="behaviors" className="space-y-4">
              <div className="space-y-3">
                {recentBehaviors.map((behavior, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {behavior.success ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          )}
                          <h3 className="font-semibold">{behavior.action}</h3>
                        </div>
                        <Badge variant={behavior.success ? 'default' : 'secondary'}>
                          {behavior.success ? 'Success' : 'Needs Improvement'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{behavior.context}</p>
                      
                      {behavior.improvements.length > 0 && (
                        <div>
                          <p className="text-xs font-medium mb-1">AI Improvements:</p>
                          <div className="flex flex-wrap gap-1">
                            {behavior.improvements.map((improvement, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {improvement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Pattern Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">92.4%</div>
                    <p className="text-xs text-muted-foreground">Average accuracy</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Learning Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+8.7%</div>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      New Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">23</div>
                    <p className="text-xs text-muted-foreground">Discovered today</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">96.2%</div>
                    <p className="text-xs text-muted-foreground">User satisfaction</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="training" className="space-y-4">
              {isLearning && (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Brain className="h-12 w-12 mx-auto text-purple-600 animate-pulse" />
                      <h3 className="text-lg font-semibold">Active Learning in Progress</h3>
                      <Progress value={learningProgress} className="h-3" />
                      <p className="text-sm text-muted-foreground">
                        Analyzing user patterns and updating AI knowledge...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={startContextualLearning} 
                  disabled={isLearning}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {isLearning ? 'Learning...' : 'Start Active Learning'}
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Improve e-commerce generation accuracy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Learn new industry-specific patterns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span>Optimize content generation speed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span>Enhance mobile responsiveness</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};