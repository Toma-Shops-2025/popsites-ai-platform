import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Database, Zap, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface TrainingData {
  category: string;
  examples: number;
  accuracy: number;
  lastUpdated: string;
}

interface TrainingMetrics {
  totalExamples: number;
  accuracy: number;
  categories: TrainingData[];
  isTraining: boolean;
}

export const AITrainingCore: React.FC = () => {
  const [metrics, setMetrics] = useState<TrainingMetrics>({
    totalExamples: 0,
    accuracy: 0,
    categories: [],
    isTraining: false
  });
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');

  const trainingCategories = [
    { name: 'E-commerce Sites', icon: '🛒', priority: 'high' },
    { name: 'Business Websites', icon: '💼', priority: 'high' },
    { name: 'Portfolio Sites', icon: '🎨', priority: 'medium' },
    { name: 'Blog Platforms', icon: '📝', priority: 'medium' },
    { name: 'Landing Pages', icon: '🚀', priority: 'high' },
    { name: 'Community Sites', icon: '👥', priority: 'low' }
  ];

  const knowledgeAreas = [
    { area: 'PopSites Platform', coverage: 95, status: 'excellent' },
    { area: 'Template System', coverage: 88, status: 'good' },
    { area: 'User Experience', coverage: 92, status: 'excellent' },
    { area: 'SEO Optimization', coverage: 85, status: 'good' },
    { area: 'Mobile Responsive', coverage: 90, status: 'excellent' },
    { area: 'Performance', coverage: 87, status: 'good' }
  ];

  const startTraining = async () => {
    setMetrics(prev => ({ ...prev, isTraining: true }));
    setTrainingProgress(0);
    
    const tasks = [
      'Loading PopSites knowledge base...',
      'Analyzing successful site patterns...',
      'Training on user preferences...',
      'Optimizing generation algorithms...',
      'Testing site quality metrics...',
      'Finalizing AI improvements...'
    ];
    
    try {
      for (let i = 0; i < tasks.length; i++) {
        setCurrentTask(tasks[i]);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTrainingProgress((i + 1) * (100 / tasks.length));
      }
      
      // Simulate training completion
      setMetrics(prev => ({
        ...prev,
        accuracy: Math.min(prev.accuracy + 5, 98),
        totalExamples: prev.totalExamples + 150,
        isTraining: false
      }));
      
      setCurrentTask('Training completed successfully!');
    } catch (error) {
      console.error('Training failed:', error);
      setCurrentTask('Training failed. Please try again.');
      setMetrics(prev => ({ ...prev, isTraining: false }));
    }
  };

  useEffect(() => {
    // Initialize with mock data
    setMetrics({
      totalExamples: 12500,
      accuracy: 94,
      categories: [
        { category: 'E-commerce', examples: 3200, accuracy: 96, lastUpdated: '2 hours ago' },
        { category: 'Business', examples: 2800, accuracy: 94, lastUpdated: '4 hours ago' },
        { category: 'Portfolio', examples: 2100, accuracy: 92, lastUpdated: '6 hours ago' },
        { category: 'Blog', examples: 1900, accuracy: 93, lastUpdated: '8 hours ago' },
        { category: 'Landing', examples: 1700, accuracy: 95, lastUpdated: '1 day ago' },
        { category: 'Community', examples: 800, accuracy: 89, lastUpdated: '2 days ago' }
      ],
      isTraining: false
    });
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Training Core - PopSites Intelligence
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Continuously training AI to build better websites for PopSites users
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{metrics.totalExamples.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Training Examples</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{metrics.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{metrics.categories.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Active Learning</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="categories">Training Data</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="training">Active Training</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="space-y-4">
              <div className="grid gap-3">
                {metrics.categories.map((category, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {trainingCategories.find(c => c.name.includes(category.category))?.icon || '🌐'}
                          </div>
                          <div>
                            <h3 className="font-medium">{category.category} Sites</h3>
                            <p className="text-sm text-muted-foreground">
                              {category.examples.toLocaleString()} examples • Updated {category.lastUpdated}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{category.accuracy}%</div>
                          <div className="text-xs text-muted-foreground">Accuracy</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="knowledge" className="space-y-4">
              <div className="grid gap-3">
                {knowledgeAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`h-5 w-5 ${
                        area.status === 'excellent' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                      <span className="font-medium">{area.area}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={area.coverage} className="w-24 h-2" />
                      <span className="text-sm font-medium w-12">{area.coverage}%</span>
                      <Badge variant={area.status === 'excellent' ? 'default' : 'secondary'}>
                        {area.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="training" className="space-y-4">
              {metrics.isTraining && (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Training in Progress</span>
                        <span className="text-sm text-muted-foreground">{Math.round(trainingProgress)}%</span>
                      </div>
                      <Progress value={trainingProgress} className="h-2" />
                      <p className="text-sm text-muted-foreground">{currentTask}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="flex gap-3">
                <Button 
                  onClick={startTraining}
                  disabled={metrics.isTraining}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {metrics.isTraining ? 'Training...' : 'Start Training Session'}
                </Button>
                
                <Button variant="outline" disabled={metrics.isTraining}>
                  <Database className="h-4 w-4 mr-2" />
                  Update Knowledge Base
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {trainingCategories.map((category, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-accent">
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="text-sm font-medium">{category.name}</div>
                      <Badge 
                        variant={category.priority === 'high' ? 'destructive' : 
                                category.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs mt-1"
                      >
                        {category.priority} priority
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};