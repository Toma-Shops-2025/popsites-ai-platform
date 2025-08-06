import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Palette, Type, Layout, Settings } from 'lucide-react';

interface Element {
  id: string;
  type: string;
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  style?: any;
}

interface EnhancedPropertyPanelProps {
  selectedElement: Element | null;
  onUpdateElement: (id: string, updates: Partial<Element>) => void;
}

const EnhancedPropertyPanel: React.FC<EnhancedPropertyPanelProps> = ({
  selectedElement,
  onUpdateElement
}) => {
  if (!selectedElement) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">Select an element to edit its properties</p>
        </CardContent>
      </Card>
    );
  }

  const updateStyle = (property: string, value: any) => {
    const currentStyle = selectedElement.style || {};
    onUpdateElement(selectedElement.id, {
      style: { ...currentStyle, [property]: value }
    });
  };

  const updateProperty = (property: string, value: any) => {
    onUpdateElement(selectedElement.id, { [property]: value });
  };

  const colors = [
    '#ffffff', '#000000', '#ef4444', '#f97316', '#eab308',
    '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
  ];

  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat',
    'Poppins', 'Source Sans Pro', 'Nunito', 'Raleway', 'Ubuntu'
  ];

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Properties
        </CardTitle>
        <p className="text-gray-400 text-sm">{selectedElement.type} Element</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-white/20">
              <Type className="w-4 h-4 mr-1" />
              Content
            </TabsTrigger>
            <TabsTrigger value="style" className="text-white data-[state=active]:bg-white/20">
              <Palette className="w-4 h-4 mr-1" />
              Style
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-white data-[state=active]:bg-white/20">
              <Layout className="w-4 h-4 mr-1" />
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div>
              <Label className="text-white mb-2 block">Content</Label>
              <Input
                value={selectedElement.content}
                onChange={(e) => updateProperty('content', e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter content..."
              />
            </div>
            
            {selectedElement.type === 'text' && (
              <div>
                <Label className="text-white mb-2 block">Font Family</Label>
                <Select onValueChange={(value) => updateStyle('fontFamily', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map(font => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div>
              <Label className="text-white mb-2 block">Colors</Label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map(color => (
                  <Button
                    key={color}
                    className="w-8 h-8 p-0 rounded"
                    style={{ backgroundColor: color }}
                    onClick={() => updateStyle('color', color)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-white mb-2 block">Background Colors</Label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map(color => (
                  <Button
                    key={color}
                    className="w-8 h-8 p-0 rounded"
                    style={{ backgroundColor: color }}
                    onClick={() => updateStyle('backgroundColor', color)}
                  />
                ))}
              </div>
            </div>
            
            {selectedElement.type === 'text' && (
              <div>
                <Label className="text-white mb-2 block">Font Size: {selectedElement.style?.fontSize || 16}px</Label>
                <Slider
                  value={[selectedElement.style?.fontSize || 16]}
                  onValueChange={([value]) => updateStyle('fontSize', `${value}px`)}
                  max={72}
                  min={8}
                  step={1}
                  className="w-full"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">X Position</Label>
                <Input
                  type="number"
                  value={selectedElement.x}
                  onChange={(e) => updateProperty('x', parseInt(e.target.value) || 0)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Y Position</Label>
                <Input
                  type="number"
                  value={selectedElement.y}
                  onChange={(e) => updateProperty('y', parseInt(e.target.value) || 0)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Width</Label>
                <Input
                  type="number"
                  value={selectedElement.width || ''}
                  onChange={(e) => updateProperty('width', parseInt(e.target.value) || undefined)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Auto"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Height</Label>
                <Input
                  type="number"
                  value={selectedElement.height || ''}
                  onChange={(e) => updateProperty('height', parseInt(e.target.value) || undefined)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Auto"
                />
              </div>
            </div>
            
            <Separator className="bg-white/20" />
            
            <div>
              <Label className="text-white mb-2 block">Padding: {selectedElement.style?.padding || 8}px</Label>
              <Slider
                value={[parseInt(selectedElement.style?.padding) || 8]}
                onValueChange={([value]) => updateStyle('padding', `${value}px`)}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="text-white mb-2 block">Border Radius: {selectedElement.style?.borderRadius || 0}px</Label>
              <Slider
                value={[parseInt(selectedElement.style?.borderRadius) || 0]}
                onValueChange={([value]) => updateStyle('borderRadius', `${value}px`)}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedPropertyPanel;