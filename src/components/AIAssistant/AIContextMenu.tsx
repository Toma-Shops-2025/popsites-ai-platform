import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  BookOpen, 
  Zap, 
  Target, 
  Lightbulb, 
  Code, 
  Palette, 
  ShoppingCart,
  Search,
  Smartphone,
  BarChart3,
  Globe
} from 'lucide-react';

interface AIContextMenuProps {
  onQuickAction?: (action: string, data?: any) => void;
  currentContext?: string;
}

export default function AIContextMenu({ onQuickAction, currentContext }: AIContextMenuProps) {
  const [activeCategory, setActiveCategory] = useState('general');

  const categories = {
    general: {
      icon: MessageSquare,
      title: 'General Help',
      actions: [
        { label: 'Getting Started Guide', action: 'show_getting_started', icon: BookOpen },
        { label: 'Platform Overview', action: 'show_overview', icon: Target },
        { label: 'Quick Tips', action: 'show_tips', icon: Lightbulb },
        { label: 'Feature Tour', action: 'start_tour', icon: Zap }
      ]
    },
    templates: {
      icon: Palette,
      title: 'Templates & Design',
      actions: [
        { label: 'Browse Templates', action: 'browse_templates', icon: Palette },
        { label: 'Template Customization', action: 'customize_help', icon: Code },
        { label: 'Design Best Practices', action: 'design_tips', icon: Target },
        { label: 'Color & Typography', action: 'styling_help', icon: Palette }
      ]
    },
    ecommerce: {
      icon: ShoppingCart,
      title: 'E-commerce',
      actions: [
        { label: 'Store Setup Guide', action: 'ecommerce_setup', icon: ShoppingCart },
        { label: 'Product Management', action: 'product_help', icon: Target },
        { label: 'Payment Integration', action: 'payment_help', icon: Zap },
        { label: 'Inventory Tracking', action: 'inventory_help', icon: BarChart3 }
      ]
    },
    technical: {
      icon: Code,
      title: 'Technical',
      actions: [
        { label: 'SEO Optimization', action: 'seo_help', icon: Search },
        { label: 'Mobile Responsiveness', action: 'mobile_help', icon: Smartphone },
        { label: 'Performance Tips', action: 'performance_help', icon: Zap },
        { label: 'Domain & Hosting', action: 'hosting_help', icon: Globe }
      ]
    }
  };

  const contextSuggestions = {
    'template-editor': [
      { label: 'How to customize this template', action: 'template_customize' },
      { label: 'Add new elements', action: 'add_elements' },
      { label: 'Change colors and fonts', action: 'styling_help' }
    ],
    'template-gallery': [
      { label: 'Find templates for my industry', action: 'industry_templates' },
      { label: 'Filter by features', action: 'filter_help' },
      { label: 'Template comparison', action: 'compare_templates' }
    ],
    'ecommerce': [
      { label: 'Set up payment processing', action: 'payment_setup' },
      { label: 'Add product catalog', action: 'product_catalog' },
      { label: 'Configure shipping', action: 'shipping_setup' }
    ]
  };

  const handleQuickAction = (action: string, data?: any) => {
    onQuickAction?.(action, data);
  };

  const getCurrentContextSuggestions = () => {
    if (currentContext && contextSuggestions[currentContext as keyof typeof contextSuggestions]) {
      return contextSuggestions[currentContext as keyof typeof contextSuggestions];
    }
    return [];
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Context-specific suggestions */}
      {getCurrentContextSuggestions().length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" />
              Context Help
            </CardTitle>
            <CardDescription className="text-xs">
              Suggestions based on your current page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {getCurrentContextSuggestions().map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left h-auto p-2"
                onClick={() => handleQuickAction(suggestion.action)}
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-3 w-3" />
                  <span className="text-xs">{suggestion.label}</span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Category tabs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Quick Actions</CardTitle>
          <CardDescription className="text-xs">
            Get instant help with common tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Category buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.entries(categories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={key}
                  variant={activeCategory === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(key)}
                  className="h-auto p-2"
                >
                  <div className="flex flex-col items-center gap-1">
                    <IconComponent className="h-3 w-3" />
                    <span className="text-xs">{category.title}</span>
                  </div>
                </Button>
              );
            })}
          </div>

          <Separator className="my-3" />

          {/* Category actions */}
          <div className="space-y-2">
            {categories[activeCategory as keyof typeof categories].actions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-2 hover:bg-gray-50"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-3 w-3" />
                    <span className="text-xs">{action.label}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Popular actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Popular This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { label: 'E-commerce setup', count: 234, trend: 'up' },
              { label: 'Template customization', count: 189, trend: 'up' },
              { label: 'SEO optimization', count: 156, trend: 'stable' },
              { label: 'Mobile responsiveness', count: 134, trend: 'up' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{item.label}</span>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    {item.count}
                  </Badge>
                  <span className={`text-xs ${
                    item.trend === 'up' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {item.trend === 'up' ? '↗' : '→'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}