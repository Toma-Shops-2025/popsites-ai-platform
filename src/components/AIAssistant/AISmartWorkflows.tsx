import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, RotateCcw, CheckCircle, Clock, Zap, Settings, Target } from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: string[];
  progress: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  estimatedTime: string;
}

interface AISmartWorkflowsProps {
  onWorkflowStart: (workflowId: string) => void;
}

const AISmartWorkflows: React.FC<AISmartWorkflowsProps> = ({ onWorkflowStart }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 'seo-optimization',
      name: 'SEO Optimization',
      description: 'Automatically optimize your site for search engines',
      steps: ['Keyword Analysis', 'Meta Tags', 'Content Optimization', 'Schema Markup'],
      progress: 0,
      status: 'idle',
      estimatedTime: '5-10 minutes'
    },
    {
      id: 'performance-boost',
      name: 'Performance Boost',
      description: 'Optimize loading speed and user experience',
      steps: ['Image Compression', 'Code Minification', 'Caching Setup', 'CDN Configuration'],
      progress: 0,
      status: 'idle',
      estimatedTime: '3-7 minutes'
    },
    {
      id: 'security-hardening',
      name: 'Security Hardening',
      description: 'Implement security best practices',
      steps: ['SSL Setup', 'Security Headers', 'Input Validation', 'Backup Configuration'],
      progress: 0,
      status: 'idle',
      estimatedTime: '8-15 minutes'
    },
    {
      id: 'mobile-optimization',
      name: 'Mobile Optimization',
      description: 'Ensure perfect mobile experience',
      steps: ['Responsive Design', 'Touch Optimization', 'Mobile Speed', 'App-like Features'],
      progress: 0,
      status: 'idle',
      estimatedTime: '6-12 minutes'
    }
  ]);

  const handleWorkflowAction = (workflowId: string, action: 'start' | 'pause' | 'reset') => {
    setWorkflows(prev => prev.map(workflow => {
      if (workflow.id === workflowId) {
        switch (action) {
          case 'start':
            onWorkflowStart(workflowId);
            return { ...workflow, status: 'running' as const };
          case 'pause':
            return { ...workflow, status: 'paused' as const };
          case 'reset':
            return { ...workflow, status: 'idle' as const, progress: 0 };
          default:
            return workflow;
        }
      }
      return workflow;
    }));
  };

  const getStatusIcon = (status: Workflow['status']) => {
    switch (status) {
      case 'running': return <Clock className="h-4 w-4 animate-spin" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Smart Workflows</h2>
        <p className="text-muted-foreground">Automate complex tasks with AI-powered workflows</p>
      </div>

      <Tabs defaultValue="optimization" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="optimization" className="space-y-4">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(workflow.status)}
                      {workflow.name}
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {workflow.description}
                    </p>
                  </div>
                  <Badge variant="outline">{workflow.estimatedTime}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{workflow.progress}%</span>
                    </div>
                    <Progress value={workflow.progress} className="w-full" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Workflow Steps:</h4>
                    <div className="flex flex-wrap gap-1">
                      {workflow.steps.map((step, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {step}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {workflow.status === 'idle' && (
                      <Button 
                        onClick={() => handleWorkflowAction(workflow.id, 'start')}
                        className="flex-1"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Workflow
                      </Button>
                    )}
                    {workflow.status === 'running' && (
                      <Button 
                        onClick={() => handleWorkflowAction(workflow.id, 'pause')}
                        variant="outline"
                        className="flex-1"
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    {(workflow.status === 'paused' || workflow.status === 'completed') && (
                      <Button 
                        onClick={() => handleWorkflowAction(workflow.id, 'reset')}
                        variant="outline"
                        className="flex-1"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="marketing" className="text-center py-8">
          <div className="space-y-4">
            <Target className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-semibold">Marketing Workflows</h3>
            <p className="text-muted-foreground">Coming soon: Social media automation, email campaigns, and analytics</p>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="text-center py-8">
          <div className="space-y-4">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-semibold">Maintenance Workflows</h3>
            <p className="text-muted-foreground">Coming soon: Automated backups, updates, and health checks</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AISmartWorkflows;