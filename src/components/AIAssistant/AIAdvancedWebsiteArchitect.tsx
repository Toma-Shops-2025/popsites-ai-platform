import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Building2, Code, Database, Globe, Layers, Palette, Shield, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ArchitecturePhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
}

export function AIAdvancedWebsiteArchitect() {
  const [projectName, setProjectName] = useState('');
  const [phases, setPhases] = useState<ArchitecturePhase[]>([
    { id: '1', name: 'Planning', description: 'Analyzing requirements and creating blueprint', status: 'pending', progress: 0 },
    { id: '2', name: 'Structure', description: 'Building site architecture and navigation', status: 'pending', progress: 0 },
    { id: '3', name: 'Design', description: 'Creating visual design system', status: 'pending', progress: 0 },
    { id: '4', name: 'Development', description: 'Generating code and components', status: 'pending', progress: 0 },
    { id: '5', name: 'Integration', description: 'Connecting APIs and databases', status: 'pending', progress: 0 },
    { id: '6', name: 'Optimization', description: 'Performance and SEO optimization', status: 'pending', progress: 0 }
  ]);
  const [isBuilding, setIsBuilding] = useState(false);

  const startArchitecting = async () => {
    if (!projectName.trim()) return;
    
    setIsBuilding(true);
    
    try {
      const { data } = await supabase.functions.invoke('ai-site-architect', {
        body: { projectName, phases }
      });
      
      // Simulate progressive building
      for (let i = 0; i < phases.length; i++) {
        setTimeout(() => {
          setPhases(prev => prev.map((phase, index) => {
            if (index === i) {
              return { ...phase, status: 'completed', progress: 100 };
            } else if (index === i + 1) {
              return { ...phase, status: 'in-progress', progress: 50 };
            }
            return phase;
          }));
        }, i * 2000);
      }
      
      setTimeout(() => {
        setIsBuilding(false);
      }, phases.length * 2000);
      
    } catch (error) {
      console.error('Architecture error:', error);
      setIsBuilding(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            AI Website Architect
          </CardTitle>
          <CardDescription>
            Advanced AI system that architects complete websites from your vision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter your project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={startArchitecting} disabled={isBuilding || !projectName.trim()}>
              {isBuilding ? 'Architecting...' : 'Start Building'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {phases.map((phase) => (
          <Card key={phase.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    phase.status === 'completed' ? 'bg-green-500' :
                    phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <h3 className="font-semibold">{phase.name}</h3>
                </div>
                <Badge variant={phase.status === 'completed' ? 'default' : 'secondary'}>
                  {phase.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
              <Progress value={phase.progress} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}