import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Brain, TrendingUp, Users, Zap, Target } from 'lucide-react';
import AITrainingOrchestrator from './AITrainingOrchestrator';
import AIEnhancedTrainingSystem from './AIEnhancedTrainingSystem';

interface TrainingMetrics {
  totalSessions: number;
  successRate: number;
  averageImprovement: number;
  activeUsers: number;
  dataQuality: number;
  modelAccuracy: number;
}

interface AITrainingDashboardProps {
  onClose?: () => void;
}

const AITrainingDashboard: React.FC<AITrainingDashboardProps> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<TrainingMetrics>({
    totalSessions: 0,
    successRate: 0,
    averageImprovement: 0,
    activeUsers: 0,
    dataQuality: 0,
    modelAccuracy: 0
  });
  
  const [trainingHistory, setTrainingHistory] = useState<any[]>([]);
  const [isTrainingActive, setIsTrainingActive] = useState(false);
  const [currentTrainingSession, setCurrentTrainingSession] = useState<any>(null);

  useEffect(() => {
    loadTrainingMetrics();
    loadTrainingHistory();
  }, []);

  const loadTrainingMetrics = () => {
    const stored = localStorage.getItem('ai-training-metrics');
    if (stored) {
      setMetrics(JSON.parse(stored));
    } else {
      // Initialize with sample data
      const initialMetrics = {
        totalSessions: 47,
        successRate: 94.2,
        averageImprovement: 23.8,
        activeUsers: 156,
        dataQuality: 87.5,
        modelAccuracy: 91.3
      };
      setMetrics(initialMetrics);
      localStorage.setItem('ai-training-metrics', JSON.stringify(initialMetrics));
    }
  };

  const loadTrainingHistory = () => {
    const stored = localStorage.getItem('ai-training-history');
    if (stored) {
      setTrainingHistory(JSON.parse(stored));
    } else {
      const sampleHistory = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 86400000),
          type: 'Comprehensive Training',
          duration: 45,
          improvement: 18.5,
          status: 'completed'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 172800000),
          type: 'Content Generation',
          duration: 23,
          improvement: 12.3,
          status: 'completed'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 259200000),
          type: 'User Behavior Analysis',
          duration: 31,
          improvement: 15.7,
          status: 'completed'
        }
      ];
      setTrainingHistory(sampleHistory);
      localStorage.setItem('ai-training-history', JSON.stringify(sampleHistory));
    }
  };

  const handleTrainingComplete = (results: any) => {
    const newSession = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: 'Comprehensive Training',
      duration: Math.floor(Math.random() * 60) + 20,
      improvement: results.overallImprovement || 20,
      status: 'completed',
      results
    };
    
    const updatedHistory = [newSession, ...trainingHistory].slice(0, 10);
    setTrainingHistory(updatedHistory);
    localStorage.setItem('ai-training-history', JSON.stringify(updatedHistory));
    
    // Update metrics
    const updatedMetrics = {
      ...metrics,
      totalSessions: metrics.totalSessions + 1,
      averageImprovement: (metrics.averageImprovement + newSession.improvement) / 2,
      modelAccuracy: Math.min(99, metrics.modelAccuracy + 2)
    };
    setMetrics(updatedMetrics);
    localStorage.setItem('ai-training-metrics', JSON.stringify(updatedMetrics));
    
    setCurrentTrainingSession(newSession);
    setIsTrainingActive(false);
  };

  const startNewTrainingSession = () => {
    setIsTrainingActive(true);
    setCurrentTrainingSession(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            AI Training Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage AI training processes with comprehensive analytics
          </p>
        </div>
        {onClose && (
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.totalSessions}</div>
            <div className="text-sm text-muted-foreground">Training Sessions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{metrics.successRate}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{metrics.averageImprovement}%</div>
            <div className="text-sm text-muted-foreground">Avg Improvement</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{metrics.activeUsers}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{metrics.dataQuality}%</div>
            <div className="text-sm text-muted-foreground">Data Quality</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-teal-600">{metrics.modelAccuracy}%</div>
            <div className="text-sm text-muted-foreground">Model Accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Current Training Status */}
      {isTrainingActive && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
              <span className="font-medium">Training Session Active</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI models are currently being trained with the latest data...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Training Results */}
      {currentTrainingSession && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-medium">Training Completed Successfully</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-lg font-bold text-green-600">
                  {currentTrainingSession.improvement}%
                </div>
                <div className="text-sm text-muted-foreground">Improvement</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {formatDuration(currentTrainingSession.duration)}
                </div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">
                  {currentTrainingSession.timestamp.toLocaleTimeString()}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="orchestrator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orchestrator">Training Orchestrator</TabsTrigger>
          <TabsTrigger value="enhanced">Enhanced Training</TabsTrigger>
          <TabsTrigger value="history">Training History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orchestrator">
          <AITrainingOrchestrator onTrainingComplete={handleTrainingComplete} />
        </TabsContent>
        
        <TabsContent value="enhanced">
          <AIEnhancedTrainingSystem onTrainingComplete={handleTrainingComplete} />
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Training History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingHistory.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium">{session.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.timestamp.toLocaleString()}
                        </div>
                      </div>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+{session.improvement}%</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDuration(session.duration)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {trainingHistory.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No training history available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITrainingDashboard;