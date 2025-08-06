import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Toolbar from '@/components/TemplateEditor/Toolbar';
import Canvas from '@/components/TemplateEditor/Canvas';
import PropertyPanel from '@/components/TemplateEditor/PropertyPanel';
import AITemplateGuide from '@/components/AIAssistant/AITemplateGuide';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface Element {
  id: string;
  type: string;
  content: string;
  x: number;
  y: number;
}

const TemplateEditor: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showAIGuide, setShowAIGuide] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addElement = (type: string) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      content: `New ${type}`,
      x: Math.random() * 200,
      y: Math.random() * 200
    };
    setElements([...elements, newElement]);
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
    if (selectedElement?.id === id) {
      setSelectedElement({ ...selectedElement, ...updates });
    }
  };

  const handleAIAction = (action: string, data?: any) => {
    switch (action) {
      case 'navigate':
        if (data?.path) {
          navigate(data.path);
          toast({ title: 'Navigation', description: `Taking you to ${data.path}` });
        }
        break;
      case 'export':
        toast({ title: 'Export Ready', description: 'Your website is ready for export!' });
        break;
    }
    setShowAIGuide(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-white">Template Editor</h1>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowAIGuide(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Help
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-2">
              <Toolbar onAddElement={addElement} />
            </div>
            
            <div className="col-span-7">
              <Canvas 
                elements={elements}
                onDeleteElement={deleteElement}
                onUpdateElement={updateElement}
              />
            </div>
            
            <div className="col-span-3">
              <PropertyPanel 
                selectedElement={selectedElement}
                onUpdateElement={updateElement}
              />
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showAIGuide} onOpenChange={setShowAIGuide}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI Assistant</DialogTitle>
          </DialogHeader>
          <AITemplateGuide onActionSuggestion={handleAIAction} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateEditor;