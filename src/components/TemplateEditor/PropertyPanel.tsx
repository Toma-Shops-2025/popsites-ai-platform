import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Element {
  id: string;
  type: string;
  content: string;
  x: number;
  y: number;
}

interface PropertyPanelProps {
  selectedElement: Element | null;
  onUpdateElement: (id: string, updates: Partial<Element>) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ selectedElement, onUpdateElement }) => {
  if (!selectedElement) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-sm">Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-sm">Select an element to edit properties</p>
        </CardContent>
      </Card>
    );
  }

  const handleUpdate = (field: string, value: string | number) => {
    onUpdateElement(selectedElement.id, { [field]: value });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-sm">Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-white text-xs">Content</Label>
          <Textarea
            value={selectedElement.content}
            onChange={(e) => handleUpdate('content', e.target.value)}
            className="bg-white/10 border-white/30 text-white text-sm"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-white text-xs">X Position</Label>
            <Input
              type="number"
              value={selectedElement.x}
              onChange={(e) => handleUpdate('x', parseInt(e.target.value))}
              className="bg-white/10 border-white/30 text-white text-sm"
            />
          </div>
          <div>
            <Label className="text-white text-xs">Y Position</Label>
            <Input
              type="number"
              value={selectedElement.y}
              onChange={(e) => handleUpdate('y', parseInt(e.target.value))}
              className="bg-white/10 border-white/30 text-white text-sm"
            />
          </div>
        </div>
        
        <div>
          <Label className="text-white text-xs">Element Type</Label>
          <Select value={selectedElement.type} onValueChange={(value) => handleUpdate('type', value)}>
            <SelectTrigger className="bg-white/10 border-white/30 text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="button">Button</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="container">Container</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyPanel;