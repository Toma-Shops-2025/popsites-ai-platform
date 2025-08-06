import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MessageCircle, Eye, Edit, Share, Zap } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'editing' | 'viewing' | 'away';
  cursor_position: { x: number; y: number };
  last_action: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: Date;
  type: 'edit' | 'comment' | 'share' | 'deploy';
}

export const AIRealtimeCollaborationHub: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Designer',
      status: 'editing',
      cursor_position: { x: 45, y: 23 },
      last_action: 'Modified hero section layout'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Developer',
      status: 'online',
      cursor_position: { x: 67, y: 78 },
      last_action: 'Added payment integration'
    },
    {
      id: '3',
      name: 'AI Assistant',
      role: 'AI Helper',
      status: 'editing',
      cursor_position: { x: 12, y: 56 },
      last_action: 'Optimizing SEO metadata'
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      user: 'Sarah Chen',
      action: 'Updated color scheme to match brand guidelines',
      timestamp: new Date(Date.now() - 2 * 60000),
      type: 'edit'
    },
    {
      id: '2',
      user: 'AI Assistant',
      action: 'Automatically optimized images for faster loading',
      timestamp: new Date(Date.now() - 5 * 60000),
      type: 'edit'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      action: 'Added comment on checkout flow',
      timestamp: new Date(Date.now() - 8 * 60000),
      type: 'comment'
    }
  ]);

  const [activeUsers, setActiveUsers] = useState(12);
  const [totalEdits, setTotalEdits] = useState(347);
  const [commentsCount, setCommentsCount] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setCollaborators(prev => prev.map(collab => ({
        ...collab,
        cursor_position: {
          x: Math.max(0, Math.min(100, collab.cursor_position.x + (Math.random() - 0.5) * 10)),
          y: Math.max(0, Math.min(100, collab.cursor_position.y + (Math.random() - 0.5) * 10))
        },
        status: Math.random() > 0.8 ? 
          (['online', 'editing', 'viewing'] as const)[Math.floor(Math.random() * 3)] : 
          collab.status
      })));
      
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3 - 1));
      setTotalEdits(prev => prev + Math.floor(Math.random() * 2));
      
      // Add new activity occasionally
      if (Math.random() > 0.7) {
        const newActivity: Activity = {
          id: Date.now().toString(),
          user: collaborators[Math.floor(Math.random() * collaborators.length)].name,
          action: 'Made real-time updates',
          timestamp: new Date(),
          type: 'edit'
        };
        setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [collaborators]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'editing': return 'bg-green-500';
      case 'online': return 'bg-blue-500';
      case 'viewing': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'edit': return <Edit className="h-4 w-4 text-blue-600" />;
      case 'comment': return <MessageCircle className="h-4 w-4 text-green-600" />;
      case 'share': return <Share className="h-4 w-4 text-purple-600" />;
      default: return <Zap className="h-4 w-4 text-orange-600" />;
    }
  };

  return (
    <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Users className="h-8 w-8 text-green-600" />
          Real-time Collaboration Hub
          <Badge className="bg-green-600 text-white animate-pulse">
            <Eye className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-white/70 border">
            <div className="text-3xl font-bold text-green-600">{activeUsers}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/70 border">
            <div className="text-3xl font-bold text-blue-600">{totalEdits}</div>
            <div className="text-sm text-muted-foreground">Total Edits</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/70 border">
            <div className="text-3xl font-bold text-purple-600">{commentsCount}</div>
            <div className="text-sm text-muted-foreground">Comments</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/70 border">
            <div className="text-3xl font-bold text-orange-600">100%</div>
            <div className="text-sm text-muted-foreground">Sync Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-blue-600" />
                Active Collaborators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {collaborators.map((collab) => (
                <div key={collab.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {collab.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(collab.status)}`} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{collab.name}</div>
                      <div className="text-xs text-muted-foreground">{collab.role}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {collab.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5 text-green-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.user}</div>
                    <div className="text-xs text-muted-foreground">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">
                      {activity.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            <Users className="h-4 w-4 mr-2" />
            Invite Collaborators
          </Button>
          <Button variant="outline" className="flex-1">
            <Share className="h-4 w-4 mr-2" />
            Share Project
          </Button>
        </div>

        <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-100 to-blue-100 border">
          <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <div className="text-lg font-semibold text-green-800">Collaboration Active</div>
          <div className="text-sm text-muted-foreground">
            Real-time synchronization across all team members and AI assistants
          </div>
        </div>
      </CardContent>
    </Card>
  );
};