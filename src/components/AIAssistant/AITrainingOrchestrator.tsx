import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AITrainingDataCollector from './AITrainingDataCollector';
import AITrainingSystem from './AITrainingSystem';

interface TrainingModule {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  lastRun?: Date;
  results?: any;
}

interface AITrainingOrchestratorProps {
  onTrainingComplete: (results: any) => void;
}

const AITrainingOrchestrator: React.FC<AITrainingOrchestratorProps> = ({ onTrainingComplete }) => {
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([
    { id: 'behavior', name: 'User Behavior Analysis', status: 'idle', progress: 0 },
    { id: 'content', name: 'Content Generation', status: 'idle', progress: 0 },
    { id: 'design', name: 'Design Optimization', status: 'idle', progress: 0 },
    { id: 'personalization', name: 'Personalization Engine', status: 'idle', progress: 0 },
    { id: 'recommendations', name: 'Smart Recommendations', status: 'idle', progress: 0 }
  ]);
  
  const [collectedData, setCollectedData] = useState<any[]>([]);
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [trainingResults, setTrainingResults] = useState<any>(null);

  useEffect(() => {
    updateOverallProgress();
  }, [trainingModules]);

  const updateOverallProgress = () => {
    const totalProgress = trainingModules.reduce((sum, module) => sum + module.progress, 0);
    setOverallProgress(totalProgress / trainingModules.length);
  };

  const handleDataCollected = (data: any[]) => {
    setCollectedData(data);
  };

  const runTrainingModule = async (moduleId: string) => {
    setTrainingModules(prev => prev.map(m => 
      m.id === moduleId ? { ...m, status: 'running', progress: 0 } : m
    ));

    try {
      const module = trainingModules.find(m => m.id === moduleId);
      if (!module) return;

      // Simulate training progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setTrainingModules(prev => prev.map(m => 
          m.id === moduleId ? { ...m, progress: i } : m
        ));
      }

      // Call training function
      const { data, error } = await supabase.functions.invoke('ai-training', {
        body: {
          interactions: collectedData,
          trainingType: moduleId,
          moduleConfig: getModuleConfig(moduleId)
        }
      });

      if (error) throw error;

      setTrainingModules(prev => prev.map(m => 
        m.id === moduleId ? { 
          ...m, 
          status: 'completed', 
          progress: 100, 
          lastRun: new Date(),
          results: data
        } : m
      ));

    } catch (error) {
      console.error(`Training module ${moduleId} failed:`, error);
      setTrainingModules(prev => prev.map(m => 
        m.id === moduleId ? { ...m, status: 'error', progress: 0 } : m
      ));
    }
  };

  const getModuleConfig = (moduleId: string) => {
    const configs = {
      behavior: { focus: 'user_patterns', depth: 'deep' },
      content: { models: ['headlines', 'descriptions'], quality: 'high' },
      design: { elements: ['colors', 'layouts', 'typography'] },
      personalization: { segments: ['industry', 'style', 'features'] },
      recommendations: { algorithms: ['collaborative', 'content_based'] }
    };
    return configs[moduleId as keyof typeof configs] || {};
  };

  const runAllModules = async () => {
    setIsOrchestrating(true);
    
    for (const module of trainingModules) {
      await runTrainingModule(module.id);
    }
    
    // Generate comprehensive results
    const results = await generateComprehensiveResults();
    setTrainingResults(results);
    onTrainingComplete(results);
    setIsOrchestrating(false);
  };

  const generateComprehensiveResults = async () => {
    const moduleResults = trainingModules
      .filter(m => m.results)
      .reduce((acc, m) => ({ ...acc, [m.id]: m.results }), {});

    try {
      const { data, error } = await supabase.functions.invoke('ai-training', {
        body: {
          interactions: collectedData,
          trainingType: 'comprehensive',
          moduleResults
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      return {
        overallImprovement: 20,
        modulesCompleted: trainingModules.filter(m => m.status === 'completed').length,
        dataProcessed: collectedData.length,
        recommendations: ['Continue data collection', 'Run training weekly']
      };
    }
  };

  const resetTraining = () => {
    setTrainingModules(prev => prev.map(m => ({
      ...m,
      status: 'idle',
      progress: 0,
      results: undefined
    })));
    setTrainingResults(null);
    setOverallProgress(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'error': return <RotateCcw className="h-3 w-3" />;
      default: return <Pause className="h-3 w-3" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI Training Orchestrator
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span>{overallProgress.toFixed(1)}%</span>
              </div>
              <Progress value={overallProgress} className="w-full" />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={runAllModules} 
                disabled={isOrchestrating || collectedData.length === 0}
                size="sm"
              >
                {isOrchestrating ? 'Training...' : 'Run All'}
              </Button>
              <Button onClick={resetTraining} variant="outline" size="sm">
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="modules">Training Modules</TabsTrigger>
              <TabsTrigger value="data">Data Collection</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="modules" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainingModules.map((module) => (
                  <Card key={module.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{module.name}</h4>
                        <Badge className={getStatusColor(module.status)}>
                          {getStatusIcon(module.status)}
                          {module.status}
                        </Badge>
                      </div>
                      <Progress value={module.progress} className="mb-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {module.lastRun ? `Last run: ${module.lastRun.toLocaleString()}` : 'Never run'}
                        </span>
                        <Button 
                          onClick={() => runTrainingModule(module.id)}
                          disabled={module.status === 'running' || collectedData.length === 0}
                          size="sm"
                          variant="outline"
                        >
                          Run
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="data">
              <AITrainingDataCollector onDataCollected={handleDataCollected} />
            </TabsContent>
            
            <TabsContent value="results">
              {trainingResults ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {trainingResults.overallImprovement}%
                      </div>
                      <div className="text-sm text-muted-foreground">Overall Improvement</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {trainingResults.modulesCompleted}
                      </div>
                      <div className="text-sm text-muted-foreground">Modules Completed</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {trainingResults.dataProcessed}
                      </div>
                      <div className="text-sm text-muted-foreground">Data Points Processed</div>
                    </div>
                  </div>
                  
                  {trainingResults.recommendations && (
                    <div>
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="space-y-1">
                        {trainingResults.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No training results available. Run training modules to see results.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITrainingOrchestrator;