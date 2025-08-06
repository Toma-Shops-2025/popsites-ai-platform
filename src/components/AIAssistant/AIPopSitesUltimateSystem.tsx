import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Rocket, Brain, Zap, Globe, Wand2, GraduationCap, Building2, Cpu } from 'lucide-react';
import { AIPopSitesMasterTrainingSystem } from './AIPopSitesMasterTrainingSystem';
import { AIUniversalWebsiteBuilder } from './AIUniversalWebsiteBuilder';
import { AIAdvancedWebsiteArchitect } from './AIAdvancedWebsiteArchitect';
import { AIAdvancedContentEngine } from './AIAdvancedContentEngine';

interface SystemCapability {
  name: string;
  description: string;
  status: 'active' | 'training' | 'optimizing';
  accuracy: number;
  icon: React.ComponentType<any>;
}

export function AIPopSitesUltimateSystem() {
  const [capabilities] = useState<SystemCapability[]>([
    {
      name: 'Natural Language Processing',
      description: 'Understands complex user requirements',
      status: 'active',
      accuracy: 97.8,
      icon: Brain
    },
    {
      name: 'Website Architecture',
      description: 'Designs optimal site structures',
      status: 'active',
      accuracy: 95.2,
      icon: Building2
    },
    {
      name: 'Content Generation',
      description: 'Creates high-quality content automatically',
      status: 'active',
      accuracy: 94.6,
      icon: Wand2
    },
    {
      name: 'Design Intelligence',
      description: 'Generates beautiful, responsive designs',
      status: 'optimizing',
      accuracy: 96.1,
      icon: Zap
    },
    {
      name: 'Code Generation',
      description: 'Produces clean, optimized code',
      status: 'active',
      accuracy: 98.3,
      icon: Cpu
    },
    {
      name: 'Performance Optimization',
      description: 'Ensures fast, SEO-friendly websites',
      status: 'training',
      accuracy: 93.7,
      icon: Rocket
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'training': return 'bg-blue-500';
      case 'optimizing': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'training': return 'secondary';
      case 'optimizing': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-gradient-to-r from-blue-200 to-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Rocket className="h-6 w-6 text-blue-600" />
            PopSites Ultimate AI System
          </CardTitle>
          <CardDescription className="text-base">
            The most advanced AI-powered website creation platform. Simply describe what you need, and watch AI build it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <div key={index} className="p-4 bg-white rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                      <h3 className="font-semibold text-sm">{capability.name}</h3>
                    </div>
                    <Badge variant={getStatusVariant(capability.status)}>
                      {capability.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{capability.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Accuracy</span>
                    <span className="text-sm font-bold text-green-600">{capability.accuracy}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            Website Builder
          </TabsTrigger>
          <TabsTrigger value="architect" className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            Architect
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-1">
            <GraduationCap className="h-3 w-3" />
            Training
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-1">
            <Wand2 className="h-3 w-3" />
            Content
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="builder">
          <AIUniversalWebsiteBuilder />
        </TabsContent>
        
        <TabsContent value="architect">
          <AIAdvancedWebsiteArchitect />
        </TabsContent>
        
        <TabsContent value="training">
          <AIPopSitesMasterTrainingSystem />
        </TabsContent>
        
        <TabsContent value="content">
          <AIAdvancedContentEngine />
        </TabsContent>
      </Tabs>
    </div>
  );
}