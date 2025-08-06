import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Globe, ShoppingCart, Eye, Clock, Star, Zap } from 'lucide-react';

interface AIPersonalizedDashboardProps {
  userPreferences?: any;
}

const AIPersonalizedDashboard: React.FC<AIPersonalizedDashboardProps> = ({ userPreferences }) => {
  const quickActions = [
    { id: 'optimize-seo', label: 'Optimize SEO', icon: TrendingUp, priority: 'high' },
    { id: 'update-content', label: 'Update Content', icon: Globe, priority: 'medium' },
    { id: 'check-performance', label: 'Check Performance', icon: Zap, priority: 'low' },
    { id: 'review-analytics', label: 'Review Analytics', icon: Eye, priority: 'medium' }
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Traffic Growth Opportunity',
      description: 'Your weekend traffic is 40% higher. Consider scheduling more content for Fri-Sun.',
      impact: 'High',
      action: 'Schedule Content'
    },
    {
      type: 'warning',
      title: 'Page Load Speed',
      description: 'Some pages are loading slower than optimal. This could affect user experience.',
      impact: 'Medium',
      action: 'Optimize Performance'
    },
    {
      type: 'success',
      title: 'Engagement Trending Up',
      description: 'User engagement has increased 15% this week. Great job on recent content!',
      impact: 'Positive',
      action: 'Continue Strategy'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'success': return <Star className="h-4 w-4 text-green-500" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Your AI Dashboard</h2>
          <p className="text-muted-foreground">Personalized insights and recommendations</p>
        </div>
        <Badge variant="outline" className="bg-blue-50">
          <Zap className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Visitors</p>
                <p className="text-2xl font-bold">1,847</p>
                <p className="text-xs text-green-500">+12% from last week</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold">4,293</p>
                <p className="text-xs text-green-500">+8% from last week</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversions</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-green-500">+23% from last week</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Session</p>
                <p className="text-2xl font-bold">3:24</p>
                <p className="text-xs text-red-500">-5% from last week</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div>
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      <Badge variant="outline" className="mt-2">
                        Impact: {insight.impact}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {insight.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button key={action.id} variant="outline" className="h-20 flex-col gap-2">
                <action.icon className="h-5 w-5" />
                <span className="text-xs text-center">{action.label}</span>
                <Badge className={`${getPriorityColor(action.priority)} text-xs`}>
                  {action.priority}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalizedDashboard;