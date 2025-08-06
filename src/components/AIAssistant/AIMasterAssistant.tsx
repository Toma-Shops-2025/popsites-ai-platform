import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Zap, Rocket, Settings, Users, BarChart, Mic, Globe } from 'lucide-react';
import AIAdvancedFeatures from './AIAdvancedFeatures';
import AIIndustryTemplates from './AIIndustryTemplates';
import AISmartWorkflows from './AISmartWorkflows';
import AIPersonalizedDashboard from './AIPersonalizedDashboard';
import AIVoiceCommands from './AIVoiceCommands';
import AICollaborativeBuilder from './AICollaborativeBuilder';

interface AIMasterAssistantProps {
  onFeatureSelect?: (feature: string) => void;
}

const AIMasterAssistant: React.FC<AIMasterAssistantProps> = ({ onFeatureSelect }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [aiStatus, setAiStatus] = useState('ready');

  const handleFeatureSelect = (feature: string) => {
    console.log('Feature selected:', feature);
    onFeatureSelect?.(feature);
  };

  const handleTemplateSelect = (template: any) => {
    console.log('Template selected:', template);
    onFeatureSelect?.(`template-${template.name}`);
  };

  const handleWorkflowStart = (workflowId: string) => {
    console.log('Workflow started:', workflowId);
    setAiStatus('processing');
    setTimeout(() => setAiStatus('ready'), 3000);
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    onFeatureSelect?.(command);
  };

  const handleInviteUser = (email: string, role: string) => {
    console.log('User invited:', email, role);
  };

  const handleStartMeeting = () => {
    console.log('Meeting started');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Status Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Brain className="h-8 w-8 text-blue-500" />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(aiStatus)}`} />
              </div>
              <div>
                <h1 className="text-xl font-bold">PopSites AI Master Assistant</h1>
                <p className="text-sm text-muted-foreground">Your complete AI-powered website building companion</p>
              </div>
            </div>
            <Badge className={getStatusColor(aiStatus)}>
              {aiStatus === 'ready' && 'Ready'}
              {aiStatus === 'processing' && 'Processing...'}
              {aiStatus === 'error' && 'Error'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            Features
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-1">
            <Mic className="h-4 w-4" />
            Voice
          </TabsTrigger>
          <TabsTrigger value="collaborate" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <AIPersonalizedDashboard />
        </TabsContent>

        <TabsContent value="features">
          <AIAdvancedFeatures onFeatureSelect={handleFeatureSelect} />
        </TabsContent>

        <TabsContent value="templates">
          <AIIndustryTemplates onTemplateSelect={handleTemplateSelect} />
        </TabsContent>

        <TabsContent value="workflows">
          <AISmartWorkflows onWorkflowStart={handleWorkflowStart} />
        </TabsContent>

        <TabsContent value="voice">
          <AIVoiceCommands onVoiceCommand={handleVoiceCommand} />
        </TabsContent>

        <TabsContent value="collaborate">
          <AICollaborativeBuilder 
            onInviteUser={handleInviteUser}
            onStartMeeting={handleStartMeeting}
          />
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => handleFeatureSelect('quick-build')}
            >
              <Zap className="h-5 w-5" />
              <span className="text-xs">Quick Build</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveTab('templates')}
            >
              <Globe className="h-5 w-5" />
              <span className="text-xs">Browse Templates</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveTab('voice')}
            >
              <Mic className="h-5 w-5" />
              <span className="text-xs">Voice Control</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveTab('collaborate')}
            >
              <Users className="h-5 w-5" />
              <span className="text-xs">Invite Team</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIMasterAssistant;