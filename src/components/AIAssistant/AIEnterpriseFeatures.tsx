import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Database, Cloud, Zap, Users, BarChart, Lock, Globe, Server, Cpu } from 'lucide-react';

interface AIEnterpriseFeatures {
  onFeatureEnable: (feature: string) => void;
}

const AIEnterpriseFeatures: React.FC<AIEnterpriseFeatures> = ({ onFeatureEnable }) => {
  const [activeFeatures, setActiveFeatures] = useState<string[]>(['security', 'analytics']);

  const enterpriseFeatures = {
    security: {
      title: 'Advanced Security',
      icon: Shield,
      description: 'Enterprise-grade security with SSL, WAF, and DDoS protection',
      features: ['SSL Certificates', 'Web Application Firewall', 'DDoS Protection', 'Security Monitoring'],
      status: 'active',
      usage: 95
    },
    analytics: {
      title: 'Advanced Analytics',
      icon: BarChart,
      description: 'Deep insights with custom dashboards and reporting',
      features: ['Custom Dashboards', 'Real-time Analytics', 'Export Reports', 'API Access'],
      status: 'active',
      usage: 78
    },
    infrastructure: {
      title: 'Cloud Infrastructure',
      icon: Cloud,
      description: 'Scalable cloud infrastructure with global CDN',
      features: ['Global CDN', 'Auto Scaling', 'Load Balancing', 'Edge Computing'],
      status: 'available',
      usage: 0
    },
    database: {
      title: 'Database Management',
      icon: Database,
      description: 'Advanced database features with backup and replication',
      features: ['Automated Backups', 'Database Replication', 'Query Optimization', 'Data Migration'],
      status: 'available',
      usage: 0
    },
    performance: {
      title: 'Performance Optimization',
      icon: Zap,
      description: 'AI-powered performance optimization and monitoring',
      features: ['Code Optimization', 'Image Compression', 'Caching Strategy', 'Performance Monitoring'],
      status: 'beta',
      usage: 45
    },
    collaboration: {
      title: 'Team Collaboration',
      icon: Users,
      description: 'Advanced team features with role management',
      features: ['Role-based Access', 'Team Workspaces', 'Approval Workflows', 'Activity Logs'],
      status: 'available',
      usage: 0
    }
  };

  const toggleFeature = (featureKey: string) => {
    const feature = enterpriseFeatures[featureKey as keyof typeof enterpriseFeatures];
    if (feature.status === 'available') {
      setActiveFeatures(prev => [...prev, featureKey]);
      onFeatureEnable(featureKey);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'beta': return 'bg-yellow-500';
      case 'available': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'beta': return 'Beta';
      case 'available': return 'Available';
      default: return 'Coming Soon';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Enterprise AI Features</h2>
        <p className="text-muted-foreground">Advanced capabilities for enterprise-level websites</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(enterpriseFeatures).map(([key, feature]) => (
              <Card key={key} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(feature.status)}>
                      {getStatusText(feature.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {feature.status === 'active' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Usage</span>
                          <span>{feature.usage}%</span>
                        </div>
                        <Progress value={feature.usage} className="w-full" />
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {feature.status === 'available' && (
                        <Button 
                          onClick={() => toggleFeature(key)}
                          className="flex-1"
                        >
                          Enable Feature
                        </Button>
                      )}
                      {feature.status === 'active' && (
                        <Button variant="outline" className="flex-1">
                          Configure
                        </Button>
                      )}
                      {feature.status === 'beta' && (
                        <Button variant="outline" className="flex-1">
                          Join Beta
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">99.9%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">256-bit</p>
                    <p className="text-sm text-muted-foreground">SSL Encryption</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-bold">24/7</p>
                    <p className="text-sm text-muted-foreground">Monitoring</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Threats Blocked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">1.2s</p>
                  <p className="text-sm text-muted-foreground">Load Time</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <BarChart className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">98</p>
                  <p className="text-sm text-muted-foreground">Performance Score</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Server className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-sm text-muted-foreground">Cache Hit Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Cloud className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">CDN Locations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Infrastructure Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Global CDN</span>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Auto Scaling</span>
                  </div>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Load Balancer</span>
                  </div>
                  <Badge variant="outline">Configured</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span>Edge Computing</span>
                  </div>
                  <Badge variant="outline">Beta</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIEnterpriseFeatures;