import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Palette, Layout, Download, ShoppingCart, FileText, Camera, Building, Utensils, Heart } from 'lucide-react';

interface AITemplateGuideProps {
  onActionSuggestion?: (action: string, data?: any) => void;
}

export default function AITemplateGuide({ onActionSuggestion }: AITemplateGuideProps) {
  const suggestions = [
    {
      icon: <Layout className="w-5 h-5" />,
      title: 'Choose Template',
      description: 'Browse 100+ professional templates',
      action: () => onActionSuggestion?.('navigate', { path: '/template-gallery' }),
      badge: 'Start Here'
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: 'E-commerce Store',
      description: 'Build online store with payments',
      action: () => onActionSuggestion?.('showEcommerceGuide', {}),
      badge: 'Popular'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Blog & Content',
      description: 'Create engaging blog websites',
      action: () => onActionSuggestion?.('navigate', { path: '/template-gallery' }),
      badge: 'Content'
    },
    {
      icon: <Camera className="w-5 h-5" />,
      title: 'Portfolio',
      description: 'Showcase your work beautifully',
      action: () => onActionSuggestion?.('navigate', { path: '/template-gallery' }),
      badge: 'Creative'
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: 'Business Site',
      description: 'Professional corporate websites',
      action: () => onActionSuggestion?.('navigate', { path: '/template-gallery' }),
      badge: 'Business'
    },
    {
      icon: <Utensils className="w-5 h-5" />,
      title: 'Restaurant',
      description: 'Menus, reservations & ordering',
      action: () => onActionSuggestion?.('navigate', { path: '/template-gallery' }),
      badge: 'Food'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'Nonprofit',
      description: 'Donations & volunteer signup',
      action: () => onActionSuggestion?.('navigate', { path: '/template-gallery' }),
      badge: 'Impact'
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: 'Customize Design',
      description: 'Edit colors, fonts, and layout',
      action: () => onActionSuggestion?.('navigate', { path: '/template-editor' }),
      badge: 'Design'
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: 'Export & Publish',
      description: 'Download or host your website',
      action: () => onActionSuggestion?.('navigate', { path: '/choose-plan' }),
      badge: 'Finish'
    }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          AI Website Builder Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {suggestion.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm">{suggestion.title}</h4>
                <p className="text-xs text-gray-600">{suggestion.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">{suggestion.badge}</Badge>
              <Button size="sm" onClick={suggestion.action}>
                Go
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}