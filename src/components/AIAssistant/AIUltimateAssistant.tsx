import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Sparkles, Rocket, Brain, Zap, Globe } from 'lucide-react';
import { AIIntelligentSiteGenerator } from './AIIntelligentSiteGenerator';
import { AIContextualLearning } from './AIContextualLearning';
import { AIAdvancedKnowledgeBase } from './AIAdvancedKnowledgeBase';
import { AIComprehensiveTrainingSystem } from './AIComprehensiveTrainingSystem';
import { AIPopSitesDoneForYou } from './AIPopSitesDoneForYou';
import { AIUniversalSiteBuilder } from './AIUniversalSiteBuilder';

interface AICapability {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'active' | 'training' | 'beta';
  accuracy: number;
}

export const AIUltimateAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState('generator');
  
  const aiCapabilities: AICapability[] = [
    {
      id: 'site-generation',
      name: 'Complete Site Generation',
      description: 'Generate entire websites from natural language descriptions',
      icon: Rocket,
      status: 'active',
      accuracy: 96.8
    },
    {
      id: 'contextual-learning',
      name: 'Contextual Learning',
      description: 'Learn from user interactions and improve over time',
      icon: Brain,
      status: 'active',
      accuracy: 94.2
    },
    {
      id: 'knowledge-base',
      name: 'Advanced Knowledge Base',
      description: 'Comprehensive understanding of web development patterns',
      icon: Globe,
      status: 'active',
      accuracy: 98.1
    },
    {
      id: 'training-system',
      name: 'Comprehensive Training',
      description: 'Continuous learning and model improvement',
      icon: Zap,
      status: 'training',
      accuracy: 92.5
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gradient-to-r from-purple-500 to-blue-500">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Crown className="h-6 w-6 text-purple-600" />
            PopSites Ultimate AI Assistant
          </CardTitle>
          <p className="text-muted-foreground">
            The most advanced AI system for building complete websites from simple descriptions
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {aiCapabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <Card key={capability.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-semibold text-sm mb-1">{capability.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{capability.description}</p>
                    <div className="text-sm font-medium text-green-600">
                      {capability.accuracy}% accuracy
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="generator" className="text-xs">
                <Sparkles className="h-4 w-4 mr-1" />
                Generator
              </TabsTrigger>
              <TabsTrigger value="done-for-you" className="text-xs">
                <Rocket className="h-4 w-4 mr-1" />
                Done-For-You
              </TabsTrigger>
              <TabsTrigger value="universal" className="text-xs">
                <Globe className="h-4 w-4 mr-1" />
                Universal
              </TabsTrigger>
              <TabsTrigger value="learning" className="text-xs">
                <Brain className="h-4 w-4 mr-1" />
                Learning
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="text-xs">
                <Zap className="h-4 w-4 mr-1" />
                Knowledge
              </TabsTrigger>
              <TabsTrigger value="training" className="text-xs">
                <Crown className="h-4 w-4 mr-1" />
                Training
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator">
              <AIIntelligentSiteGenerator />
            </TabsContent>
            
            <TabsContent value="done-for-you">
              <AIPopSitesDoneForYou />
            </TabsContent>
            
            <TabsContent value="universal">
              <AIUniversalSiteBuilder />
            </TabsContent>
            
            <TabsContent value="learning">
              <AIContextualLearning />
            </TabsContent>
            
            <TabsContent value="knowledge">
              <AIAdvancedKnowledgeBase />
            </TabsContent>
            
            <TabsContent value="training">
              <AIComprehensiveTrainingSystem />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};