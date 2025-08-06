import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Database, Zap, Target, TrendingUp, CheckCircle } from 'lucide-react';

interface TrainingMetrics {
  totalInteractions: number;
  successRate: number;
  accuracyScore: number;
  learningProgress: number;
  knowledgeBase: number;
}

const AIPopSitesTrainingSystem: React.FC = () => {
  const [metrics, setMetrics] = useState<TrainingMetrics>({
    totalInteractions: 15847,
    successRate: 94.2,
    accuracyScore: 96.8,
    learningProgress: 87.5,
    knowledgeBase: 92.3
  });

  const [isTraining, setIsTraining] = useState(false);

  const trainingAreas = [
    {
      name: 'Website Generation',
      description: 'AI learns to build complete websites from user descriptions',
      progress: 95,
      examples: ['E-commerce stores', 'Landing pages', 'Portfolios', 'Blogs']
    },
    {
      name: 'Design Systems',
      description: 'Understanding modern design principles and user preferences',
      progress: 88,
      examples: ['Color schemes', 'Typography', 'Layout patterns', 'UI components']
    },
    {
      name: 'Content Creation',
      description: 'Generating relevant, engaging content for any industry',
      progress: 92,
      examples: ['Copy writing', 'SEO content', 'Product descriptions', 'Blog posts']
    },
    {
      name: 'User Intent Recognition',
      description: 'Understanding what users really want from their descriptions',
      progress: 90,
      examples: ['Business goals', 'Target audience', 'Feature requirements', 'Style preferences']
    }
  ];

  const knowledgeAreas = [
    'Modern web technologies (React, TypeScript, Tailwind CSS)',
    'E-commerce best practices and conversion optimization',
    'SEO and performance optimization techniques',
    'Responsive design and mobile-first approaches',
    'Accessibility standards and inclusive design',
    'User experience patterns and psychology',
    'Business strategy and marketing fundamentals',
    'Industry-specific requirements and regulations'
  ];

  const enhanceTraining = () => {
    setIsTraining(true);
    // Simulate training enhancement
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        totalInteractions: prev.totalInteractions + Math.floor(Math.random() * 100),
        successRate: Math.min(99.9, prev.successRate + Math.random() * 0.5),
        accuracyScore: Math.min(99.9, prev.accuracyScore + Math.random() * 0.3),
        learningProgress: Math.min(100, prev.learningProgress + Math.random() * 2)
      }));
      setIsTraining(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
          <Brain className="h-6 w-6 text-blue-600" />
          PopSites AI Training System
        </h2>
        <p className="text-muted-foreground">
          Continuously learning to build better websites from user descriptions
        </p>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Training Metrics</TabsTrigger>
          <TabsTrigger value="areas">Learning Areas</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Total Interactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalInteractions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  User requests processed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.successRate}%</div>
                <Progress value={metrics.successRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Accuracy Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.accuracyScore}%</div>
                <Progress value={metrics.accuracyScore} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Training Enhancement</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Active Learning
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Learning Progress</span>
                    <span>{metrics.learningProgress}%</span>
                  </div>
                  <Progress value={metrics.learningProgress} />
                </div>
                <Button 
                  onClick={enhanceTraining} 
                  disabled={isTraining}
                  className="w-full"
                >
                  {isTraining ? 'Enhancing Training...' : 'Enhance AI Training'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="areas" className="space-y-4">
          <div className="grid gap-4">
            {trainingAreas.map((area, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{area.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Training Progress</span>
                        <span>{area.progress}%</span>
                      </div>
                      <Progress value={area.progress} />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Training Examples:</p>
                      <div className="flex flex-wrap gap-2">
                        {area.examples.map((example, idx) => (
                          <Badge key={idx} variant="outline">{example}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Knowledge Base
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Core knowledge areas the AI uses to build websites
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {knowledgeAreas.map((area, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="text-center">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Continuous Learning</h3>
                <p className="text-sm text-muted-foreground">
                  The AI continuously learns from every user interaction, improving its ability to 
                  understand requirements and generate better websites over time.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIPopSitesTrainingSystem;