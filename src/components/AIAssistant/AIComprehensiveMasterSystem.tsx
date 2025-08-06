import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles, Brain, Rocket, Zap, Globe, Star, Trophy, MessageSquare, Code } from 'lucide-react';
import { AIAdvancedTrainingSystem } from './AIAdvancedTrainingSystem';
import { AIAdvancedNaturalLanguageProcessor } from './AIAdvancedNaturalLanguageProcessor';
import { AIAutomatedWebsiteGenerator } from './AIAutomatedWebsiteGenerator';
import { AIEnhancedIntelligenceCore } from './AIEnhancedIntelligenceCore';
import { AIUltimateAssistant } from './AIUltimateAssistant';

export const AIComprehensiveMasterSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const systemMetrics = [
    { name: 'Websites Generated', value: '47,892', change: '+2,341 today', icon: Globe },
    { name: 'AI Accuracy', value: '98.7%', change: '+0.3% this week', icon: Brain },
    { name: 'User Satisfaction', value: '97.2%', change: '+1.1% this month', icon: Star },
    { name: 'Processing Speed', value: '2.3s avg', change: '-0.4s improved', icon: Zap }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-4 border-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Crown className="h-12 w-12 text-purple-600" />
            <Trophy className="h-10 w-10 text-gold-500" />
            <Sparkles className="h-12 w-12 text-blue-600" />
            <Brain className="h-10 w-10 text-green-600" />
            <Rocket className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            PopSites AI Comprehensive Master System
          </CardTitle>
          <p className="text-xl text-muted-foreground mt-4">
            The world's most advanced AI platform for building complete websites from natural language
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Badge className="bg-purple-600 hover:bg-purple-700 text-lg px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              98.7% AI Accuracy
            </Badge>
            <Badge className="bg-blue-600 hover:bg-blue-700 text-lg px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              47K+ Websites Built
            </Badge>
            <Badge className="bg-green-600 hover:bg-green-700 text-lg px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              Advanced AI
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl">↗️</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm font-medium text-gray-600">{metric.name}</div>
                <div className="text-xs text-green-600 mt-1">{metric.change}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-red-600" />
            Master AI Interface
          </CardTitle>
          <p className="text-muted-foreground">
            Access all AI capabilities through this comprehensive interface
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="nlp">NLP Engine</TabsTrigger>
              <TabsTrigger value="generator">Generator</TabsTrigger>
              <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <AIUltimateAssistant />
            </TabsContent>
            
            <TabsContent value="nlp" className="mt-6">
              <AIAdvancedNaturalLanguageProcessor />
            </TabsContent>
            
            <TabsContent value="generator" className="mt-6">
              <AIAutomatedWebsiteGenerator />
            </TabsContent>
            
            <TabsContent value="intelligence" className="mt-6">
              <AIEnhancedIntelligenceCore />
            </TabsContent>
            
            <TabsContent value="training" className="mt-6">
              <AIAdvancedTrainingSystem />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 flex-col bg-purple-600 hover:bg-purple-700">
              <Brain className="h-6 w-6 mb-2" />
              Train AI
            </Button>
            <Button className="h-16 flex-col bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="h-6 w-6 mb-2" />
              Process Text
            </Button>
            <Button className="h-16 flex-col bg-green-600 hover:bg-green-700">
              <Code className="h-6 w-6 mb-2" />
              Generate Site
            </Button>
            <Button className="h-16 flex-col bg-red-600 hover:bg-red-700">
              <Rocket className="h-6 w-6 mb-2" />
              Deploy Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-green-800">All Systems Operational</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-green-700">
              <span>Uptime: 99.9%</span>
              <span>Response: 2.3s avg</span>
              <span>Active Users: 12,847</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};