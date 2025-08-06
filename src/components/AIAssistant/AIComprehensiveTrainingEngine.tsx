import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Database, Code, Palette, Smartphone, Globe, Zap, BookOpen } from 'lucide-react';

interface TrainingModule {
  name: string;
  category: string;
  progress: number;
  status: 'completed' | 'training' | 'pending';
  icon: React.ComponentType<any>;
  description: string;
}

export const AIComprehensiveTrainingEngine: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('web-development');
  const [trainingProgress, setTrainingProgress] = useState(78);

  const trainingModules: TrainingModule[] = [
    {
      name: 'React & TypeScript Mastery',
      category: 'web-development',
      progress: 95,
      status: 'completed',
      icon: Code,
      description: 'Complete understanding of modern React patterns and TypeScript'
    },
    {
      name: 'UI/UX Design Principles',
      category: 'design',
      progress: 88,
      status: 'training',
      icon: Palette,
      description: 'Advanced design systems and user experience optimization'
    },
    {
      name: 'Mobile App Development',
      category: 'mobile',
      progress: 72,
      status: 'training',
      icon: Smartphone,
      description: 'React Native and mobile-first development approaches'
    },
    {
      name: 'Database Architecture',
      category: 'backend',
      progress: 91,
      status: 'completed',
      icon: Database,
      description: 'SQL, NoSQL, and real-time database management'
    },
    {
      name: 'Deployment & DevOps',
      category: 'deployment',
      progress: 85,
      status: 'training',
      icon: Globe,
      description: 'CI/CD pipelines, cloud platforms, and automated deployment'
    },
    {
      name: 'Natural Language Processing',
      category: 'ai',
      progress: 93,
      status: 'completed',
      icon: Brain,
      description: 'Understanding user requirements and generating appropriate code'
    }
  ];

  const knowledgeAreas = [
    { name: 'E-commerce Platforms', expertise: 96, icon: '🛒' },
    { name: 'Business Websites', expertise: 94, icon: '💼' },
    { name: 'Portfolio Sites', expertise: 98, icon: '🎨' },
    { name: 'Blog Platforms', expertise: 92, icon: '📝' },
    { name: 'Landing Pages', expertise: 97, icon: '🚀' },
    { name: 'Mobile Apps', expertise: 85, icon: '📱' },
    { name: 'Web Applications', expertise: 91, icon: '⚡' },
    { name: 'API Integration', expertise: 89, icon: '🔌' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredModules = trainingModules.filter(module => 
    activeCategory === 'all' || module.category === activeCategory
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Comprehensive AI Training Engine
          </CardTitle>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Training Progress</span>
                <span className="font-semibold">{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />
            </div>
            <Badge className="bg-purple-100 text-purple-800">
              <Zap className="h-3 w-3 mr-1" />
              Advanced AI
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="web-development">Web Dev</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="deployment">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">{module.name}</h3>
                      </div>
                      <Badge className={getStatusColor(module.status)}>
                        {module.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-semibold">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-1" />
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      {module.status === 'completed' ? 'Review' : 'Continue Training'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            Knowledge Areas Expertise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {knowledgeAreas.map((area, index) => (
              <div key={index} className="text-center p-3 rounded-lg border hover:shadow-sm transition-shadow">
                <div className="text-2xl mb-2">{area.icon}</div>
                <h4 className="font-medium text-sm mb-1">{area.name}</h4>
                <div className="text-xs text-muted-foreground mb-2">{area.expertise}% Expert</div>
                <Progress value={area.expertise} className="h-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Code className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">50K+</div>
            <p className="text-xs text-muted-foreground">Code Patterns Learned</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">15K+</div>
            <p className="text-xs text-muted-foreground">Successful Deployments</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">Accuracy Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};