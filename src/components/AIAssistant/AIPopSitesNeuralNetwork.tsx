import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Network, Zap, Target, TrendingUp, Activity } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface NeuralNode {
  id: string;
  name: string;
  type: 'input' | 'hidden' | 'output';
  activation: number;
  connections: number;
}

interface LearningMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}

export function AIPopSitesNeuralNetwork() {
  const [nodes, setNodes] = useState<NeuralNode[]>([
    { id: '1', name: 'User Intent', type: 'input', activation: 0, connections: 12 },
    { id: '2', name: 'Design Patterns', type: 'input', activation: 0, connections: 8 },
    { id: '3', name: 'Content Analysis', type: 'input', activation: 0, connections: 15 },
    { id: '4', name: 'Layout Engine', type: 'hidden', activation: 0, connections: 20 },
    { id: '5', name: 'Style Generator', type: 'hidden', activation: 0, connections: 18 },
    { id: '6', name: 'Code Optimizer', type: 'hidden', activation: 0, connections: 25 },
    { id: '7', name: 'Website Output', type: 'output', activation: 0, connections: 0 },
    { id: '8', name: 'Performance Score', type: 'output', activation: 0, connections: 0 }
  ]);
  
  const [metrics, setMetrics] = useState<LearningMetric[]>([
    { name: 'Learning Rate', value: 0.95, trend: 'up', icon: Brain },
    { name: 'Accuracy', value: 0.92, trend: 'up', icon: Target },
    { name: 'Processing Speed', value: 0.88, trend: 'stable', icon: Zap },
    { name: 'Network Efficiency', value: 0.94, trend: 'up', icon: Network }
  ]);
  
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const startNeuralTraining = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    try {
      const { data } = await supabase.functions.invoke('ai-nlp-processor', {
        body: { action: 'train_neural_network', nodes, metrics }
      });
      
      // Simulate neural network training
      const trainingInterval = setInterval(() => {
        setTrainingProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          
          // Update node activations during training
          setNodes(prevNodes => prevNodes.map(node => ({
            ...node,
            activation: Math.min(100, node.activation + Math.random() * 15)
          })));
          
          // Update metrics
          if (newProgress > 50) {
            setMetrics(prevMetrics => prevMetrics.map(metric => ({
              ...metric,
              value: Math.min(1, metric.value + Math.random() * 0.02),
              trend: Math.random() > 0.3 ? 'up' : 'stable'
            })));
          }
          
          if (newProgress >= 100) {
            clearInterval(trainingInterval);
            setIsTraining(false);
            return 100;
          }
          
          return newProgress;
        });
      }, 200);
      
    } catch (error) {
      console.error('Neural training error:', error);
      setIsTraining(false);
    }
  };

  const getNodeColor = (type: string, activation: number) => {
    const intensity = Math.min(activation / 100, 1);
    switch (type) {
      case 'input': return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`;
      case 'hidden': return `rgba(168, 85, 247, ${0.3 + intensity * 0.7})`;
      case 'output': return `rgba(34, 197, 94, ${0.3 + intensity * 0.7})`;
      default: return 'rgba(156, 163, 175, 0.3)';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            PopSites Neural Network
          </CardTitle>
          <CardDescription>
            Advanced neural network powering intelligent website generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Training Progress</h3>
              <p className="text-sm text-muted-foreground">Network optimization status</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{Math.round(trainingProgress)}%</div>
              <Progress value={trainingProgress} className="w-32 h-2" />
            </div>
          </div>
          
          <Button 
            onClick={startNeuralTraining} 
            disabled={isTraining}
            className="w-full"
          >
            {isTraining ? 'Training Neural Network...' : 'Start Neural Training'}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Network Nodes</CardTitle>
            <CardDescription>Neural network architecture visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nodes.map((node) => (
                <div key={node.id} className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full border-2"
                      style={{ backgroundColor: getNodeColor(node.type, node.activation) }}
                    />
                    <div>
                      <div className="font-medium text-sm">{node.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {node.type} • {node.connections} connections
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{Math.round(node.activation)}%</div>
                    <Progress value={node.activation} className="w-16 h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Learning Metrics</CardTitle>
            <CardDescription>Network performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-purple-500" />
                      <span className="font-medium text-sm">{metric.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{(metric.value * 100).toFixed(1)}%</span>
                      <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}