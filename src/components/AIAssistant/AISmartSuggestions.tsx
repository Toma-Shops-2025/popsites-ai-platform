import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Zap, Target, TrendingUp } from 'lucide-react';

interface AISuggestion {
  id: string;
  title: string;
  description: string;
  category: 'optimization' | 'content' | 'design' | 'marketing';
  priority: 'high' | 'medium' | 'low';
  action: string;
}

interface AISmartSuggestionsProps {
  currentPage?: string;
  userBehavior?: any;
  onSuggestionClick?: (suggestion: AISuggestion) => void;
}

export default function AISmartSuggestions({ 
  currentPage = 'home', 
  userBehavior, 
  onSuggestionClick 
}: AISmartSuggestionsProps) {
  const generateSuggestions = (): AISuggestion[] => {
    const baseSuggestions: AISuggestion[] = [
      {
        id: '1',
        title: 'Optimize for Mobile',
        description: 'Ensure your site looks perfect on all devices',
        category: 'optimization',
        priority: 'high',
        action: 'Check mobile responsiveness'
      },
      {
        id: '2',
        title: 'Add SEO Meta Tags',
        description: 'Improve search engine visibility',
        category: 'optimization',
        priority: 'high',
        action: 'Set up SEO optimization'
      },
      {
        id: '3',
        title: 'Create Compelling Content',
        description: 'Add engaging text and images',
        category: 'content',
        priority: 'medium',
        action: 'Start content creation'
      },
      {
        id: '4',
        title: 'Choose Brand Colors',
        description: 'Establish consistent visual identity',
        category: 'design',
        priority: 'medium',
        action: 'Customize color scheme'
      },
      {
        id: '5',
        title: 'Set Up Analytics',
        description: 'Track visitor behavior and performance',
        category: 'marketing',
        priority: 'medium',
        action: 'Enable analytics tracking'
      }
    ];

    // Add page-specific suggestions
    if (currentPage === 'template-editor') {
      baseSuggestions.unshift({
        id: 'editor-1',
        title: 'Save Your Progress',
        description: 'Don\'t lose your work - save regularly',
        category: 'optimization',
        priority: 'high',
        action: 'Save template'
      });
    }

    if (currentPage === 'template-gallery') {
      baseSuggestions.unshift({
        id: 'gallery-1',
        title: 'Filter by Industry',
        description: 'Find templates perfect for your business',
        category: 'design',
        priority: 'medium',
        action: 'Apply industry filter'
      });
    }

    return baseSuggestions.slice(0, 4);
  };

  const suggestions = generateSuggestions();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'optimization': return <Zap className="w-4 h-4" />;
      case 'content': return <Target className="w-4 h-4" />;
      case 'design': return <Lightbulb className="w-4 h-4" />;
      case 'marketing': return <TrendingUp className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onSuggestionClick?.(suggestion)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(suggestion.category)}
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getPriorityColor(suggestion.priority)}`}
                >
                  {suggestion.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onSuggestionClick?.(suggestion);
                }}
              >
                {suggestion.action}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}