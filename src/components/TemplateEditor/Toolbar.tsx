import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Type, 
  MousePointer, 
  Image, 
  Square, 
  Heading1, 
  FileText, 
  Layout, 
  Grid3X3,
  Smartphone,
  Globe,
  Palette,
  Layers,
  Zap
} from 'lucide-react';

interface ToolbarProps {
  onAddElement: (type: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddElement }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const elementCategories = {
    basic: [
      { type: 'text', label: 'Text', icon: Type, description: 'Add text content' },
      { type: 'heading', label: 'Heading', icon: Heading1, description: 'Add headings' },
      { type: 'paragraph', label: 'Paragraph', icon: FileText, description: 'Add paragraphs' },
      { type: 'button', label: 'Button', icon: MousePointer, description: 'Add buttons' },
    ],
    media: [
      { type: 'image', label: 'Image', icon: Image, description: 'Add images' },
      { type: 'video', label: 'Video', icon: Smartphone, description: 'Add videos' },
      { type: 'gallery', label: 'Gallery', icon: Grid3X3, description: 'Image gallery' },
    ],
    layout: [
      { type: 'container', label: 'Container', icon: Square, description: 'Content container' },
      { type: 'card', label: 'Card', icon: Layout, description: 'Card component' },
      { type: 'section', label: 'Section', icon: Layers, description: 'Page section' },
    ],
    advanced: [
      { type: 'form', label: 'Form', icon: FileText, description: 'Contact form' },
      { type: 'map', label: 'Map', icon: Globe, description: 'Interactive map' },
      { type: 'slider', label: 'Slider', icon: Palette, description: 'Image slider' },
    ]
  };

  const handleElementClick = (elementType: string) => {
    onAddElement(elementType);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Elements
        </CardTitle>
        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 w-fit">
          Drag & Drop
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20">
            <TabsTrigger value="basic" className="text-white text-xs">Basic</TabsTrigger>
            <TabsTrigger value="media" className="text-white text-xs">Media</TabsTrigger>
            <TabsTrigger value="layout" className="text-white text-xs">Layout</TabsTrigger>
            <TabsTrigger value="advanced" className="text-white text-xs">Advanced</TabsTrigger>
          </TabsList>
          
          {Object.entries(elementCategories).map(([category, elements]) => (
            <TabsContent key={category} value={category} className="p-4">
              <div className="grid grid-cols-1 gap-3">
                {elements.map((element) => (
                  <Button
                    key={element.type}
                    variant="outline"
                    className="h-auto p-3 flex-col bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                    onClick={() => handleElementClick(element.type)}
                  >
                    <element.icon className="w-5 h-5 mb-2" />
                    <span className="text-sm font-medium">{element.label}</span>
                    <span className="text-xs text-gray-400 mt-1">{element.description}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Toolbar;