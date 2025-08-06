import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Server, Cloud, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface DeploymentTarget {
  id: string;
  name: string;
  type: 'web' | 'mobile' | 'desktop';
  status: 'idle' | 'building' | 'deploying' | 'deployed' | 'failed';
  progress?: number;
  url?: string;
  lastDeploy?: string;
}

export const AIPopSitesDeploymentEngine: React.FC = () => {
  const [deployments, setDeployments] = useState<DeploymentTarget[]>([
    { id: '1', name: 'Production Website', type: 'web', status: 'deployed', url: 'https://mysite.com', lastDeploy: '2 hours ago' },
    { id: '2', name: 'Mobile App (PWA)', type: 'mobile', status: 'building', progress: 45 },
    { id: '3', name: 'Staging Environment', type: 'web', status: 'idle' },
    { id: '4', name: 'Desktop App', type: 'desktop', status: 'failed', lastDeploy: '1 day ago' }
  ]);

  const handleDeploy = (id: string) => {
    setDeployments(prev => prev.map(d => 
      d.id === id ? { ...d, status: 'building', progress: 0 } : d
    ));
    
    // Simulate deployment process
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      const currentStatus = progress < 50 ? 'building' : progress < 90 ? 'deploying' : 'deployed';
      
      setDeployments(prev => prev.map(d => 
        d.id === id ? { 
          ...d, 
          status: currentStatus as any,
          progress: Math.min(progress, 100),
          ...(progress >= 100 && { 
            url: `https://deployed-${id}.netlify.app`,
            lastDeploy: 'Just now',
            progress: undefined
          })
        } : d
      ));
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'building': case 'deploying': return <Zap className="h-4 w-4 text-yellow-500" />;
      default: return <Server className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Deployment Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deployments.map((deployment) => (
              <Card key={deployment.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(deployment.status)}
                    <div>
                      <h4 className="font-medium">{deployment.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {deployment.type} • {deployment.status}
                      </p>
                    </div>
                  </div>
                  <Badge variant={deployment.status === 'deployed' ? 'default' : 'secondary'}>
                    {deployment.status}
                  </Badge>
                </div>
                
                {deployment.progress !== undefined && (
                  <div className="mb-3">
                    <Progress value={deployment.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {deployment.status === 'building' ? 'Building' : 'Deploying'}... {Math.round(deployment.progress)}%
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    {deployment.url && (
                      <a href={deployment.url} target="_blank" rel="noopener noreferrer" 
                         className="text-sm text-blue-600 hover:underline">
                        {deployment.url}
                      </a>
                    )}
                    {deployment.lastDeploy && (
                      <p className="text-xs text-muted-foreground">
                        Last deploy: {deployment.lastDeploy}
                      </p>
                    )}
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => handleDeploy(deployment.id)}
                    disabled={deployment.status === 'building' || deployment.status === 'deploying'}
                  >
                    {deployment.status === 'deployed' ? 'Redeploy' : 
                     deployment.status === 'building' || deployment.status === 'deploying' ? 'Deploying...' : 'Deploy'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};