import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Database, Zap, Target, TrendingUp, Cpu, Network, BookOpen, Lightbulb, Rocket } from 'lucide-react';

interface TrainingModule {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'completed' | 'pending';
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface LearningMetric {
  name: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}

export const AIAdvancedTrainingSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const [trainingProgress, setTrainingProgress] = useState(0);

  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      name: 'Natural Language Understanding',
      description: 'Advanced NLP for complex website requirements',
      progress: 95,
      status: 'active',
      priority: 'high',
      category: 'Core AI'
    },
    {
      id: '2',
      name: 'Industry-Specific Patterns',
      description: 'Learning patterns for 50+ industries',
      progress: 88,
      status: 'active',
      priority: 'high',
      category: 'Domain Knowledge'
    },
    {
      id: '3',
      name: 'Design System Intelligence',
      description: 'Advanced design pattern recognition',
      progress: 92,
      status: 'active',
      priority: 'medium',
      category: 'Design AI'
    },
    {
      id: '4',
      name: 'Feature Integration Logic',
      description: 'Complex functionality implementation',
      progress: 87,
      status: 'active',
      priority: 'high',
      category: 'Technical AI'
    },
    {
      id: '5',
      name: 'User Behavior Analysis',
      description: 'Learning from user interactions',
      progress: 76,
      status: 'active',
      priority: 'medium',
      category: 'Behavioral AI'
    },
    {
      id: '6',
      name: 'Performance Optimization',
      description: 'Automated site optimization',
      progress: 83,
      status: 'active',
      priority: 'medium',
      category: 'Performance AI'
    }
  ];

  const learningMetrics: LearningMetric[] = [
    {
      name: 'Pattern Recognition',
      current: 94.7,
      target: 98.0,
      trend: 'up',
      icon: Brain
    },
    {
      name: 'Code Generation',
      current: 96.2,
      target: 99.0,
      trend: 'up',
      icon: Cpu
    },
    {
      name: 'Design Intelligence',
      current: 91.8,
      target: 95.0,
      trend: 'up',
      icon: Lightbulb
    },
    {
      name: 'Feature Integration',
      current: 89.3,
      target: 94.0,
      trend: 'up',
      icon: Network
    }
  ];

  useEffect(() => {
    const avgProgress = trainingModules.reduce((sum, module) => sum + module.progress, 0) / trainingModules.length;
    setTrainingProgress(avgProgress);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Training Overview */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            Advanced AI Training System
          </CardTitle>
          <p className="text-muted-foreground">
            Comprehensive training modules for PopSites AI capabilities
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Overall Training Progress</span>
              <span className="text-2xl font-bold text-blue-600">{trainingProgress.toFixed(1)}%</span>
            </div>
            <Progress value={trainingProgress} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-xl font-bold">2.4M+</div>
                <p className="text-xs text-muted-foreground">Training Samples</p>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-xl font-bold">97.8%</div>
                <p className="text-xs text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-xl font-bold">340+</div>
                <p className="text-xs text-muted-foreground">AI Models</p>
              </div>
              <div className="text-center">
                <Rocket className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-xl font-bold">24/7</div>
                <p className="text-xs text-muted-foreground">Active Learning</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Modules and Metrics */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="modules">Training Modules</TabsTrigger>
              <TabsTrigger value="metrics">Learning Metrics</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="modules" className="mt-6">
              <div className="space-y-4">
                {trainingModules.map((module) => (
                  <Card key={module.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold">{module.name}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge className={getStatusColor(module.status)}>
                              {module.status}
                            </Badge>
                            <Badge className={getPriorityColor(module.priority)}>
                              {module.priority} priority
                            </Badge>
                            <Badge variant="outline">
                              {module.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{module.progress}%</div>
                        </div>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">{metric.name}</span>
                          </div>
                          <TrendingUp className={`h-4 w-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current</span>
                            <span className="font-bold">{metric.current}%</span>
                          </div>
                          <Progress value={metric.current} className="h-2" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Target: {metric.target}%</span>
                            <span>{(metric.target - metric.current).toFixed(1)}% to go</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="mt-6">
              <div className="space-y-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Key Learning Insight</span>
                    </div>
                    <p className="text-sm text-green-700">
                      The AI has learned to identify user intent with 97.8% accuracy by analyzing contextual clues and industry patterns.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Training Focus</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Currently optimizing feature integration logic to handle complex e-commerce and booking systems more effectively.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Rocket className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Next Milestone</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Implementing advanced design system intelligence to create more visually cohesive and brand-consistent websites.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};