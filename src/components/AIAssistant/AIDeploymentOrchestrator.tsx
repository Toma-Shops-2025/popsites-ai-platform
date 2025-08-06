import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Rocket, CheckCircle, AlertCircle, Clock, Globe, Smartphone, Database, Github } from 'lucide-react';

interface DeploymentStep {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: string;
  description: string;
}

interface DeploymentTarget {
  name: string;
  type: 'web' | 'mobile' | 'api';
  platform: string;
  status: 'ready' | 'deploying' | 'deployed' | 'failed';
  url?: string;
  icon: React.ComponentType<any>;
}

export const AIDeploymentOrchestrator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);

  const deploymentSteps: DeploymentStep[] = [
    {
      name: 'Code Analysis',
      status: 'completed',
      duration: '2s',
      description: 'Analyzing code structure and dependencies'
    },
    {
      name: 'Build Process',
      status: 'running',
      description: 'Compiling and optimizing application'
    },
    {
      name: 'Testing',
      status: 'pending',
      description: 'Running automated tests and quality checks'
    },
    {
      name: 'Deployment',
      status: 'pending',
      description: 'Deploying to production environment'
    },
    {
      name: 'Verification',
      status: 'pending',
      description: 'Verifying deployment and running health checks'
    }
  ];

  const deploymentTargets: DeploymentTarget[] = [
    {
      name: 'Web Application',
      type: 'web',
      platform: 'Netlify',
      status: 'deployed',
      url: 'https://myapp.netlify.app',
      icon: Globe
    },
    {
      name: 'Mobile App - Android',
      type: 'mobile',
      platform: 'Play Store',
      status: 'ready',
      icon: Smartphone
    },
    {
      name: 'Mobile App - iOS',
      type: 'mobile',
      platform: 'App Store',
      status: 'ready',
      icon: Smartphone
    },
    {
      name: 'API Backend',
      type: 'api',
      platform: 'Supabase',
      status: 'deployed',
      url: 'https://api.myapp.com',
      icon: Database
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'deployed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'running':
      case 'deploying':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'deployed':
        return 'bg-green-100 text-green-800';
      case 'running':
      case 'deploying':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'ready':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeploy = (target: DeploymentTarget) => {
    setIsDeploying(true);
    setDeploymentProgress(0);
    
    // Simulate deployment process
    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-600" />
            AI Deployment Orchestrator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="web">Web Deploy</TabsTrigger>
              <TabsTrigger value="mobile">Mobile Publish</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Deployment Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deploymentSteps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                          {getStatusIcon(step.status)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{step.name}</h4>
                              {step.duration && (
                                <Badge variant="outline" className="text-xs">
                                  {step.duration}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <Badge className={getStatusColor(step.status)}>
                            {step.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deploymentTargets.map((target, index) => {
                    const Icon = target.icon;
                    return (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5 text-blue-600" />
                              <h3 className="font-semibold">{target.name}</h3>
                            </div>
                            <Badge className={getStatusColor(target.status)}>
                              {target.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Platform: {target.platform}
                          </p>
                          {target.url && (
                            <p className="text-xs text-blue-600 mb-3 truncate">
                              {target.url}
                            </p>
                          )}
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleDeploy(target)}
                            disabled={isDeploying}
                          >
                            {target.status === 'deployed' ? 'Redeploy' : 'Deploy'}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="web" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Web Deployment Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Domain Name</label>
                      <Input placeholder="myapp.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Environment</label>
                      <Input placeholder="production" />
                    </div>
                  </div>
                  {isDeploying && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Deployment Progress</span>
                        <span>{deploymentProgress}%</span>
                      </div>
                      <Progress value={deploymentProgress} />
                    </div>
                  )}
                  <Button className="w-full" disabled={isDeploying}>
                    <Globe className="h-4 w-4 mr-2" />
                    Deploy to Web
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mobile" className="mt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Play Store</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <Smartphone className="h-12 w-12 mx-auto mb-2 text-green-600" />
                        <Badge className="bg-green-100 text-green-800">Ready</Badge>
                      </div>
                      <Button className="w-full">
                        Publish to Play Store
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">App Store</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <Smartphone className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                        <Badge className="bg-blue-100 text-blue-800">Ready</Badge>
                      </div>
                      <Button className="w-full">
                        Publish to App Store
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Galaxy Store</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <Smartphone className="h-12 w-12 mx-auto mb-2 text-purple-600" />
                        <Badge className="bg-purple-100 text-purple-800">Ready</Badge>
                      </div>
                      <Button className="w-full">
                        Publish to Galaxy Store
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="text-center">
                  <CardContent className="p-4">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-4">
                    <Rocket className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">1.2s</div>
                    <p className="text-xs text-muted-foreground">Load Time</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-4">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">247</div>
                    <p className="text-xs text-muted-foreground">Deployments</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-4">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                    <div className="text-2xl font-bold text-yellow-600">0</div>
                    <p className="text-xs text-muted-foreground">Issues</p>
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