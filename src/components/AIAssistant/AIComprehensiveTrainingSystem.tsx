import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Database, Zap, Target, TrendingUp, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface TrainingModule {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'training' | 'completed';
  progress: number;
  examples: number;
}

interface KnowledgeArea {
  category: string;
  topics: string[];
  proficiency: number;
  lastUpdated: Date;
}

export const AIComprehensiveTrainingSystem: React.FC = () => {
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([
    {
      id: 'website-types',
      name: 'Website Types & Industries',
      description: 'E-commerce, business, portfolio, blog, landing pages',
      status: 'completed',
      progress: 100,
      examples: 2500
    },
    {
      id: 'design-patterns',
      name: 'Design Patterns & Layouts',
      description: 'Modern layouts, responsive design, UI/UX best practices',
      status: 'training',
      progress: 75,
      examples: 1800
    },
    {
      id: 'functionality',
      name: 'Website Functionality',
      description: 'Forms, payments, auth, CMS, integrations',
      status: 'training',
      progress: 60,
      examples: 1200
    },
    {
      id: 'content-generation',
      name: 'Content Generation',
      description: 'Copy, images, SEO content, product descriptions',
      status: 'pending',
      progress: 30,
      examples: 800
    }
  ]);

  const [knowledgeAreas] = useState<KnowledgeArea[]>([
    {
      category: 'E-commerce',
      topics: ['Product catalogs', 'Shopping carts', 'Payment processing', 'Inventory management'],
      proficiency: 95,
      lastUpdated: new Date()
    },
    {
      category: 'Business Websites',
      topics: ['Service pages', 'About sections', 'Contact forms', 'Team profiles'],
      proficiency: 90,
      lastUpdated: new Date()
    },
    {
      category: 'Portfolio Sites',
      topics: ['Gallery layouts', 'Project showcases', 'Skills sections', 'Resume formats'],
      proficiency: 85,
      lastUpdated: new Date()
    },
    {
      category: 'Landing Pages',
      topics: ['Hero sections', 'CTAs', 'Social proof', 'Lead capture'],
      proficiency: 92,
      lastUpdated: new Date()
    }
  ]);

  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const startAdvancedTraining = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: 'Start comprehensive PopSites training',
          context: 'advanced-training',
          modules: trainingModules
        }
      });
      
      // Simulate training progress
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setTrainingProgress(i);
      }
      
    } catch (error) {
      console.error('Training failed:', error);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Comprehensive Training System
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Advanced AI training for complete website generation
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="modules">Training Modules</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="modules" className="space-y-4">
              <div className="grid gap-4">
                {trainingModules.map((module) => (
                  <Card key={module.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{module.name}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                        <Badge 
                          variant={module.status === 'completed' ? 'default' : 
                                 module.status === 'training' ? 'secondary' : 'outline'}
                        >
                          {module.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{module.examples} training examples</span>
                          {module.status === 'completed' && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="knowledge" className="space-y-4">
              <div className="grid gap-4">
                {knowledgeAreas.map((area, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">{area.category}</h3>
                        <Badge variant="outline">{area.proficiency}% Proficient</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {area.topics.map((topic, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <Progress value={area.proficiency} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4">
              {isTraining && (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        <Brain className="h-12 w-12 text-blue-600 animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold">Advanced Training in Progress</h3>
                      <Progress value={trainingProgress} className="h-3" />
                      <p className="text-sm text-muted-foreground">
                        Training AI with comprehensive PopSites knowledge...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={startAdvancedTraining} 
                  disabled={isTraining}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isTraining ? 'Training...' : 'Start Advanced Training'}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Training Accuracy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">94.7%</div>
                    <p className="text-xs text-muted-foreground">Website generation accuracy</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Learning Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">+12.3%</div>
                    <p className="text-xs text-muted-foreground">Improvement this week</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Knowledge Base
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">15.2K</div>
                    <p className="text-xs text-muted-foreground">Training examples</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      AI Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">2.1K</div>
                    <p className="text-xs text-muted-foreground">Generated this month</p>
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