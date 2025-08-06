import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Globe, 
  Smartphone, 
  Settings, 
  BarChart3, 
  Users, 
  Zap,
  Calendar,
  TrendingUp,
  Star,
  Download,
  Share2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  framework: string;
  deployment_url?: string;
}

interface Analytics {
  totalProjects: number;
  activeProjects: number;
  totalDeployments: number;
  successRate: number;
  monthlyGrowth: number;
}

const Dashboard: React.FC = () => {
  const { user, isSubscribed, subscriptionTier, trialDaysLeft } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalProjects: 0,
    activeProjects: 0,
    totalDeployments: 0,
    successRate: 0,
    monthlyGrowth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('generated_projects')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
      } else {
        setProjects(projectsData || []);
      }

      // Calculate analytics
      const totalProjects = projectsData?.length || 0;
      const activeProjects = projectsData?.filter(p => p.status === 'ready').length || 0;
      const totalDeployments = projectsData?.filter(p => p.status === 'deployed').length || 0;
      const successRate = totalProjects > 0 ? (activeProjects / totalProjects) * 100 : 0;

      setAnalytics({
        totalProjects,
        activeProjects,
        totalDeployments,
        successRate,
        monthlyGrowth: 15.5, // Mock data
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-500';
      case 'generating':
        return 'bg-yellow-500';
      case 'deployed':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'website':
        return <Globe className="w-4 h-4" />;
      case 'mobile-app':
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.user_metadata?.full_name || 'Creator'}!
              </h1>
              <p className="text-gray-300">
                Ready to build something amazing today?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {!isSubscribed && (
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  {trialDaysLeft} days left in trial
                </Badge>
              )}
              <Button
                onClick={() => navigate('/template-editor')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Projects</p>
                  <p className="text-2xl font-bold text-white">{analytics.totalProjects}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Active Projects</p>
                  <p className="text-2xl font-bold text-white">{analytics.activeProjects}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">{analytics.successRate.toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Monthly Growth</p>
                  <p className="text-2xl font-bold text-white">+{analytics.monthlyGrowth}%</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-md border-white/20">
            <TabsTrigger value="projects" className="text-white">Projects</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="text-white">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Projects */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Projects</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your latest website and app projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <div className="text-center py-8">
                      <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-4">No projects yet</p>
                      <Button
                        onClick={() => navigate('/template-editor')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Create Your First Project
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.slice(0, 5).map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                          onClick={() => navigate(`/template-editor?project=${project.id}`)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                              {getProjectTypeIcon(project.type)}
                            </div>
                            <div>
                              <p className="font-medium text-white">{project.name}</p>
                              <p className="text-sm text-gray-400">{project.framework}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                            <span className="text-sm text-gray-300 capitalize">{project.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-300">
                    Get started with common tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-white/5 border-white/20 text-white hover:bg-white/10"
                      onClick={() => navigate('/template-editor')}
                    >
                      <Globe className="w-6 h-6 mb-2" />
                      <span className="text-sm">New Website</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-white/5 border-white/20 text-white hover:bg-white/10"
                      onClick={() => navigate('/ai-assistant')}
                    >
                      <Zap className="w-6 h-6 mb-2" />
                      <span className="text-sm">AI Assistant</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-white/5 border-white/20 text-white hover:bg-white/10"
                      onClick={() => navigate('/template-gallery')}
                    >
                      <Star className="w-6 h-6 mb-2" />
                      <span className="text-sm">Templates</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-white/5 border-white/20 text-white hover:bg-white/10"
                      onClick={() => navigate('/features')}
                    >
                      <Settings className="w-6 h-6 mb-2" />
                      <span className="text-sm">Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Project Analytics</CardTitle>
                <CardDescription className="text-gray-300">
                  Track your project performance and growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Project Success Rate</span>
                      <span className="text-gray-300">{analytics.successRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={analytics.successRate} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Monthly Growth</span>
                      <span className="text-green-400">+{analytics.monthlyGrowth}%</span>
                    </div>
                    <Progress value={analytics.monthlyGrowth} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your account and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Subscription Plan</p>
                      <p className="text-gray-300 text-sm">
                        {isSubscribed ? `${subscriptionTier} Plan` : 'Free Trial'}
                      </p>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Profile Settings</p>
                      <p className="text-gray-300 text-sm">Update your personal information</p>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white">
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">API Keys</p>
                      <p className="text-gray-300 text-sm">Manage your integration keys</p>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white">
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard; 