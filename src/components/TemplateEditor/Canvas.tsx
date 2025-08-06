import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Trash2, Move, Edit, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, Reorder } from 'framer-motion';

interface Element {
  id: string;
  type: string;
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  styles?: any;
}

interface CanvasProps {
  elements: Element[];
  onDeleteElement: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<Element>) => void;
  selectedElement: Element | null;
  onSelectElement: (element: Element | null) => void;
}

const Canvas: React.FC<CanvasProps> = ({ 
  elements, 
  onDeleteElement, 
  onUpdateElement, 
  selectedElement,
  onSelectElement 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleElementClick = (element: Element) => {
    onSelectElement(element);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null);
    }
  };

  const handleDragStart = (element: Element) => {
    setIsDragging(true);
    onSelectElement(element);
  };

  const handleDragEnd = (element: Element, info: any) => {
    setIsDragging(false);
    if (info && info.point) {
      onUpdateElement(element.id, {
        x: info.point.x,
        y: info.point.y
      });
    }
  };

  const renderElement = (element: Element) => {
    const isSelected = selectedElement?.id === element.id;
    const baseClasses = `absolute p-2 min-w-[100px] min-h-[40px] group cursor-move ${
      isSelected 
        ? 'border-2 border-blue-500 shadow-lg' 
        : 'border-2 border-dashed border-gray-400 hover:border-blue-400'
    }`;
    
    const elementContent = (
      <div 
        className={baseClasses} 
        style={{ 
          left: element.x, 
          top: element.y,
          width: element.width,
          height: element.height,
          ...element.styles
        }}
        onClick={() => handleElementClick(element)}
      >
        {renderElementContent(element)}
        <ElementControls 
          element={element} 
          onDelete={onDeleteElement}
          onUpdateElement={onUpdateElement}
          isSelected={isSelected}
        />
      </div>
    );

    return (
      <motion.div
        key={element.id}
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => handleDragStart(element)}
        onDragEnd={(e, info) => handleDragEnd(element, info)}
        whileDrag={{ scale: 1.05, zIndex: 1000 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        style={{ position: 'absolute', left: element.x, top: element.y }}
      >
        {elementContent}
      </motion.div>
    );
  };

  const renderElementContent = (element: Element) => {
    switch (element.type) {
      case 'heading':
        return (
          <h2 className="text-2xl font-bold text-gray-800 m-0">
            {element.content || 'Heading'}
          </h2>
        );
      case 'paragraph':
        return (
          <p className="text-gray-600 m-0 leading-relaxed">
            {element.content || 'This is a sample paragraph. Add your content here.'}
          </p>
        );
      case 'button':
        return (
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            {element.content || 'Button'}
          </button>
        );
      case 'image':
        return (
          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Image Placeholder</span>
          </div>
        );
      case 'card':
        return (
          <Card className="p-4 w-full">
            <h3 className="font-semibold text-lg mb-2">
              {element.content || 'Card Title'}
            </h3>
            <p className="text-gray-600 text-sm">
              This is a sample card content. You can customize this with your own text and styling.
            </p>
          </Card>
        );
      case 'form':
        return (
          <div className="space-y-3 w-full">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
              Submit
            </button>
          </div>
        );
      case 'video':
        return (
          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Video Placeholder</span>
          </div>
        );
      case 'gallery':
        return (
          <div className="grid grid-cols-2 gap-2 w-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 text-xs">Image {i}</span>
              </div>
            ))}
          </div>
        );
      case 'section':
        return (
          <div className="w-full p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Section Title</h3>
            <p className="text-gray-600 text-sm">
              This is a section container. You can add multiple elements inside.
            </p>
          </div>
        );
      case 'map':
        return (
          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Map Placeholder</span>
          </div>
        );
      case 'slider':
        return (
          <div className="w-full h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Slider Placeholder</span>
          </div>
        );
      default:
        return (
          <div className="text-gray-600">
            {element.content || 'Element'}
          </div>
        );
    }
  };

  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
      onClick={handleCanvasClick}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    >
      {elements.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Start Designing
            </h3>
            <p className="text-gray-500">
              Drag elements from the toolbar to start building your website
            </p>
          </div>
        </div>
      ) : (
        elements.map(renderElement)
      )}
    </div>
  );
};

const ElementControls: React.FC<{ 
  element: Element; 
  onDelete: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<Element>) => void;
  isSelected: boolean;
}> = ({ element, onDelete, onUpdateElement, isSelected }) => (
  <div className={`absolute -top-8 right-0 flex gap-1 transition-opacity ${
    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
  }`}>
    <Button
      size="sm"
      variant="secondary"
      className="h-6 w-6 p-0"
      onClick={(e) => {
        e.stopPropagation();
        onUpdateElement(element.id, { content: 'Updated content' });
      }}
    >
      <Edit className="h-3 w-3" />
    </Button>
    <Button
      size="sm"
      variant="secondary"
      className="h-6 w-6 p-0"
      onClick={(e) => {
        e.stopPropagation();
        // Clone element logic would go here
      }}
    >
      <Copy className="h-3 w-3" />
    </Button>
    <Button
      size="sm"
      variant="destructive"
      className="h-6 w-6 p-0"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(element.id);
      }}
    >
      <Trash2 className="h-3 w-3" />
    </Button>
  </div>
);

export default Canvas;