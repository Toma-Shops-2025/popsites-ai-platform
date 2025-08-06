import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Upload, Brain, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface TrainingDataPoint {
  id: string;
  input: string;
  output: string;
  category: string;
  quality: number;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
}

interface AITrainingDataProps {
  onDataUpdated?: (data: TrainingDataPoint[]) => void;
}

const AITrainingData: React.FC<AITrainingDataProps> = ({ onDataUpdated }) => {
  const [trainingData, setTrainingData] = useState<TrainingDataPoint[]>([]);
  const [newInput, setNewInput] = useState('');
  const [newOutput, setNewOutput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    'general', 'website_creation', 'design_preferences', 
    'content_generation', 'seo_optimization', 'e_commerce',
    'troubleshooting', 'user_feedback'
  ];

  useEffect(() => {
    loadTrainingData();
  }, []);

  const loadTrainingData = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_training_data')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      
      const formattedData = data?.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })) || [];
      
      setTrainingData(formattedData);
      onDataUpdated?.(formattedData);
    } catch (error) {
      console.error('Error loading training data:', error);
      // Fallback data for development
      const fallbackData: TrainingDataPoint[] = [
        {
          id: '1',
          input: 'Create a modern business website',
          output: 'I\'ll help you create a professional business website with modern design, responsive layout, and essential pages.',
          category: 'website_creation',
          quality: 95,
          timestamp: new Date(),
          status: 'approved'
        },
        {
          id: '2',
          input: 'How do I optimize for SEO?',
          output: 'For SEO optimization, focus on: meta tags, keyword research, content quality, page speed, and mobile responsiveness.',
          category: 'seo_optimization',
          quality: 92,
          timestamp: new Date(),
          status: 'approved'
        }
      ];
      setTrainingData(fallbackData);
      onDataUpdated?.(fallbackData);
    }
  };

  const addTrainingData = async () => {
    if (!newInput.trim() || !newOutput.trim()) return;
    
    setIsLoading(true);
    setUploadProgress(0);
    
    try {
      const newDataPoint: TrainingDataPoint = {
        id: Date.now().toString(),
        input: newInput.trim(),
        output: newOutput.trim(),
        category: selectedCategory,
        quality: calculateQuality(newInput, newOutput),
        timestamp: new Date(),
        status: 'pending'
      };
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);
      
      const { error } = await supabase
        .from('ai_training_data')
        .insert([newDataPoint]);
      
      if (error) throw error;
      
      setUploadProgress(100);
      setTrainingData(prev => [newDataPoint, ...prev]);
      onDataUpdated?.([newDataPoint, ...trainingData]);
      
      // Reset form
      setNewInput('');
      setNewOutput('');
      setSelectedCategory('general');
      
    } catch (error) {
      console.error('Error adding training data:', error);
      // Add locally for development
      const newDataPoint: TrainingDataPoint = {
        id: Date.now().toString(),
        input: newInput.trim(),
        output: newOutput.trim(),
        category: selectedCategory,
        quality: calculateQuality(newInput, newOutput),
        timestamp: new Date(),
        status: 'pending'
      };
      
      setTrainingData(prev => [newDataPoint, ...prev]);
      setNewInput('');
      setNewOutput('');
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const calculateQuality = (input: string, output: string): number => {
    let score = 50;
    
    // Length checks
    if (input.length > 10) score += 10;
    if (output.length > 20) score += 10;
    
    // Completeness checks
    if (output.includes('help') || output.includes('create')) score += 10;
    if (input.includes('?')) score += 5;
    
    // Category relevance
    if (selectedCategory !== 'general') score += 15;
    
    return Math.min(score, 100);
  };

  const updateDataStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await supabase
        .from('ai_training_data')
        .update({ status })
        .eq('id', id);
      
      setTrainingData(prev => 
        prev.map(item => 
          item.id === id ? { ...item, status } : item
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      // Update locally for development
      setTrainingData(prev => 
        prev.map(item => 
          item.id === id ? { ...item, status } : item
        )
      );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Database className="w-4 h-4 text-yellow-500" />;
    }
  };

  const approvedCount = trainingData.filter(d => d.status === 'approved').length;
  const averageQuality = trainingData.length > 0 
    ? Math.round(trainingData.reduce((sum, d) => sum + d.quality, 0) / trainingData.length)
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            AI Training Data Management
          </CardTitle>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{trainingData.length}</div>
              <div className="text-xs text-muted-foreground">Total Entries</div>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-xs text-muted-foreground">Approved</div>
            </div>
            <div className="p-2 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">{averageQuality}%</div>
              <div className="text-xs text-muted-foreground">Avg Quality</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">User Input</label>
                <Textarea
                  value={newInput}
                  onChange={(e) => setNewInput(e.target.value)}
                  placeholder="Enter user question or request..."
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">AI Response</label>
                <Textarea
                  value={newOutput}
                  onChange={(e) => setNewOutput(e.target.value)}
                  placeholder="Enter ideal AI response..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
              
              <Button
                onClick={addTrainingData}
                disabled={isLoading || !newInput.trim() || !newOutput.trim()}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {isLoading ? 'Adding...' : 'Add Training Data'}
              </Button>
            </div>
            
            {uploadProgress > 0 && (
              <Progress value={uploadProgress} className="w-full" />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Training Data Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {trainingData.map((data) => (
              <div key={data.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.status)}
                    <Badge variant="outline" className="text-xs">
                      {data.category.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Quality: {data.quality}%
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {data.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateDataStatus(data.id, 'approved')}
                          className="h-6 px-2 text-xs"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateDataStatus(data.id, 'rejected')}
                          className="h-6 px-2 text-xs"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium mb-1">Input:</div>
                  <div className="text-muted-foreground mb-2">{data.input}</div>
                  <div className="font-medium mb-1">Output:</div>
                  <div className="text-muted-foreground">{data.output}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITrainingData;