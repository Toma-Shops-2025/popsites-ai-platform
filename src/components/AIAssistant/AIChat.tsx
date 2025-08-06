import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Lightbulb } from 'lucide-react';
import { AIService } from './AIService';
import EcommerceGuide from './EcommerceGuide';
import AITemplateGuide from './AITemplateGuide';
import AIKnowledgeBase from './AIKnowledgeBase';
import AITrainingData from './AITrainingData';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  showEcommerceGuide?: boolean;
  showTemplateGuide?: boolean;
  showKnowledgeBase?: boolean;
  showTrainingData?: boolean;
}

interface AIChatProps {
  onActionSuggestion?: (action: string, data?: any) => void;
}

export function AIChat({ onActionSuggestion }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: 'Hi! I\'m your comprehensive AI assistant trained on everything about website building. I can help you with templates, e-commerce, SEO, hosting, and much more. What would you like to create today?',
    isUser: false,
    timestamp: new Date(),
    showTemplateGuide: true
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await AIService.processMessage(currentInput);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.response,
        isUser: false,
        timestamp: new Date(),
        showEcommerceGuide: aiResponse.showEcommerceGuide,
        showTemplateGuide: currentInput.toLowerCase().includes('template') || currentInput.toLowerCase().includes('guide'),
        showKnowledgeBase: currentInput.toLowerCase().includes('knowledge') || currentInput.toLowerCase().includes('learn'),
        showTrainingData: currentInput.toLowerCase().includes('training') || currentInput.toLowerCase().includes('ai')
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    setTimeout(() => sendMessage(), 100);
  };

  const quickActions = [
    'Show me templates',
    'Help with e-commerce',
    'AI training info',
    'Knowledge base'
  ];

  return (
    <div className="flex flex-col h-96 w-full">
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
              {message.showKnowledgeBase && (
                <div className="mt-4 flex justify-start">
                  <div className="max-w-full">
                    <AIKnowledgeBase onTopicSelect={(topic) => handleQuickAction(`Tell me about ${topic}`)} />
                  </div>
                </div>
              )}
              {message.showTrainingData && (
                <div className="mt-4 flex justify-start">
                  <div className="max-w-full">
                    <AITrainingData />
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
        <div className="flex flex-wrap gap-2 mb-3">
          {quickActions.map((action, index) => (
            <Button 
              key={index}
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickAction(action)}
              className="text-xs"
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              {action}
            </Button>
          ))}
        </div>
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
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AIChat;