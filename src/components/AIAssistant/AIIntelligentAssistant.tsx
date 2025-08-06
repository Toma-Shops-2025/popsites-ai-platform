import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Lightbulb, Code, Palette, Globe } from 'lucide-react';
import { AIService } from './AIService';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  websitePreview?: any;
}

interface AIIntelligentAssistantProps {
  onWebsiteGenerated?: (website: any) => void;
}

const AIIntelligentAssistant: React.FC<AIIntelligentAssistantProps> = ({ onWebsiteGenerated }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your PopSites AI assistant. I can build any website you need - just tell me what you want to create! I understand everything from simple landing pages to complex e-commerce stores.",
      timestamp: new Date(),
      suggestions: [
        "Build me an e-commerce store",
        "Create a portfolio website",
        "I need a restaurant website",
        "Build a blog for my business"
      ]
    };
    setMessages([welcomeMessage]);
  }, []);

  const quickSuggestions = [
    { icon: Globe, text: "Business website", category: "business" },
    { icon: Code, text: "Portfolio site", category: "portfolio" },
    { icon: Palette, text: "Creative agency", category: "creative" },
    { icon: Lightbulb, text: "Startup landing", category: "startup" }
  ];

  const processUserMessage = async (userInput: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Check if user wants to build a website
      const isBuildRequest = /\b(build|create|make|generate|design)\b.*\b(website|site|page|store|blog|portfolio)\b/i.test(userInput);
      
      if (isBuildRequest) {
        // Generate website based on user request
        const website = await AIService.generateUniversalWebsite(userInput, 'custom');
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `Perfect! I've analyzed your request and I'm ready to build your website. Based on what you described, I'll create a ${website.type || 'custom'} website with all the features you mentioned.`,
          timestamp: new Date(),
          websitePreview: website,
          suggestions: [
            "Build this website now",
            "Modify the design",
            "Add more features",
            "Change the layout"
          ]
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        if (onWebsiteGenerated) {
          onWebsiteGenerated(website);
        }
      } else {
        // General conversation
        const response = await AIService.generateResponse(userInput);
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: response.content,
          timestamp: new Date(),
          suggestions: response.suggestions
        };
        
        setMessages(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I encountered an error. Please try again or rephrase your request.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      processUserMessage(input.trim());
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    processUserMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            PopSites AI Assistant
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Tell me what you want to build, and I'll create it for you!
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                    <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-100'}`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    {message.websitePreview && (
                      <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <h4 className="font-medium mb-2">Website Preview Ready!</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Type: {message.websitePreview.type || 'Custom'} • 
                          Pages: {message.websitePreview.pages?.length || 5} • 
                          Features: {message.websitePreview.features?.length || 8}
                        </p>
                        <Button size="sm" onClick={() => onWebsiteGenerated?.(message.websitePreview)}>
                          View & Edit Website
                        </Button>
                      </div>
                    )}
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-7"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Quick start:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon;
                    return (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSuggestionClick(`Build me a ${suggestion.text}`)}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {suggestion.text}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe what you want to build..."
                disabled={isTyping}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIIntelligentAssistant;