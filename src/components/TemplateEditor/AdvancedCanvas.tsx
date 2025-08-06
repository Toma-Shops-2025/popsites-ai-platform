import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Move, Edit3, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';

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

interface AdvancedCanvasProps {
  elements: Element[];
  selectedElement: Element | null;
  onSelectElement: (element: Element) => void;
  onUpdateElement: (id: string, updates: Partial<Element>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (element: Element) => void;
}

const AdvancedCanvas: React.FC<AdvancedCanvasProps> = ({
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement
}) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, element: Element) => {
    if (editingElement) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setDraggedElement(element.id);
    setDragOffset({
      x: e.clientX - rect.left - element.x,
      y: e.clientY - rect.top - element.y
    });
    onSelectElement(element);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedElement || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(rect.width - 100, e.clientX - rect.left - dragOffset.x));
    const newY = Math.max(0, Math.min(rect.height - 50, e.clientY - rect.top - dragOffset.y));
    
    onUpdateElement(draggedElement, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
  };

  const handleDoubleClick = (element: Element) => {
    if (element.type === 'text' || element.type === 'button') {
      setEditingElement(element.id);
    }
  };

  const handleContentChange = (elementId: string, newContent: string) => {
    onUpdateElement(elementId, { content: newContent });
  };

  const renderElement = (element: Element) => {
    const isSelected = selectedElement?.id === element.id;
    const isEditing = editingElement === element.id;
    const baseClasses = `absolute cursor-move select-none ${
      isSelected ? 'ring-2 ring-blue-400' : 'border border-transparent'
    } hover:border-blue-300 transition-all`;

    const elementStyle = {
      left: element.x,
      top: element.y,
      width: element.width || 'auto',
      height: element.height || 'auto',
      ...element.style
    };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            className={`${baseClasses} p-2 bg-white/10 backdrop-blur-sm rounded`}
            style={elementStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
            onDoubleClick={() => handleDoubleClick(element)}
          >
            {isEditing ? (
              <Input
                value={element.content}
                onChange={(e) => handleContentChange(element.id, e.target.value)}
                onBlur={() => setEditingElement(null)}
                onKeyPress={(e) => e.key === 'Enter' && setEditingElement(null)}
                className="text-white bg-transparent border-none p-0 h-auto"
                autoFocus
              />
            ) : (
              <span className="text-white">{element.content || 'Text'}</span>
            )}
            {isSelected && <ElementControls element={element} onDelete={onDeleteElement} onDuplicate={onDuplicateElement} />}
          </div>
        );
      
      case 'button':
        return (
          <div
            key={element.id}
            className={baseClasses}
            style={elementStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
            onDoubleClick={() => handleDoubleClick(element)}
          >
            {isEditing ? (
              <Input
                value={element.content}
                onChange={(e) => handleContentChange(element.id, e.target.value)}
                onBlur={() => setEditingElement(null)}
                onKeyPress={(e) => e.key === 'Enter' && setEditingElement(null)}
                className="bg-blue-600 text-white border-none rounded px-4 py-2"
                autoFocus
              />
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white pointer-events-none">
                {element.content || 'Button'}
              </Button>
            )}
            {isSelected && <ElementControls element={element} onDelete={onDeleteElement} onDuplicate={onDuplicateElement} />}
          </div>
        );
      
      case 'image':
        return (
          <div
            key={element.id}
            className={baseClasses}
            style={elementStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
          >
            <div className="bg-gray-600 w-32 h-20 flex items-center justify-center text-white text-xs rounded">
              {element.content || 'Image'}
            </div>
            {isSelected && <ElementControls element={element} onDelete={onDeleteElement} onDuplicate={onDuplicateElement} />}
          </div>
        );
      
      default:
        return (
          <div
            key={element.id}
            className={`${baseClasses} p-2 bg-white/10 backdrop-blur-sm rounded`}
            style={elementStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
          >
            <span className="text-white">{element.type}</span>
            {isSelected && <ElementControls element={element} onDelete={onDeleteElement} onDuplicate={onDuplicateElement} />}
          </div>
        );
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/20 h-96 relative overflow-hidden">
      <div
        ref={canvasRef}
        className="absolute inset-0 p-4"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {elements.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Drag elements here to start designing</p>
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
  onDuplicate: (element: Element) => void;
}> = ({ element, onDelete, onDuplicate }) => (
  <div className="absolute -top-8 right-0 flex gap-1 bg-black/50 rounded p-1">
    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20" onClick={() => onDuplicate(element)}>
      <Copy className="w-3 h-3" />
    </Button>
    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20">
      <Edit3 className="w-3 h-3" />
    </Button>
    <Button size="sm" variant="destructive" className="h-6 w-6 p-0" onClick={() => onDelete(element.id)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  </div>
);

export default AdvancedCanvas;