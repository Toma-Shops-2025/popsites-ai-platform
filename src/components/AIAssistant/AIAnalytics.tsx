import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Users, Clock, Target, Brain, Activity } from 'lucide-react';

interface AIMetrics {
  totalInteractions: number;
  successfulBuilds: number;
  averageSessionTime: number;
  userSatisfaction: number;
  popularFeatures: string[];
  improvementAreas: string[];
  learningProgress: number;
  adaptationScore: number;
}

interface AIAnalyticsProps {
  onInsightsGenerated?: (insights: any) => void;
}

const AIAnalytics: React.FC<AIAnalyticsProps> = ({ onInsightsGenerated }) => {
  const [metrics] = useState<AIMetrics>({
    totalInteractions: 1247,
    successfulBuilds: 1089,
    averageSessionTime: 8.5,
    userSatisfaction: 4.6,
    popularFeatures: ['Template Selection', 'Content Generation', 'Design Customization', 'SEO Optimization', 'Responsive Design'],
    improvementAreas: ['Response time', 'Content quality', 'User guidance'],
    learningProgress: 87,
    adaptationScore: 92
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [insights, setInsights] = useState<any>(null);
  const [timeRange, setTimeRange] = useState('7d');

  const generateInsights = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    try {
      for (let i = 0; i < 6; i++) {
        setAnalysisProgress((i / 6) * 100);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      const generatedInsights = {
        performanceScore: metrics.adaptationScore,
        keyStrengths: [
          'High user satisfaction rate',
          'Effective template recommendations',
          'Strong content generation capabilities'
        ],
        improvementOpportunities: [
          'Reduce average response time by 15%',
          'Enhance mobile optimization suggestions',
          'Improve SEO recommendation accuracy'
        ],
        recommendations: [
          'Implement advanced caching for faster responses',
          'Add more industry-specific templates',
          'Enhance AI training with recent user feedback'
        ],
        predictedImprovements: {
          satisfactionIncrease: '12%',
          efficiencyGain: '18%',
          userRetention: '25%'
        }
      };
      
      setInsights(generatedInsights);
      onInsightsGenerated?.(generatedInsights);
      
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      setTimeout(() => setAnalysisProgress(0), 2000);
    }
  };

  const getSuccessRate = () => {
    return metrics.totalInteractions > 0 
      ? Math.round((metrics.successfulBuilds / metrics.totalInteractions) * 100)
      : 0;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            AI Performance Analytics
          </CardTitle>
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button onClick={generateInsights} disabled={isAnalyzing}>
              {isAnalyzing ? 'Analyzing...' : 'Generate Insights'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{metrics.totalInteractions}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Users className="h-3 w-3" />
                Total Interactions
              </div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{getSuccessRate()}%</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Target className="h-3 w-3" />
                Success Rate
              </div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{metrics.averageSessionTime.toFixed(1)}m</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                Avg Session Time
              </div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{metrics.userSatisfaction.toFixed(1)}/5</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Activity className="h-3 w-3" />
                User Satisfaction
              </div>
            </div>
          </div>
          
          {isAnalyzing && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 animate-pulse" />
                <span className="text-sm">Analyzing AI performance...</span>
              </div>
              <Progress value={analysisProgress} className="w-full" />
            </div>
          )}
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>AI Learning</span>
                        <span>{metrics.learningProgress}%</span>
                      </div>
                      <Progress value={metrics.learningProgress} className="h-2" />
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm">
                        <span>Adaptation Score</span>
                        <span>{metrics.adaptationScore}%</span>
                      </div>
                      <Progress value={metrics.adaptationScore} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {metrics.popularFeatures.slice(0, 5).map((feature, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{feature}</span>
                          <Badge variant="secondary">{Math.floor(Math.random() * 40) + 60}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Response Quality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">94%</div>
                      <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">1.2s</div>
                      <div className="text-sm text-muted-foreground">Average Response</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">78%</div>
                      <div className="text-sm text-muted-foreground">Return Rate</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Improvement Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {metrics.improvementAreas.map((area, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{area}</span>
                        <Badge variant="outline">Priority {index + 1}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              {insights ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Strengths</h4>
                          <ul className="space-y-1">
                            {insights.keyStrengths.map((strength: string, index: number) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Improvement Opportunities</h4>
                          <ul className="space-y-1">
                            {insights.improvementOpportunities.map((opportunity: string, index: number) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                {opportunity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Recommendations</h4>
                          <ul className="space-y-1">
                            {insights.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Click 'Generate Insights' to analyze AI performance</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAnalytics;