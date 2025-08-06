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
    onUpdateElement(element.id, {
      x: info.point.x,
      y: info.point.y
    });
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
        transition={{ duration: 0.2 }}
      >
        {elementContent}
      </motion.div>
    );
  };

  const renderElementContent = (element: Element) => {
    switch (element.type) {
      case 'text':
        return (
          <div className="text-black bg-white p-2 rounded min-w-[120px]">
            {element.content || 'Sample Text'}
          </div>
        );
      case 'button':
        return (
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
            disabled
          >
            {element.content || 'Button'}
          </Button>
        );
      case 'image':
        return (
          <div className="bg-gray-200 w-32 h-24 flex items-center justify-center text-gray-600 text-xs border-2 border-dashed border-gray-400 rounded">
            <div className="text-center">
              <div className="text-lg mb-1">🖼️</div>
              <div>Image Placeholder</div>
            </div>
          </div>
        );
      case 'heading':
        return (
          <h2 className="text-2xl font-bold text-black bg-white p-2 rounded min-w-[150px]">
            {element.content || 'Heading'}
          </h2>
        );
      case 'paragraph':
        return (
          <p className="text-black bg-white p-2 rounded min-w-[200px] max-w-[300px]">
            {element.content || 'This is a sample paragraph text that demonstrates how content will look in your design.'}
          </p>
        );
      case 'card':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm min-w-[200px]">
            <h3 className="font-semibold text-gray-900 mb-2">Card Title</h3>
            <p className="text-gray-600 text-sm">{element.content || 'Card content goes here'}</p>
          </div>
        );
      default:
        return (
          <div className="text-black bg-white p-2 rounded min-w-[100px]">
            {element.type}
          </div>
        );
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/20 h-[600px] relative overflow-hidden">
      <div 
        ref={canvasRef}
        className="absolute inset-0 p-4 bg-gray-50"
        onClick={handleCanvasClick}
        style={{ 
          backgroundImage: 'radial-gradient(circle at 20px 20px, #e5e7eb 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      >
        {elements.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-gray-500 text-lg mb-2">Start Building Your Website</p>
              <p className="text-gray-400">Drag elements from the toolbar to begin designing</p>
            </div>
          </div>
        ) : (
          elements.map(renderElement)
        )}
      </div>
    </Card>
  );
};

const ElementControls: React.FC<{ 
  element: Element; 
  onDelete: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<Element>) => void;
  isSelected: boolean;
}> = ({ element, onDelete, onUpdateElement, isSelected }) => (
  <div className={`absolute -top-10 right-0 transition-opacity flex gap-1 ${
    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
  }`}>
    <Button 
      size="sm" 
      variant="outline" 
      className="h-7 w-7 p-0 bg-white border-gray-300 hover:bg-gray-50"
      onClick={() => onUpdateElement(element.id, { content: prompt('Edit content:', element.content) || element.content })}
    >
      <Edit className="w-3 h-3" />
    </Button>
    <Button 
      size="sm" 
      variant="outline" 
      className="h-7 w-7 p-0 bg-white border-gray-300 hover:bg-gray-50"
      onClick={() => {
        const newElement = { ...element, id: Date.now().toString(), x: element.x + 20, y: element.y + 20 };
        // This would need to be handled by the parent component
      }}
    >
      <Copy className="w-3 h-3" />
    </Button>
    <Button 
      size="sm" 
      variant="destructive" 
      className="h-7 w-7 p-0 text-white" 
      onClick={() => onDelete(element.id)}
    >
      <Trash2 className="w-3 h-3" />
    </Button>
  </div>
);

export default Canvas;