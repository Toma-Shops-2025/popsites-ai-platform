import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, UserPlus, MessageSquare, Eye, Edit, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'online' | 'offline';
  lastSeen?: Date;
}

interface TemplateCollaborationProps {
  collaborators: Collaborator[];
  onInvite: (email: string, role: string) => void;
  onRemove: (id: string) => void;
  onRoleChange: (id: string, role: string) => void;
}

const TemplateCollaboration: React.FC<TemplateCollaborationProps> = ({
  collaborators,
  onInvite,
  onRemove,
  onRoleChange
}) => {
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4" />;
      case 'editor': return <Edit className="w-4 h-4" />;
      case 'viewer': return <Eye className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-yellow-100 text-yellow-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInvite = () => {
    if (!inviteEmail) {
      toast({ title: 'Email Required', description: 'Please enter an email address', variant: 'destructive' });
      return;
    }
    onInvite(inviteEmail, inviteRole);
    setInviteEmail('');
    toast({ title: 'Invitation Sent', description: `Invited ${inviteEmail} as ${inviteRole}` });
  };

  const handleRemove = (id: string, name: string) => {
    onRemove(id);
    toast({ title: 'Collaborator Removed', description: `${name} has been removed from the project` });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Users className="w-4 h-4 mr-2" />
          Collaborate ({collaborators.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Template Collaboration</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Invite Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Invite Collaborators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1"
                />
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                </select>
                <Button onClick={handleInvite}>
                  Invite
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Collaborators List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Collaborators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {collaborator.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{collaborator.name}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            collaborator.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        </div>
                        <p className="text-sm text-gray-600">{collaborator.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRoleColor(collaborator.role)}>
                        {getRoleIcon(collaborator.role)}
                        <span className="ml-1 capitalize">{collaborator.role}</span>
                      </Badge>
                      {collaborator.role !== 'owner' && (
                        <Button
                          onClick={() => handleRemove(collaborator.id, collaborator.name)}
                          variant="outline"
                          size="sm"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Comments & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">John Doe</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm">The header looks great! Maybe we could adjust the color scheme?</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">Jane Smith</span>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-sm">Added the contact form. Ready for review!</p>
                </div>
              </div>
              <div className="mt-4">
                <Input placeholder="Add a comment..." className="mb-2" />
                <Button size="sm">Post Comment</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateCollaboration;