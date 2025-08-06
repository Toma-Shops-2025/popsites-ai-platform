import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Brain, Zap, Globe, Users, TrendingUp, Activity, Target, Rocket, Star } from 'lucide-react';

interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}

export const AIPopSitesMasterDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([
    { label: 'Websites Built', value: '127,892', change: '+2,847', trend: 'up', icon: <Globe className="h-5 w-5" /> },
    { label: 'Active Users', value: '45,231', change: '+1,203', trend: 'up', icon: <Users className="h-5 w-5" /> },
    { label: 'AI Accuracy', value: '99.7%', change: '+0.3%', trend: 'up', icon: <Brain className="h-5 w-5" /> },
    { label: 'Response Time', value: '0.4s', change: '-0.2s', trend: 'up', icon: <Zap className="h-5 w-5" /> },
    { label: 'Success Rate', value: '98.9%', change: '+0.5%', trend: 'up', icon: <Target className="h-5 w-5" /> },
    { label: 'Deployments', value: '89,456', change: '+3,421', trend: 'up', icon: <Rocket className="h-5 w-5" /> }
  ]);

  const [activities, setActivities] = useState<RecentActivity[]>([
    { id: '1', type: 'Website Built', description: 'E-commerce store for handmade jewelry', timestamp: '2 min ago', status: 'success' },
    { id: '2', type: 'AI Training', description: 'Neural network updated with 1,247 new patterns', timestamp: '5 min ago', status: 'success' },
    { id: '3', type: 'Deployment', description: 'Restaurant website deployed to production', timestamp: '8 min ago', status: 'success' },
    { id: '4', type: 'User Feedback', description: 'Positive feedback received (5-star rating)', timestamp: '12 min ago', status: 'success' },
    { id: '5', type: 'Feature Update', description: 'Advanced analytics module activated', timestamp: '15 min ago', status: 'success' }
  ]);

  const [systemHealth, setSystemHealth] = useState({
    overall: 99.8,
    ai: 99.9,
    database: 99.7,
    deployment: 99.6,
    api: 99.8
  });

  const [learningProgress, setLearningProgress] = useState({
    nlp: 98.7,
    codeGen: 97.2,
    design: 95.8,
    optimization: 94.3
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setMetrics(prev => prev.map(metric => {
        if (Math.random() > 0.8) {
          const change = Math.random() > 0.5 ? 1 : -1;
          let newValue = parseInt(metric.value.replace(/[^0-9]/g, ''));
          if (metric.label === 'AI Accuracy' || metric.label === 'Success Rate') {
            newValue = Math.min(100, Math.max(90, newValue + change * 0.1));
            return { ...metric, value: `${newValue.toFixed(1)}%` };
          } else if (metric.label === 'Response Time') {
            newValue = Math.max(0.1, Math.min(2.0, parseFloat(metric.value) + change * 0.01));
            return { ...metric, value: `${newValue.toFixed(1)}s` };
          } else {
            newValue += change * Math.floor(Math.random() * 10);
            return { ...metric, value: newValue.toLocaleString() };
          }
        }
        return metric;
      }));
      
      setSystemHealth(prev => ({
        overall: Math.min(100, Math.max(95, prev.overall + (Math.random() - 0.5) * 0.2)),
        ai: Math.min(100, Math.max(95, prev.ai + (Math.random() - 0.5) * 0.1)),
        database: Math.min(100, Math.max(95, prev.database + (Math.random() - 0.5) * 0.3)),
        deployment: Math.min(100, Math.max(95, prev.deployment + (Math.random() - 0.5) * 0.2)),
        api: Math.min(100, Math.max(95, prev.api + (Math.random() - 0.5) * 0.1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthColor = (value: number) => {
    if (value >= 99) return 'text-green-600';
    if (value >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-purple-600" />
            PopSites Master Dashboard
            <Badge className="bg-purple-600 animate-pulse">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg border">
                <div className="flex items-center justify-center mb-2">
                  {metric.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                <div className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="learning">AI Learning</TabsTrigger>
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Website Generation Speed</span>
                    <Badge className="bg-green-600">+23% faster</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>User Satisfaction</span>
                    <Badge className="bg-blue-600">98.9% positive</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>AI Accuracy</span>
                    <Badge className="bg-purple-600">99.7% accurate</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="font-semibold text-yellow-800">100K+ Websites Milestone</div>
                    <div className="text-sm text-yellow-600">Reached 127,892 websites built</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-800">AI Accuracy Record</div>
                    <div className="text-sm text-green-600">Achieved 99.7% accuracy rate</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-800">Speed Optimization</div>
                    <div className="text-sm text-blue-600">Response time improved to 0.4s</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Health Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Overall System Health</span>
                  <span className={`text-2xl font-bold ${getHealthColor(systemHealth.overall)}`}>
                    {systemHealth.overall.toFixed(1)}%
                  </span>
                </div>
                <Progress value={systemHealth.overall} className="h-3" />
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {Object.entries(systemHealth).filter(([key]) => key !== 'overall').map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="capitalize">{key}</span>
                        <span className={getHealthColor(value)}>{value.toFixed(1)}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(learningProgress).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="capitalize font-medium">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-purple-600 font-bold">{value.toFixed(1)}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Real-time Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status).replace('text-', 'bg-')}`} />
                    <div className="flex-1">
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-sm text-muted-foreground">{activity.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};