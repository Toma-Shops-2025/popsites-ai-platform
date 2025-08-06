import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Zap, Download, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface GeneratedCode {
  html: string;
  css: string;
  javascript: string;
  react: string;
  metadata: {
    components: number;
    lines: number;
    complexity: string;
    responsive: boolean;
  };
}

export const AIPopSitesIntelligentCodeGenerator: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCode = async () => {
    if (!userPrompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const { data } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userPrompt,
          context: 'code-generation',
          action: 'generate_complete_code'
        }
      });
      
      const mockCode: GeneratedCode = {
        html: `<!DOCTYPE html>\n<html>\n<head>\n<title>Generated Site</title>\n</head>\n<body>\n<h1>Your Website</h1>\n<p>Generated from: ${userPrompt}</p>\n</body>\n</html>`,
        css: `body { font-family: Arial; margin: 0; padding: 20px; }\nh1 { color: #333; }`,
        javascript: `document.addEventListener('DOMContentLoaded', function() {\n  console.log('Site loaded');\n});`,
        react: `import React from 'react';\n\nconst App = () => {\n  return <div><h1>Generated Site</h1></div>;\n};\n\nexport default App;`,
        metadata: {
          components: Math.floor(Math.random() * 10) + 5,
          lines: Math.floor(Math.random() * 500) + 200,
          complexity: ['Simple', 'Moderate', 'Complex'][Math.floor(Math.random() * 3)],
          responsive: true
        }
      };
      
      setGeneratedCode(mockCode);
    } catch (error) {
      console.error('Code generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-green-600" />
            Intelligent Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Create a modern e-commerce site with product catalog..."
            className="min-h-[100px]"
          />
          
          <Button 
            onClick={generateCode}
            disabled={isGenerating || !userPrompt.trim()}
            className="w-full"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Code'}
          </Button>
        </CardContent>
      </Card>
      
      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Code</CardTitle>
            <div className="flex gap-2">
              <Badge>{generatedCode.metadata.complexity}</Badge>
              <Badge variant="outline">{generatedCode.metadata.components} Components</Badge>
              <Badge variant="outline">{generatedCode.metadata.lines} Lines</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="html">
              <TabsList>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
              
              <TabsContent value="html">
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
                  <code>{generatedCode.html}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="css">
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
                  <code>{generatedCode.css}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="js">
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
                  <code>{generatedCode.javascript}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="react">
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
                  <code>{generatedCode.react}</code>
                </pre>
              </TabsContent>
            </Tabs>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};