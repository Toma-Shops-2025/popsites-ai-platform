import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Code, Smartphone, Globe, Database, Zap, TrendingUp } from 'lucide-react';

interface TrainingModule {
  id: string;
  name: string;
  category: 'development' | 'deployment' | 'mobile' | 'platforms';
  progress: number;
  status: 'active' | 'completed' | 'pending';
  accuracy: number;
}

export const AIPopSitesUniversalTrainingSystem: React.FC = () => {
  const [modules, setModules] = useState<TrainingModule[]>([
    { id: '1', name: 'React/Next.js Development', category: 'development', progress: 95, status: 'active', accuracy: 98.5 },
    { id: '2', name: 'GitHub Integration & CI/CD', category: 'deployment', progress: 88, status: 'active', accuracy: 96.2 },
    { id: '3', name: 'Supabase Backend Setup', category: 'platforms', progress: 92, status: 'completed', accuracy: 97.8 },
    { id: '4', name: 'Netlify/Vercel Deployment', category: 'deployment', progress: 85, status: 'active', accuracy: 94.1 },
    { id: '5', name: 'PWA & Mobile App Creation', category: 'mobile', progress: 78, status: 'active', accuracy: 91.3 },
    { id: '6', name: 'App Store Publishing', category: 'mobile', progress: 65, status: 'active', accuracy: 87.9 },
    { id: '7', name: 'Firebase Integration', category: 'platforms', progress: 45, status: 'pending', accuracy: 82.1 },
    { id: '8', name: 'E-commerce Platforms', category: 'development', progress: 72, status: 'active', accuracy: 89.4 }
  ]);

  const [overallStats, setOverallStats] = useState({
    totalAccuracy: 93.2,
    activeTraining: 6,
    completedModules: 1,
    trainingHours: 1247
  });

  useEffect(() => {
    // Simulate real-time training progress
    const interval = setInterval(() => {
      setModules(prev => prev.map(module => {
        if (module.status === 'active' && module.progress < 100) {
          const newProgress = Math.min(module.progress + Math.random() * 0.5, 100);
          const newAccuracy = Math.min(module.accuracy + Math.random() * 0.1, 99.9);
          return {
            ...module,
            progress: newProgress,
            accuracy: newAccuracy,
            status: newProgress >= 100 ? 'completed' : 'active'
          };
        }
        return module;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'development': return <Code className="h-4 w-4" />;
      case 'deployment': return <Globe className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'platforms': return <Database className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                <p className="text-2xl font-bold">{overallStats.totalAccuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Training</p>
                <p className="text-2xl font-bold">{overallStats.activeTraining}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{overallStats.completedModules}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Training Hours</p>
                <p className="text-2xl font-bold">{overallStats.trainingHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Training Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(module.category)}
                    <div>
                      <h4 className="font-medium">{module.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {module.category} • Accuracy: {module.accuracy.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(module.status)}>
                    {module.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Training Progress</span>
                    <span>{Math.round(module.progress)}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};