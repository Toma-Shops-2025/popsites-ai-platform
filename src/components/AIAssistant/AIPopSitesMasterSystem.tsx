import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles, Rocket, Brain, Zap, Globe, Star, Trophy } from 'lucide-react';
import { AIUltimateAssistant } from './AIUltimateAssistant';
import { AIPopSitesTrainingCore } from './AIPopSitesTrainingCore';

interface SystemCapability {
  name: string;
  description: string;
  status: 'active' | 'training' | 'optimizing';
  performance: number;
  icon: React.ComponentType<any>;
}

export const AIPopSitesMasterSystem: React.FC = () => {
  const [activeMode, setActiveMode] = useState('assistant');
  
  const systemCapabilities: SystemCapability[] = [
    {
      name: 'Natural Language Processing',
      description: 'Understands complex website requirements from simple descriptions',
      status: 'active',
      performance: 97.8,
      icon: Brain
    },
    {
      name: 'Industry Intelligence',
      description: 'Specialized knowledge for 25+ industries and business types',
      status: 'active',
      performance: 96.2,
      icon: Globe
    },
    {
      name: 'Complete Site Generation',
      description: 'Builds entire websites with pages, features, and content',
      status: 'active',
      performance: 98.5,
      icon: Rocket
    },
    {
      name: 'Design System Creation',
      description: 'Generates cohesive visual designs and user experiences',
      status: 'optimizing',
      performance: 94.7,
      icon: Sparkles
    },
    {
      name: 'Feature Integration',
      description: 'Adds complex functionality like payments, bookings, and more',
      status: 'active',
      performance: 95.9,
      icon: Zap
    },
    {
      name: 'Continuous Learning',
      description: 'Improves from every interaction and user feedback',
      status: 'training',
      performance: 92.3,
      icon: Star
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'optimizing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 97) return 'text-green-600';
    if (performance >= 95) return 'text-blue-600';
    if (performance >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-2 border-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="h-10 w-10 text-purple-600" />
            <Trophy className="h-8 w-8 text-gold-500" />
            <Sparkles className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            PopSites AI Master System
          </CardTitle>
          <p className="text-lg text-muted-foreground mt-2">
            The world's most advanced AI for building complete websites from natural language
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-purple-600 hover:bg-purple-700">
              <Star className="h-3 w-3 mr-1" />
              97.8% Success Rate
            </Badge>
            <Badge className="bg-blue-600 hover:bg-blue-700">
              <Rocket className="h-3 w-3 mr-1" />
              Complete Websites
            </Badge>
            <Badge className="bg-green-600 hover:bg-green-700">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* System Capabilities Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            System Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Icon className="h-8 w-8 text-blue-600" />
                      <Badge className={getStatusColor(capability.status)}>
                        {capability.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{capability.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{capability.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Performance</span>
                      <span className={`font-bold ${getPerformanceColor(capability.performance)}`}>
                        {capability.performance}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main System Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-purple-600" />
            AI Master Interface
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assistant" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="training" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Training Core
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="assistant" className="mt-6">
              <AIUltimateAssistant />
            </TabsContent>
            
            <TabsContent value="training" className="mt-6">
              <AIPopSitesTrainingCore />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">25+</div>
            <p className="text-xs text-muted-foreground">Industries Supported</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Rocket className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">15K+</div>
            <p className="text-xs text-muted-foreground">Websites Generated</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">340+</div>
            <p className="text-xs text-muted-foreground">Features Available</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">97.8%</div>
            <p className="text-xs text-muted-foreground">User Satisfaction</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};