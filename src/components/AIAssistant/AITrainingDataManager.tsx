import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Upload, Download, BarChart3, RefreshCw } from 'lucide-react';
import { AIService } from './AIService';

interface TrainingDataStats {
  totalSamples: number;
  successfulBuilds: number;
  userFeedback: number;
  qualityScore: number;
}

interface AITrainingDataManagerProps {
  onDataUpdate?: (stats: TrainingDataStats) => void;
}

const AITrainingDataManager: React.FC<AITrainingDataManagerProps> = ({ onDataUpdate }) => {
  const [stats, setStats] = useState<TrainingDataStats>({
    totalSamples: 15420,
    successfulBuilds: 13876,
    userFeedback: 8945,
    qualityScore: 94.2
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');

  const dataCategories = [
    {
      name: 'Website Descriptions',
      count: 5420,
      quality: 96,
      type: 'input'
    },
    {
      name: 'Generated Templates',
      count: 4890,
      quality: 94,
      type: 'output'
    },
    {
      name: 'User Interactions',
      count: 3210,
      quality: 92,
      type: 'feedback'
    },
    {
      name: 'Success Metrics',
      count: 1900,
      quality: 98,
      type: 'analytics'
    }
  ];

  const processingTasks = [
    'Collecting new training data',
    'Validating data quality',
    'Processing user feedback',
    'Updating AI models',
    'Optimizing performance'
  ];

  const startDataProcessing = async () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    for (let i = 0; i < processingTasks.length; i++) {
      setCurrentTask(processingTasks[i]);
      
      // Simulate processing time
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProcessingProgress((i * 100 + progress) / processingTasks.length);
      }
    }
    
    // Update stats after processing
    const updatedStats = {
      ...stats,
      totalSamples: stats.totalSamples + Math.floor(Math.random() * 100),
      successfulBuilds: stats.successfulBuilds + Math.floor(Math.random() * 50),
      userFeedback: stats.userFeedback + Math.floor(Math.random() * 30),
      qualityScore: Math.min(99.9, stats.qualityScore + Math.random() * 0.5)
    };
    
    setStats(updatedStats);
    setIsProcessing(false);
    setProcessingProgress(100);
    
    if (onDataUpdate) {
      onDataUpdate(updatedStats);
    }
  };

  const exportData = () => {
    const dataBlob = new Blob([JSON.stringify(stats, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-training-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            setStats(data);
            if (onDataUpdate) onDataUpdate(data);
          } catch (error) {
            console.error('Error importing data:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            AI Training Data Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Data Categories</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="export">Import/Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.totalSamples.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Samples</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.successfulBuilds.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Successful Builds</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.userFeedback.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">User Feedback</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {stats.qualityScore.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Quality Score</div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {((stats.successfulBuilds / stats.totalSamples) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(stats.successfulBuilds / stats.totalSamples) * 100} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataCategories.map((category, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{category.name}</h3>
                        <Badge variant="outline">{category.type}</Badge>
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {category.count.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Quality</span>
                        <span className="text-sm font-medium">{category.quality}%</span>
                      </div>
                      <Progress value={category.quality} className="mt-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="processing" className="space-y-4">
              <div className="text-center py-6">
                <h3 className="text-lg font-semibold mb-2">Data Processing</h3>
                <p className="text-muted-foreground mb-6">
                  Process and optimize training data for better AI performance
                </p>
                
                {isProcessing ? (
                  <div className="space-y-4">
                    <div className="text-sm font-medium">{currentTask}</div>
                    <Progress value={processingProgress} className="w-full max-w-md mx-auto" />
                    <div className="text-sm text-muted-foreground">
                      {Math.round(processingProgress)}% Complete
                    </div>
                  </div>
                ) : (
                  <Button onClick={startDataProcessing} size="lg">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Process Training Data
                  </Button>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="export" className="space-y-4">
              <div className="text-center py-6">
                <h3 className="text-lg font-semibold mb-2">Data Management</h3>
                <p className="text-muted-foreground mb-6">
                  Import and export training data for backup or analysis
                </p>
                
                <div className="flex justify-center gap-4">
                  <Button onClick={importData} variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                  <Button onClick={exportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="font-medium">Data Insights</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Training data grows by ~500 samples daily</li>
                    <li>• User feedback improves model accuracy by 2.3%</li>
                    <li>• Quality score increased 5.8% this month</li>
                    <li>• Success rate improved from 87% to 94%</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITrainingDataManager;