import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Github, Database, Globe, Smartphone, Cloud, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface PlatformIntegration {
  name: string;
  type: 'deployment' | 'storage' | 'mobile' | 'version-control';
  status: 'connected' | 'available' | 'configuring';
  icon: React.ComponentType<any>;
  features: string[];
}

export const AIUniversalPlatformIntegrator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [deploymentConfig, setDeploymentConfig] = useState('');

  const platforms: PlatformIntegration[] = [
    {
      name: 'GitHub',
      type: 'version-control',
      status: 'connected',
      icon: Github,
      features: ['Repository Management', 'CI/CD Pipeline', 'Version Control', 'Collaboration']
    },
    {
      name: 'Supabase',
      type: 'storage',
      status: 'connected',
      icon: Database,
      features: ['Database', 'Authentication', 'Real-time', 'Storage']
    },
    {
      name: 'Netlify',
      type: 'deployment',
      status: 'available',
      icon: Globe,
      features: ['Static Hosting', 'Serverless Functions', 'Form Handling', 'CDN']
    },
    {
      name: 'Play Store',
      type: 'mobile',
      status: 'configuring',
      icon: Smartphone,
      features: ['App Publishing', 'Store Optimization', 'Analytics', 'Updates']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'configuring': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'configuring': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <Cloud className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Universal Platform Integrator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deployment">Deploy</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((platform, index) => {
                  const Icon = platform.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Icon className="h-6 w-6 text-blue-600" />
                            <h3 className="font-semibold">{platform.name}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(platform.status)}
                            <Badge className={getStatusColor(platform.status)}>
                              {platform.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {platform.features.map((feature, idx) => (
                            <div key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <Button className="w-full mt-3" size="sm">
                          {platform.status === 'connected' ? 'Configure' : 'Connect'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="deployment" className="mt-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Deployment Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Deployment Target</label>
                        <Input placeholder="Enter deployment URL" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Build Command</label>
                        <Input placeholder="npm run build" />
                      </div>
                    </div>
                    <Button className="w-full">
                      <Globe className="h-4 w-4 mr-2" />
                      Deploy to Production
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="mt-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mobile App Publishing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="text-center">
                        <CardContent className="p-4">
                          <Smartphone className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <h4 className="font-semibold">Play Store</h4>
                          <p className="text-sm text-muted-foreground">Android Publishing</p>
                          <Button size="sm" className="mt-2">Configure</Button>
                        </CardContent>
                      </Card>
                      <Card className="text-center">
                        <CardContent className="p-4">
                          <Smartphone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <h4 className="font-semibold">App Store</h4>
                          <p className="text-sm text-muted-foreground">iOS Publishing</p>
                          <Button size="sm" className="mt-2">Configure</Button>
                        </CardContent>
                      </Card>
                      <Card className="text-center">
                        <CardContent className="p-4">
                          <Smartphone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <h4 className="font-semibold">Galaxy Store</h4>
                          <p className="text-sm text-muted-foreground">Samsung Publishing</p>
                          <Button size="sm" className="mt-2">Configure</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="mt-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Available Integrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Vercel', 'AWS', 'Firebase', 'Heroku', 'Docker', 'Kubernetes', 'Azure', 'GCP'].map((service) => (
                        <Button key={service} variant="outline" size="sm" className="justify-start">
                          <Cloud className="h-4 w-4 mr-2" />
                          {service}
                        </Button>
                      ))}
                    </div>
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