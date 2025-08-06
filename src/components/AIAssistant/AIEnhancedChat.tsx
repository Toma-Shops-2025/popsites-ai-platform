import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Settings, BarChart3, Menu } from 'lucide-react';
import { AIService } from './AIService';
import AIContextMenu from './AIContextMenu';
import AIAnalytics from './AIAnalytics';
import AIPersonalization from './AIPersonalization';
import EcommerceGuide from './EcommerceGuide';
import AITemplateGuide from './AITemplateGuide';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  showEcommerceGuide?: boolean;
  showTemplateGuide?: boolean;
  context?: string;
}

interface AIEnhancedChatProps {
  onActionSuggestion?: (action: string, data?: any) => void;
  currentContext?: string;
}

export default function AIEnhancedChat({ onActionSuggestion, currentContext }: AIEnhancedChatProps) {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: 'Hello! I\'m your enhanced AI assistant with advanced capabilities. I can provide personalized help, analytics insights, and contextual guidance. How can I help you today?',
    isUser: false,
    timestamp: new Date(),
    showTemplateGuide: true
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [userPreferences, setUserPreferences] = useState({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      isUser: true,
      timestamp: new Date(),
      context: currentContext
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await AIService.processMessage(textToSend);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.response,
        isUser: false,
        timestamp: new Date(),
        showEcommerceGuide: aiResponse.showEcommerceGuide,
        showTemplateGuide: textToSend.toLowerCase().includes('template'),
        context: currentContext
      };

      setMessages(prev => [...prev, aiMessage]);

      if (aiResponse.action && onActionSuggestion) {
        setTimeout(() => {
          onActionSuggestion(aiResponse.action, aiResponse.actionData);
        }, 500);
      }
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble responding right now. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleQuickAction = (action: string, data?: any) => {
    const actionMessages = {
      'show_getting_started': 'Show me the getting started guide',
      'browse_templates': 'I want to browse templates',
      'ecommerce_setup': 'Help me set up an e-commerce store',
      'seo_help': 'How can I optimize my website for SEO?',
      'mobile_help': 'How do I make my website mobile-friendly?',
      'template_customize': 'How do I customize this template?',
      'add_elements': 'How do I add new elements to my page?'
    };

    const message = actionMessages[action as keyof typeof actionMessages] || `Help with ${action}`;
    sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-96 w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat" className="flex items-center gap-1">
            <Bot className="w-3 h-3" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="menu" className="flex items-center gap-1">
            <Menu className="w-3 h-3" />
            Quick
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <BarChart3 className="w-3 h-3" />
            Stats
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="w-3 h-3" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[280px] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-2 rounded-full flex-shrink-0 ${message.isUser ? 'bg-blue-500' : 'bg-gray-200'}`}>
                        {message.isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-600" />}
                      </div>
                      <div className={`p-3 rounded-lg break-words ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        {message.context && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {message.context}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {message.showEcommerceGuide && (
                    <div className="mt-4 flex justify-start">
                      <div className="max-w-full">
                        <EcommerceGuide onActionSuggestion={onActionSuggestion} />
                      </div>
                    </div>
                  )}
                  {message.showTemplateGuide && (
                    <div className="mt-4 flex justify-start">
                      <div className="max-w-full">
                        <AITemplateGuide onActionSuggestion={onActionSuggestion} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-full bg-gray-200">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about building your website..."
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={() => sendMessage()} 
                disabled={isLoading || !input.trim()}
                size="icon"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="menu" className="flex-1 mt-0 p-4">
          <ScrollArea className="h-full">
            <AIContextMenu 
              onQuickAction={handleQuickAction}
              currentContext={currentContext}
            />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="analytics" className="flex-1 mt-0 p-4">
          <ScrollArea className="h-full">
            <AIAnalytics onInsightSelect={handleQuickAction} />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 mt-0 p-4">
          <ScrollArea className="h-full">
            <AIPersonalization onPreferenceChange={setUserPreferences} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}