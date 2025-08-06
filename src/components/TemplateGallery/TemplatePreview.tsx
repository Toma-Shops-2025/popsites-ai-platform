import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ExternalLink, Download, Heart, Star, Eye } from 'lucide-react';

interface TemplatePreviewProps {
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
    features: string[];
    demoUrl?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onUse: (templateId: string) => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  isOpen,
  onClose,
  onUse
}) => {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              {template.name}
              {template.isPremium && (
                <Badge className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  Premium
                </Badge>
              )}
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <img 
              src={template.image} 
              alt={template.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  {template.rating}
                </span>
                <span className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  {template.downloads}
                </span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {template.likes}
                </span>
              </div>
              <Badge variant="secondary" className="bg-gray-700 text-white">
                {template.category}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {template.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={() => onUse(template.id)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Use Template
              </Button>
              {template.demoUrl && (
                <Button 
                  onClick={() => window.open(template.demoUrl, '_blank')}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Live Demo
                </Button>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300 mb-4">{template.description}</p>
            
            <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
            <ul className="space-y-2 mb-4">
              {template.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">What's Included:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Fully responsive design</li>
                <li>• Clean, modern code</li>
                <li>• Cross-browser compatibility</li>
                <li>• SEO optimized</li>
                <li>• Easy customization</li>
                <li>• Documentation included</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreview;