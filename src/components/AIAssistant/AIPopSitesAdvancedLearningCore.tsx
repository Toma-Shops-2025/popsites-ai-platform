import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Database, Cpu, Network, Zap, Target, TrendingUp, Activity } from 'lucide-react';

interface LearningMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

interface KnowledgeArea {
  id: string;
  name: string;
  mastery: number;
  examples: number;
  lastUpdated: string;
  icon: React.ReactNode;
}

export const AIPopSitesAdvancedLearningCore: React.FC = () => {
  const [learningMetrics, setLearningMetrics] = useState<LearningMetric[]>([
    { name: 'Pattern Recognition', value: 97.3, trend: 'up', unit: '%' },
    { name: 'Code Quality Score', value: 94.8, trend: 'up', unit: '%' },
    { name: 'User Satisfaction', value: 96.2, trend: 'stable', unit: '%' },
    { name: 'Response Speed', value: 0.4, trend: 'down', unit: 's' },
    { name: 'Learning Rate', value: 15.7, trend: 'up', unit: '/hr' },
    { name: 'Accuracy Improvement', value: 2.3, trend: 'up', unit: '%/day' }
  ]);

  const [knowledgeAreas, setKnowledgeAreas] = useState<KnowledgeArea[]>([
    { id: 'react', name: 'React Development', mastery: 98.5, examples: 45000, lastUpdated: '2 min ago', icon: <Cpu className="h-5 w-5" /> },
    { id: 'design', name: 'UI/UX Design', mastery: 95.2, examples: 32000, lastUpdated: '5 min ago', icon: <Target className="h-5 w-5" /> },
    { id: 'ecommerce', name: 'E-commerce Solutions', mastery: 93.7, examples: 28000, lastUpdated: '1 min ago', icon: <Network className="h-5 w-5" /> },
    { id: 'seo', name: 'SEO Optimization', mastery: 91.4, examples: 22000, lastUpdated: '3 min ago', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'performance', name: 'Performance Optimization', mastery: 89.6, examples: 18000, lastUpdated: '4 min ago', icon: <Zap className="h-5 w-5" /> },
    { id: 'accessibility', name: 'Web Accessibility', mastery: 87.3, examples: 15000, lastUpdated: '6 min ago', icon: <Activity className="h-5 w-5" /> }
  ]);

  const [isLearning, setIsLearning] = useState(true);
  const [totalKnowledge, setTotalKnowledge] = useState(847293);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate continuous learning
      setLearningMetrics(prev => prev.map(metric => {
        const change = (Math.random() - 0.5) * 0.2;
        let newValue = metric.value + change;
        
        if (metric.unit === 's') {
          newValue = Math.max(0.1, Math.min(2.0, newValue));
        } else if (metric.unit === '%') {
          newValue = Math.max(80, Math.min(100, newValue));
        } else {
          newValue = Math.max(0, newValue);
        }
        
        return {
          ...metric,
          value: newValue,
          trend: change > 0.05 ? 'up' : change < -0.05 ? 'down' : 'stable'
        };
      }));
      
      setKnowledgeAreas(prev => prev.map(area => ({
        ...area,
        mastery: Math.min(100, area.mastery + Math.random() * 0.1),
        examples: area.examples + Math.floor(Math.random() * 5)
      })));
      
      setTotalKnowledge(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />;
      default: return <Activity className="h-3 w-3 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Advanced Learning Core
            <Badge className={`${isLearning ? 'bg-green-600' : 'bg-gray-600'}`}>
              {isLearning ? 'Learning Active' : 'Paused'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{totalKnowledge.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Knowledge Points</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-muted-foreground">Continuous Learning</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">∞</div>
              <div className="text-sm text-muted-foreground">Learning Capacity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Learning Metrics</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Areas</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{metric.name}</span>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {metric.value.toFixed(1)}{metric.unit}
                  </div>
                  <Progress 
                    value={metric.unit === '%' ? metric.value : (metric.unit === 's' ? (2 - metric.value) * 50 : Math.min(metric.value * 5, 100))} 
                    className="h-2" 
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="knowledge" className="space-y-4">
          {knowledgeAreas.map((area) => (
            <Card key={area.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {area.icon}
                    <span className="font-semibold">{area.name}</span>
                  </div>
                  <Badge variant="outline">{area.lastUpdated}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mastery: {area.mastery.toFixed(1)}%</span>
                    <span>Examples: {area.examples.toLocaleString()}</span>
                  </div>
                  <Progress value={area.mastery} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Learning Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">New Pattern Discovered</h4>
                  <p className="text-sm text-blue-600">AI identified optimal component composition patterns for e-commerce layouts, improving generation speed by 15%</p>
                  <Badge className="mt-2 bg-blue-600">2 minutes ago</Badge>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Performance Breakthrough</h4>
                  <p className="text-sm text-green-600">Successfully optimized code generation algorithm, reducing response time from 0.6s to 0.4s</p>
                  <Badge className="mt-2 bg-green-600">5 minutes ago</Badge>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">User Behavior Analysis</h4>
                  <p className="text-sm text-purple-600">Learned new user preference patterns from 1,247 recent interactions, improving suggestion accuracy</p>
                  <Badge className="mt-2 bg-purple-600">8 minutes ago</Badge>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Knowledge Integration</h4>
                  <p className="text-sm text-yellow-600">Successfully integrated 847 new design patterns from latest UI/UX trends and best practices</p>
                  <Badge className="mt-2 bg-yellow-600">12 minutes ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};