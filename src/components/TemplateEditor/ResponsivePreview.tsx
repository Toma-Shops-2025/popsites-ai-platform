import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface ResponsivePreviewProps {
  elements: Element[];
}

const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({ elements }) => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const deviceSizes = {
    desktop: { width: '100%', height: '400px' },
    tablet: { width: '768px', height: '400px' },
    mobile: { width: '375px', height: '400px' }
  };

  const renderElement = (element: Element, scale: number = 1) => {
    const scaledStyle = {
      ...element.style,
      transform: `scale(${scale})`,
      transformOrigin: 'top left'
    };

    const position = {
      left: element.x * scale,
      top: element.y * scale,
      position: 'absolute' as const
    };

    switch (element.type) {
      case 'text':
        return (
          <div key={element.id} style={{ ...position, ...scaledStyle }} className="text-gray-800">
            {element.content || 'Sample Text'}
          </div>
        );
      case 'button':
        return (
          <button key={element.id} style={{ ...position, ...scaledStyle }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {element.content || 'Button'}
          </button>
        );
      case 'image':
        return (
          <div key={element.id} style={{ ...position, ...scaledStyle }} className="bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
            {element.content || 'Image'}
          </div>
        );
      case 'product-card':
        return (
          <div key={element.id} style={{ ...position, ...scaledStyle }} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="bg-gray-200 h-20 mb-2 rounded"></div>
            <h3 className="font-semibold text-sm">{element.content || 'Product'}</h3>
            <p className="text-green-600 font-bold">$99.99</p>
          </div>
        );
      case 'contact-form':
        return (
          <div key={element.id} style={{ ...position, ...scaledStyle }} className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-sm">{element.content || 'Contact'}</h3>
            <div className="space-y-2">
              <input className="w-full p-2 border rounded text-xs" placeholder="Name" />
              <input className="w-full p-2 border rounded text-xs" placeholder="Email" />
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Send</button>
            </div>
          </div>
        );
      default:
        return (
          <div key={element.id} style={{ ...position, ...scaledStyle }} className="bg-gray-100 border p-2 rounded">
            {element.type}
          </div>
        );
    }
  };

  const getScale = () => {
    switch (activeDevice) {
      case 'tablet': return 0.8;
      case 'mobile': return 0.6;
      default: return 1;
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">Responsive Preview</CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={activeDevice === 'desktop' ? 'default' : 'outline'}
            onClick={() => setActiveDevice('desktop')}
            className="text-white border-white/20"
          >
            <Monitor className="w-4 h-4 mr-1" />
            Desktop
          </Button>
          <Button
            size="sm"
            variant={activeDevice === 'tablet' ? 'default' : 'outline'}
            onClick={() => setActiveDevice('tablet')}
            className="text-white border-white/20"
          >
            <Tablet className="w-4 h-4 mr-1" />
            Tablet
          </Button>
          <Button
            size="sm"
            variant={activeDevice === 'mobile' ? 'default' : 'outline'}
            onClick={() => setActiveDevice('mobile')}
            className="text-white border-white/20"
          >
            <Smartphone className="w-4 h-4 mr-1" />
            Mobile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <div 
            className="relative bg-white overflow-auto mx-auto"
            style={{
              width: deviceSizes[activeDevice].width,
              height: deviceSizes[activeDevice].height,
              maxWidth: '100%'
            }}
          >
            {elements.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Add elements to see preview</p>
              </div>
            ) : (
              elements.map(element => renderElement(element, getScale()))
            )}
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Viewing {activeDevice} layout ({deviceSizes[activeDevice].width})
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponsivePreview;