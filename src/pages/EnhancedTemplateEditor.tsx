import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, MessageCircle, Download, Undo, Redo } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import ElementLibrary from '@/components/TemplateEditor/ElementLibrary';
import AdvancedCanvas from '@/components/TemplateEditor/AdvancedCanvas';
import EnhancedPropertyPanel from '@/components/TemplateEditor/EnhancedPropertyPanel';
import AITemplateGuide from '@/components/AIAssistant/AITemplateGuide';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
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

const EnhancedTemplateEditor: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showAIGuide, setShowAIGuide] = useState(false);
  const [history, setHistory] = useState<Element[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const saveToHistory = useCallback((newElements: Element[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const addElement = useCallback((type: string, config?: any) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      content: config?.content || `New ${type}`,
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 50,
      width: config?.width,
      height: config?.height,
      style: config?.style || {}
    };
    
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(newElement);
    
    toast({
      title: 'Element Added',
      description: `${type} element added to canvas`,
      duration: 1500,
    });
  }, [elements, saveToHistory, toast]);

  const deleteElement = useCallback((id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    saveToHistory(newElements);
    
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
    
    toast({
      title: 'Element Deleted',
      description: 'Element removed from canvas',
      duration: 1500,
    });
  }, [elements, selectedElement, saveToHistory, toast]);

  const updateElement = useCallback((id: string, updates: Partial<Element>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    
    if (selectedElement?.id === id) {
      setSelectedElement({ ...selectedElement, ...updates });
    }
  }, [elements, selectedElement]);

  const duplicateElement = useCallback((element: Element) => {
    const newElement: Element = {
      ...element,
      id: Date.now().toString(),
      x: element.x + 20,
      y: element.y + 20
    };
    
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(newElement);
    
    toast({
      title: 'Element Duplicated',
      description: 'Element copied successfully',
      duration: 1500,
    });
  }, [elements, saveToHistory, toast]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements([...history[historyIndex - 1]]);
      setSelectedElement(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements([...history[historyIndex + 1]]);
      setSelectedElement(null);
    }
  }, [history, historyIndex]);

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
      case 'template-select':
        if (data?.templateId) {
          toast({ title: 'Template Applied', description: 'Template loaded successfully!' });
        }
        break;
    }
    setShowAIGuide(false);
  };

  const handleSave = () => {
    toast({
      title: 'Project Saved',
      description: 'Your template has been saved successfully',
      duration: 2000,
    });
  };

  const handlePreview = () => {
    toast({
      title: 'Preview Mode',
      description: 'Opening preview in new window...',
      duration: 2000,
    });
  };

  const handleExport = () => {
    toast({
      title: 'Export Complete',
      description: 'Your website files are ready for download',
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/start-building">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-white">Enhanced Template Editor</h1>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={undo} disabled={historyIndex <= 0} variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                <Undo className="w-4 h-4" />
              </Button>
              <Button onClick={redo} disabled={historyIndex >= history.length - 1} variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                <Redo className="w-4 h-4" />
              </Button>
              <Button onClick={() => setShowAIGuide(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Help
              </Button>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handlePreview} variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleExport} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <Tabs defaultValue="elements" className="w-full">
                <TabsList className="grid w-full grid-cols-1 bg-white/10">
                  <TabsTrigger value="elements" className="text-white data-[state=active]:bg-white/20">
                    Elements
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="elements">
                  <ElementLibrary onAddElement={addElement} />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="col-span-6">
              <AdvancedCanvas 
                elements={elements}
                selectedElement={selectedElement}
                onSelectElement={setSelectedElement}
                onUpdateElement={updateElement}
                onDeleteElement={deleteElement}
                onDuplicateElement={duplicateElement}
              />
            </div>
            
            <div className="col-span-3">
              <EnhancedPropertyPanel 
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
      
      <Footer />
    </div>
  );
};

export default EnhancedTemplateEditor;