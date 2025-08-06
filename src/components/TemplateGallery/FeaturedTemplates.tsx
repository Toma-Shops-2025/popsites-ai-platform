import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Crown, Flame, TrendingUp } from 'lucide-react';
import { Template } from '@/data/templateData';

interface FeaturedTemplatesProps {
  templates: Template[];
  onUse: (templateId: string) => void;
  onPreview: (templateId: string) => void;
}

const FeaturedTemplates: React.FC<FeaturedTemplatesProps> = ({
  templates,
  onUse,
  onPreview
}) => {
  const featuredSections = [
    {
      title: 'Editor\'s Choice',
      icon: <Crown className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
      templates: templates.filter(t => t.rating >= 4.8).slice(0, 2)
    },
    {
      title: 'Trending Now',
      icon: <Flame className="w-5 h-5" />,
      color: 'from-red-500 to-pink-500',
      templates: templates.filter(t => t.downloads > 1000).slice(0, 2)
    },
    {
      title: 'Most Popular',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-purple-500 to-indigo-500',
      templates: templates.sort((a, b) => b.likes - a.likes).slice(0, 2)
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Featured Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color} mr-3`}>
                  <div className="text-white">{section.icon}</div>
                </div>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.templates.map((template) => (
                <div key={template.id} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{template.name}</h4>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs text-white ml-1">{template.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                      {template.category}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button
                        onClick={() => onPreview(template.id)}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 text-xs px-2 py-1 h-auto"
                      >
                        Preview
                      </Button>
                      <Button
                        onClick={() => onUse(template.id)}
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs px-2 py-1 h-auto"
                      >
                        Use
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTemplates;