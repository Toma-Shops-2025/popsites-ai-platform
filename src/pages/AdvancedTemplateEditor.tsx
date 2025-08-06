import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Eye, Undo, Redo } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedCanvas from '@/components/TemplateEditor/AdvancedCanvas';
import ElementLibrary from '@/components/TemplateEditor/ElementLibrary';
import EnhancedPropertyPanel from '@/components/TemplateEditor/EnhancedPropertyPanel';
import ResponsivePreview from '@/components/TemplateEditor/ResponsivePreview';
import TemplateExport from '@/components/TemplateEditor/TemplateExport';
import TemplateHistory from '@/components/TemplateEditor/TemplateHistory';
import TemplateCollaboration from '@/components/TemplateEditor/TemplateCollaboration';
import TemplatePublish from '@/components/TemplateEditor/TemplatePublish';

interface Element {
  id: string;
  type: string;
  content: string;
  styles: Record<string, any>;
  position: { x: number; y: number };
}

const AdvancedTemplateEditor: React.FC = () => {
  const { toast } = useToast();
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [collaborators] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'owner' as const, status: 'online' as const },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'editor' as const, status: 'offline' as const }
  ]);
  const [publishStatus, setPublishStatus] = useState<'draft' | 'publishing' | 'published' | 'error'>('draft');

  const addElement = (type: string) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'New Text' : type === 'button' ? 'Click Me' : '',
      styles: { fontSize: '16px', color: '#000000' },
      position: { x: 100, y: 100 }
    };
    setElements([...elements, newElement]);
    addToHistory('create', `Added ${type} element`);
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
    addToHistory('edit', `Updated element`);
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
    addToHistory('delete', `Deleted element`);
  };

  const addToHistory = (action: string, description: string) => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      action,
      description,
      elements: [...elements]
    };
    setHistory([...history.slice(0, historyIndex + 1), newItem]);
    setHistoryIndex(historyIndex + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1].elements);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1].elements);
    }
  };

  const handleSave = () => {
    addToHistory('save', 'Template saved');
    toast({ title: 'Template Saved', description: 'Your changes have been saved successfully' });
  };

  const handleExport = (format: string) => {
    toast({ title: 'Export Started', description: `Exporting template as ${format}...` });
  };

  const handlePublish = (settings: any) => {
    setPublishStatus('publishing');
    setTimeout(() => {
      setPublishStatus('published');
      toast({ title: 'Site Published!', description: `Your site is live at ${settings.domain}.${settings.subdomain}` });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        {/* Top Toolbar */}
        <div className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/start-building">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Button onClick={handleUndo} disabled={historyIndex <= 0} variant="outline" size="sm">
                  <Undo className="w-4 h-4" />
                </Button>
                <Button onClick={handleRedo} disabled={historyIndex >= history.length - 1} variant="outline" size="sm">
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TemplateHistory history={history} onRestore={(item) => setElements(item.elements)} onClear={() => setHistory([])} />
              <TemplateCollaboration 
                collaborators={collaborators} 
                onInvite={(email, role) => toast({ title: 'Invited', description: `${email} invited as ${role}` })}
                onRemove={(id) => toast({ title: 'Removed', description: 'Collaborator removed' })}
                onRoleChange={(id, role) => toast({ title: 'Role Changed', description: `Role updated to ${role}` })}
              />
              <Button onClick={handleSave} variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />Save
              </Button>
              <TemplateExport template={elements} onExport={handleExport} />
              <TemplatePublish template={elements} onPublish={handlePublish} publishStatus={publishStatus} />
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex h-[calc(100vh-140px)]">
          {/* Left Sidebar - Elements */}
          <div className="w-80 bg-white border-r overflow-y-auto">
            <Tabs defaultValue="elements" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="elements">Elements</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
              <TabsContent value="elements" className="p-4">
                <ElementLibrary onAddElement={addElement} />
              </TabsContent>
              <TabsContent value="properties" className="p-4">
                <EnhancedPropertyPanel element={selectedElement} onUpdate={updateElement} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 bg-gray-100">
            <AdvancedCanvas 
              elements={elements}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onUpdateElement={updateElement}
              onDeleteElement={deleteElement}
            />
          </div>

          {/* Right Sidebar - Preview */}
          <div className="w-80 bg-white border-l">
            <div className="p-4 border-b">
              <h3 className="font-semibold flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </h3>
            </div>
            <ResponsivePreview elements={elements} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvancedTemplateEditor;