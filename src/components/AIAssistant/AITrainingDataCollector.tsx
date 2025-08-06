import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Activity, TrendingUp, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface TrainingDataPoint {
  id: string;
  type: string;
  timestamp: Date;
  data: any;
  userId?: string;
}

interface AITrainingDataCollectorProps {
  onDataCollected: (data: TrainingDataPoint[]) => void;
}

const AITrainingDataCollector: React.FC<AITrainingDataCollectorProps> = ({ onDataCollected }) => {
  const [collectedData, setCollectedData] = useState<TrainingDataPoint[]>([]);
  const [isCollecting, setIsCollecting] = useState(false);
  const [stats, setStats] = useState({
    totalInteractions: 0,
    uniqueUsers: 0,
    dataQuality: 0,
    collectionRate: 0
  });

  useEffect(() => {
    loadExistingData();
    startDataCollection();
  }, []);

  const loadExistingData = () => {
    const stored = localStorage.getItem('ai-training-data');
    if (stored) {
      const data = JSON.parse(stored);
      setCollectedData(data);
      updateStats(data);
    }
  };

  const startDataCollection = () => {
    setIsCollecting(true);
    
    // Simulate real-time data collection
    const interval = setInterval(() => {
      const newDataPoint: TrainingDataPoint = {
        id: Date.now().toString(),
        type: getRandomInteractionType(),
        timestamp: new Date(),
        data: generateMockInteractionData(),
        userId: `user_${Math.floor(Math.random() * 100)}`
      };
      
      setCollectedData(prev => {
        const updated = [...prev, newDataPoint].slice(-1000); // Keep last 1000 entries
        localStorage.setItem('ai-training-data', JSON.stringify(updated));
        updateStats(updated);
        onDataCollected(updated);
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  };

  const getRandomInteractionType = () => {
    const types = [
      'website_request',
      'style_selection',
      'content_generation',
      'template_choice',
      'feature_usage',
      'build_completed',
      'user_feedback'
    ];
    return types[Math.floor(Math.random() * types.length)];
  };

  const generateMockInteractionData = () => {
    const mockData = {
      website_request: {
        description: 'Modern e-commerce store for fashion',
        industry: 'fashion',
        features: ['shopping cart', 'payment', 'responsive']
      },
      style_selection: {
        style: ['modern', 'minimalist', 'professional'][Math.floor(Math.random() * 3)],
        colors: ['blue', 'green', 'purple'][Math.floor(Math.random() * 3)]
      },
      content_generation: {
        type: 'headline',
        tone: 'professional',
        length: 'medium'
      },
      template_choice: {
        templateId: `template_${Math.floor(Math.random() * 50)}`,
        category: 'business'
      },
      feature_usage: {
        feature: ['drag-drop', 'ai-assistant', 'preview'][Math.floor(Math.random() * 3)],
        duration: Math.floor(Math.random() * 300)
      },
      build_completed: {
        buildTime: Math.floor(Math.random() * 600),
        satisfaction: Math.floor(Math.random() * 5) + 1
      },
      user_feedback: {
        rating: Math.floor(Math.random() * 5) + 1,
        comment: 'Great AI assistance!'
      }
    };
    
    return mockData[getRandomInteractionType() as keyof typeof mockData] || {};
  };

  const updateStats = (data: TrainingDataPoint[]) => {
    const uniqueUsers = new Set(data.map(d => d.userId)).size;
    const qualityScore = calculateDataQuality(data);
    const collectionRate = data.length > 0 ? (data.length / 1000) * 100 : 0;
    
    setStats({
      totalInteractions: data.length,
      uniqueUsers,
      dataQuality: qualityScore,
      collectionRate: Math.min(100, collectionRate)
    });
  };

  const calculateDataQuality = (data: TrainingDataPoint[]) => {
    if (data.length === 0) return 0;
    
    const validData = data.filter(d => d.data && Object.keys(d.data).length > 0);
    return Math.floor((validData.length / data.length) * 100);
  };

  const exportTrainingData = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-training', {
        body: {
          interactions: collectedData,
          trainingType: 'export_data'
        }
      });
      
      if (error) throw error;
      
      const blob = new Blob([JSON.stringify(collectedData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-training-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const clearData = () => {
    setCollectedData([]);
    localStorage.removeItem('ai-training-data');
    updateStats([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          AI Training Data Collector
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalInteractions}</div>
            <div className="text-sm text-muted-foreground">Total Interactions</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.uniqueUsers}</div>
            <div className="text-sm text-muted-foreground">Unique Users</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.dataQuality}%</div>
            <div className="text-sm text-muted-foreground">Data Quality</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.collectionRate.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Collection Rate</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Activity className={`h-4 w-4 ${isCollecting ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} />
          <span className="text-sm">
            {isCollecting ? 'Actively collecting training data...' : 'Data collection paused'}
          </span>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Recent Data Points</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {collectedData.slice(-5).map((point) => (
                <div key={point.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{point.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {point.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={exportTrainingData} variant="outline">
              Export Data
            </Button>
            <Button onClick={clearData} variant="outline">
              Clear Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AITrainingDataCollector;