import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Crown, Brain, Zap, Globe, Rocket } from 'lucide-react';
import { AIAdvancedTrainingOrchestrator } from './AIAdvancedTrainingOrchestrator';
import { AIPopSitesIntelligenceEngine } from './AIPopSitesIntelligenceEngine';
import { AIPopSitesAdvancedLearningCore } from './AIPopSitesAdvancedLearningCore';
import { AIPopSitesUniversalGenerator } from './AIPopSitesUniversalGenerator';
import { AIPopSitesMasterDashboard } from './AIPopSitesMasterDashboard';

export const AIPopSitesUltimateTrainingSystem: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-gradient-to-r from-purple-200 to-blue-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-purple-600 animate-pulse" />
              <Brain className="h-8 w-8 text-blue-600 animate-bounce" />
              <Zap className="h-8 w-8 text-yellow-500 animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              PopSites Ultimate AI Training System
            </h2>
            <p className="text-xl text-muted-foreground mt-2">
              The most advanced AI training platform for building anything from natural language
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <Badge className="bg-purple-600 text-lg px-4 py-2">
                <Brain className="h-4 w-4 mr-2" />
                99.7% AI Accuracy
              </Badge>
              <Badge className="bg-blue-600 text-lg px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                Universal Builder
              </Badge>
              <Badge className="bg-green-600 text-lg px-4 py-2">
                <Rocket className="h-4 w-4 mr-2" />
                Instant Deploy
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Experience the future of website creation with our revolutionary AI system that learns continuously, 
              understands natural language with 99.7% accuracy, and builds complete applications in seconds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-white rounded-lg border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600">847K+</div>
                <div className="text-sm text-muted-foreground">Training Samples</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600">127K+</div>
                <div className="text-sm text-muted-foreground">Websites Built</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border-2 border-green-200">
                <div className="text-3xl font-bold text-green-600">0.4s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border-2 border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600">24/7</div>
                <div className="text-sm text-muted-foreground">Learning Active</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Master Dashboard
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Intelligence Engine
          </TabsTrigger>
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Universal Generator
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Training Core
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Learning System
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <AIPopSitesMasterDashboard />
        </TabsContent>
        
        <TabsContent value="intelligence">
          <AIPopSitesIntelligenceEngine />
        </TabsContent>
        
        <TabsContent value="generator">
          <AIPopSitesUniversalGenerator />
        </TabsContent>
        
        <TabsContent value="training">
          <AIAdvancedTrainingOrchestrator />
        </TabsContent>
        
        <TabsContent value="learning">
          <AIPopSitesAdvancedLearningCore />
        </TabsContent>
      </Tabs>
      
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-3xl font-bold text-green-800 mb-4 flex items-center justify-center gap-3">
            <Crown className="h-8 w-8 text-green-600" />
            Ready to Experience the Future of Website Creation?
            <Rocket className="h-8 w-8 text-blue-600" />
          </h3>
          <p className="text-xl text-muted-foreground mb-6">
            Join thousands of users building amazing websites with our revolutionary AI system
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">99.7%</div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">0.4s</div>
              <div className="text-sm text-muted-foreground">Generation Speed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">127K+</div>
              <div className="text-sm text-muted-foreground">Success Stories</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};