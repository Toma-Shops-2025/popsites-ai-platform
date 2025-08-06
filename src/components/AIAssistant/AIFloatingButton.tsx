import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles, MessageCircle, X, Zap, Brain } from 'lucide-react';
import { useAI } from './AIProvider';

const AIFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleAIAction } = useAI();

  const quickActions = [
    {
      id: 'buildWebsite',
      title: 'Build My Website',
      description: 'Tell AI what you want and get a complete website',
      icon: Sparkles,
      action: 'buildDoneForYou',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'aiAssistant',
      title: 'AI Assistant',
      description: 'Chat with AI to build anything you need',
      icon: MessageCircle,
      action: 'showEnhancedTrainingSystem',
      gradient: 'from-green-500 to-blue-500'
    },
    {
      id: 'training',
      title: 'AI Training',
      description: 'See how AI learns to build better sites',
      icon: Brain,
      action: 'showTrainingSystem',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const handleQuickAction = (actionId: string, action: string) => {
    handleAIAction(action, { source: 'floating_button', actionId });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <>
              <Bot className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </>
          )}
        </Button>
      </div>

      {/* Quick Actions Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40">
          <Card className="w-80 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                PopSites AI
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online & Learning
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                I can build any website you need! Just tell me what you want to create.
              </p>
              
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="w-full h-auto p-4 justify-start hover:shadow-md transition-all duration-200 group"
                    onClick={() => handleQuickAction(action.id, action.action)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className={`w-10 h-10 bg-gradient-to-r ${action.gradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{action.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                );
              })}
              
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>AI Status</span>
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-green-500" />
                    <span className="text-green-600 font-medium">Ready to Build</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AIFloatingButton;