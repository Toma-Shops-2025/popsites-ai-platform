import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Users, Zap, Brain, Target } from 'lucide-react';
import { useAI } from './AIProvider';

interface AIAdvancedAnalyticsProps {
  onClose: () => void;
}

const AIAdvancedAnalytics: React.FC<AIAdvancedAnalyticsProps> = ({ onClose }) => {
  const { trainingData, addTrainingData } = useAI();
  const [analytics, setAnalytics] = useState({
    totalInteractions: 0,
    successRate: 0,
    userSatisfaction: 0,
    improvementRate: 0,
    activeUsers: 0,
    completedTasks: 0
  });

  useEffect(() => {
    // Calculate analytics from training data
    const calculateAnalytics = () => {
      const total = trainingData.length;
      const successful = trainingData.filter(d => d.data?.success !== false).length;
      const satisfaction = trainingData.reduce((acc, d) => acc + (d.data?.rating || 4), 0) / total;
      
      setAnalytics({
        totalInteractions: total,
        successRate: total > 0 ? (successful / total) * 100 : 0,
        userSatisfaction: satisfaction || 4.2,
        improvementRate: 15.3,
        activeUsers: 247,
        completedTasks: 1834
      });
    };

    calculateAnalytics();
  }, [trainingData]);

  const performanceMetrics = [
    { label: 'AI Response Time', value: '0.8s', trend: '+12%', color: 'text-green-600' },
    { label: 'Task Completion', value: '94.2%', trend: '+8%', color: 'text-blue-600' },
    { label: 'User Retention', value: '87.5%', trend: '+5%', color: 'text-purple-600' },
    { label: 'Error Rate', value: '2.1%', trend: '-15%', color: 'text-red-600' }
  ];

  const trainingModules = [
    { name: 'Website Generation', progress: 95, status: 'excellent' },
    { name: 'Content Creation', progress: 88, status: 'good' },
    { name: 'Design Systems', progress: 92, status: 'excellent' },
    { name: 'User Interaction', progress: 85, status: 'good' },
    { name: 'Template Matching', progress: 97, status: 'excellent' },
    { name: 'SEO Optimization', progress: 83, status: 'improving' }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      improving: 'bg-orange-100 text-orange-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleOptimizeAI = () => {
    addTrainingData({
      type: 'ai_optimization',
      action: 'manual_optimization_triggered',
      timestamp: Date.now()
    });
    
    // Simulate optimization
    setTimeout(() => {
      setAnalytics(prev => ({
        ...prev,
        successRate: Math.min(prev.successRate + 2, 100),
        improvementRate: prev.improvementRate + 1.5
      }));
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                AI Advanced Analytics
              </h2>
              <p className="text-muted-foreground mt-1">
                Comprehensive insights into AI performance and training progress
              </p>
            </div>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{analytics.totalInteractions}</div>
                    <div className="text-sm text-muted-foreground">Total Interactions</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{analytics.successRate.toFixed(1)}%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{analytics.userSatisfaction.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">User Rating</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{analytics.improvementRate}%</div>
                    <div className="text-sm text-muted-foreground">Improvement</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">{analytics.activeUsers}</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-teal-600">{analytics.completedTasks}</div>
                    <div className="text-sm text-muted-foreground">Tasks Done</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{metric.label}</h3>
                        <Badge className={metric.color}>{metric.trend}</Badge>
                      </div>
                      <div className="text-3xl font-bold mb-2">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">
                        Compared to last week
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="training" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Module Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trainingModules.map((module, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{module.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(module.status)}>
                              {module.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {module.progress}%
                            </span>
                          </div>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI Learning Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Users prefer modern, clean designs (78%)</li>
                      <li>• E-commerce templates are most requested (45%)</li>
                      <li>• Mobile-first approach increases satisfaction</li>
                      <li>• Quick generation time is highly valued</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Optimization Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Improve content generation accuracy</li>
                      <li>• Enhance template matching algorithms</li>
                      <li>• Optimize response times for complex requests</li>
                      <li>• Expand design system variations</li>
                    </ul>
                    <Button onClick={handleOptimizeAI} className="mt-4 w-full">
                      <Zap className="h-4 w-4 mr-2" />
                      Optimize AI Performance
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AIAdvancedAnalytics;