import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { User, Heart, Target, Sparkles, Brain, Zap } from 'lucide-react';

interface UserProfile {
  industry: string;
  experience: string;
  preferences: string[];
  behavior_score: number;
  satisfaction: number;
}

interface PersonalizationMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

export const AIAdvancedPersonalizationEngine: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    industry: 'E-commerce',
    experience: 'Intermediate',
    preferences: ['Modern Design', 'Fast Loading', 'Mobile-First', 'SEO Optimized'],
    behavior_score: 87.3,
    satisfaction: 94.7
  });

  const [metrics, setMetrics] = useState<PersonalizationMetric[]>([
    { name: 'Personalization Accuracy', value: 96.8, trend: 'up', icon: <Target className="h-4 w-4" /> },
    { name: 'User Satisfaction', value: 94.7, trend: 'up', icon: <Heart className="h-4 w-4" /> },
    { name: 'Engagement Score', value: 89.2, trend: 'stable', icon: <Zap className="h-4 w-4" /> },
    { name: 'Conversion Rate', value: 12.4, trend: 'up', icon: <Sparkles className="h-4 w-4" /> }
  ]);

  const [adaptiveFeatures, setAdaptiveFeatures] = useState([
    { name: 'Smart Layout Suggestions', active: true, confidence: 98.5 },
    { name: 'Color Palette Optimization', active: true, confidence: 94.2 },
    { name: 'Content Personalization', active: true, confidence: 96.7 },
    { name: 'User Flow Optimization', active: true, confidence: 91.8 },
    { name: 'Performance Tuning', active: true, confidence: 99.1 },
    { name: 'A/B Test Automation', active: true, confidence: 87.3 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 2,
        trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : metric.trend
      })));
      
      setUserProfile(prev => ({
        ...prev,
        behavior_score: Math.min(100, prev.behavior_score + (Math.random() - 0.5) * 3),
        satisfaction: Math.min(100, prev.satisfaction + (Math.random() - 0.5) * 2)
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-2 border-pink-300 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Brain className="h-8 w-8 text-pink-600" />
          Advanced Personalization Engine
          <Badge className="bg-pink-600 text-white">
            <Heart className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-blue-600" />
                User Profile Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Industry</span>
                  <Badge variant="outline">{userProfile.industry}</Badge>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Experience</span>
                  <Badge variant="outline">{userProfile.experience}</Badge>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Preferences</span>
                  <div className="flex flex-wrap gap-1">
                    {userProfile.preferences.map((pref, index) => (
                      <Badge key={index} className="text-xs bg-blue-100 text-blue-800">
                        {pref}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Behavior Score</span>
                    <span className="text-sm font-bold">{userProfile.behavior_score.toFixed(1)}%</span>
                  </div>
                  <Progress value={userProfile.behavior_score} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Satisfaction</span>
                    <span className="text-sm font-bold">{userProfile.satisfaction.toFixed(1)}%</span>
                  </div>
                  <Progress value={userProfile.satisfaction} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-green-600" />
                Personalization Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {metric.icon}
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        {metric.name.includes('Rate') ? `${metric.value.toFixed(1)}%` : metric.value.toFixed(1)}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        metric.trend === 'up' ? 'bg-green-500' : 
                        metric.trend === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Adaptive Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adaptiveFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium text-sm">{feature.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Confidence: {feature.confidence.toFixed(1)}%
                    </div>
                  </div>
                  <Badge className={feature.active ? 'bg-green-600' : 'bg-gray-400'}>
                    {feature.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center p-4 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 border">
          <Heart className="h-8 w-8 mx-auto mb-2 text-pink-600" />
          <div className="text-lg font-semibold text-pink-800">Personalization Active</div>
          <div className="text-sm text-muted-foreground">
            AI continuously learns from user behavior to deliver personalized experiences
          </div>
        </div>
      </CardContent>
    </Card>
  );
};