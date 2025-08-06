import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, Share2, Download, Settings, BarChart3, Search, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import AdvancedCanvas from '@/components/TemplateEditor/AdvancedCanvas';
import EnhancedPropertyPanel from '@/components/TemplateEditor/EnhancedPropertyPanel';
import ElementLibrary from '@/components/TemplateEditor/ElementLibrary';
import TemplateHistory from '@/components/TemplateEditor/TemplateHistory';
import TemplateCollaboration from '@/components/TemplateEditor/TemplateCollaboration';
import TemplateExport from '@/components/TemplateEditor/TemplateExport';
import TemplatePublish from '@/components/TemplateEditor/TemplatePublish';
import TemplateAnalytics from '@/components/TemplateEditor/TemplateAnalytics';
import TemplateSEO from '@/components/TemplateEditor/TemplateSEO';
import TemplateIntegrations from '@/components/TemplateEditor/TemplateIntegrations';

const ProfessionalTemplateEditor: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('design');
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [elements, setElements] = useState<any[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSave = () => {
    toast({ title: 'Template Saved', description: 'Your changes have been saved successfully.' });
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
    toast({ 
      title: isPreviewMode ? 'Edit Mode' : 'Preview Mode', 
      description: isPreviewMode ? 'Back to editing' : 'Viewing as visitor' 
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Link Copied', description: 'Template link copied to clipboard' });
  };

  const handleElementAdd = (element: any) => {
    const newElement = { ...element, id: Date.now().toString() };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
  };

  const handleElementSelect = (element: any) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (elementId: string, updates: any) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
    if (selectedElement?.id === elementId) {
      setSelectedElement(prev => ({ ...prev, ...updates }));
    }
  };

  const handleElementDelete = (elementId: string) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 mt-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/start-building">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold">Professional Editor</h1>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                PRO
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-4 p-1 m-2">
              <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
              <TabsTrigger value="data" className="text-xs">Data</TabsTrigger>
              <TabsTrigger value="tools" className="text-xs">Tools</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="design" className="space-y-4 p-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Elements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ElementLibrary onElementAdd={handleElementAdd} />
                </CardContent>
              </Card>
              
              {selectedElement && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EnhancedPropertyPanel
                      element={selectedElement}
                      onUpdate={(updates) => handleElementUpdate(selectedElement.id, updates)}
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="data" className="space-y-4 p-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TemplateAnalytics />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-4 p-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center">
                      <Search className="w-4 h-4 mr-2" />
                      SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TemplateSEO />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Integrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TemplateIntegrations />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 p-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Version History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TemplateHistory />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TemplateCollaboration />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Export & Publish</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <TemplateExport />
                    <TemplatePublish />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-gray-100 overflow-auto">
          <div className="p-4">
            {isPreviewMode ? (
              <div className="bg-white rounded-lg shadow-lg min-h-[600px] p-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">Preview Mode</h2>
                  <p className="text-gray-600">This is how your website will look to visitors</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {elements.map(element => (
                      <div key={element.id} className="p-4 border rounded-lg">
                        <div className="font-medium">{element.type}</div>
                        <div className="text-sm text-gray-500">{element.content || 'Element content'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <AdvancedCanvas
                elements={elements}
                selectedElement={selectedElement}
                onElementSelect={handleElementSelect}
                onElementUpdate={handleElementUpdate}
                onElementDelete={handleElementDelete}
                onElementAdd={handleElementAdd}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplateEditor;