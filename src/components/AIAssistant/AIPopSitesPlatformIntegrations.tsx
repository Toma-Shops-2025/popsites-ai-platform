import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Github, Database, Globe, Smartphone, Cloud, Code, Zap } from 'lucide-react';

interface IntegrationStatus {
  platform: string;
  status: 'connected' | 'disconnected' | 'configuring';
  lastSync?: string;
  deployments?: number;
}

export const AIPopSitesPlatformIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([
    { platform: 'GitHub', status: 'connected', lastSync: '2 min ago', deployments: 15 },
    { platform: 'Supabase', status: 'connected', lastSync: '5 min ago' },
    { platform: 'Netlify', status: 'connected', lastSync: '1 min ago', deployments: 8 },
    { platform: 'Vercel', status: 'disconnected' },
    { platform: 'Firebase', status: 'configuring' }
  ]);

  const platformIcons = {
    GitHub: Github,
    Supabase: Database,
    Netlify: Globe,
    Vercel: Zap,
    Firebase: Cloud
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => {
          const Icon = platformIcons[integration.platform as keyof typeof platformIcons];
          return (
            <Card key={integration.platform}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <CardTitle className="text-sm">{integration.platform}</CardTitle>
                  </div>
                  <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                    {integration.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {integration.lastSync && (
                  <p className="text-xs text-muted-foreground mb-2">
                    Last sync: {integration.lastSync}
                  </p>
                )}
                {integration.deployments && (
                  <p className="text-xs mb-2">
                    Deployments: {integration.deployments}
                  </p>
                )}
                <Button size="sm" className="w-full">
                  {integration.status === 'connected' ? 'Manage' : 'Connect'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};