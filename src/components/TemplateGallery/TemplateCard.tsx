import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download, Heart, Star } from 'lucide-react';

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    rating: number;
    downloads: number;
    likes: number;
    tags: string[];
    isPremium: boolean;
  };
  onUse: (templateId: string) => void;
  onPreview: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUse, onPreview }) => {
  return (
    <Card clickable className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={template.image} 
          alt={template.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            onClick={() => onPreview(template.id)}
            size="sm"
            className="mr-2"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
        </div>
        {template.isPremium && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            Premium
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-white mb-1">{template.name}</CardTitle>
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {template.category}
            </Badge>
          </div>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm text-white ml-1">{template.rating}</span>
          </div>
        </div>
        <CardDescription className="text-gray-300 text-sm mt-2">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-white/30 text-white">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-300 mb-3">
          <span className="flex items-center">
            <Download className="w-4 h-4 mr-1" />
            {template.downloads}
          </span>
          <span className="flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            {template.likes}
          </span>
        </div>
        <Button 
          onClick={() => onUse(template.id)}
          className="w-full"
        >
          Use Template
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;