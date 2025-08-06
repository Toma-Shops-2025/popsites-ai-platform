import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Zap, Download, Eye, Play, Settings } from 'lucide-react';

interface CodeTemplate {
  name: string;
  type: 'react' | 'api' | 'database' | 'mobile';
  description: string;
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

export const AICodeGenerationEngine: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('generator');

  const codeTemplates: CodeTemplate[] = [
    {
      name: 'E-commerce Store',
      type: 'react',
      description: 'Complete online store with cart, checkout, and payments',
      complexity: 'advanced',
      estimatedTime: '15-20 min'
    },
    {
      name: 'Blog Platform',
      type: 'react',
      description: 'Content management system with admin panel',
      complexity: 'intermediate',
      estimatedTime: '10-15 min'
    },
    {
      name: 'REST API',
      type: 'api',
      description: 'Backend API with authentication and CRUD operations',
      complexity: 'intermediate',
      estimatedTime: '8-12 min'
    },
    {
      name: 'Mobile App',
      type: 'mobile',
      description: 'React Native app with navigation and state management',
      complexity: 'advanced',
      estimatedTime: '20-25 min'
    }
  ];

  const handleGenerate = async () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI code generation
    setTimeout(() => {
      const sampleCode = `// Generated React Component based on: "${userInput}"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GeneratedComponent: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize component based on user requirements
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // API call logic here
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Generated Component</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="p-4 border rounded">
                {/* Render data items */}
              </div>
            ))}
          </div>
        )}
        <Button onClick={fetchData} className="mt-4">
          Refresh Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default GeneratedComponent;`;
      
      setGeneratedCode(sampleCode);
      setIsGenerating(false);
    }, 2000);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'react': return 'bg-blue-100 text-blue-800';
      case 'api': return 'bg-purple-100 text-purple-800';
      case 'database': return 'bg-green-100 text-green-800';
      case 'mobile': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-600" />
            AI Code Generation Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generator">Code Generator</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="mt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Describe what you want to build:
                  </label>
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="e.g., Create a modern e-commerce website with product catalog, shopping cart, user authentication, and payment integration using Stripe. Include admin dashboard for managing products and orders."
                    className="min-h-32"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!userInput.trim() || isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <Zap className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Code className="h-4 w-4 mr-2" />
                        Generate Code
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                {generatedCode && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Generated Code:</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{generatedCode}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {codeTemplates.map((template, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold">{template.name}</h3>
                        <div className="flex gap-1">
                          <Badge className={getTypeColor(template.type)}>
                            {template.type}
                          </Badge>
                          <Badge className={getComplexityColor(template.complexity)}>
                            {template.complexity}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Est. {template.estimatedTime}
                        </span>
                        <Button size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          Generate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-8 rounded-lg min-h-64 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Eye className="h-12 w-12 mx-auto mb-4" />
                      <p>Generate code to see live preview</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};