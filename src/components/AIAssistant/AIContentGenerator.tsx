import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Wand2, Copy, RefreshCw, Check } from 'lucide-react';
import { AIService } from './AIService';

interface ContentSection {
  id: string;
  type: 'headline' | 'paragraph' | 'list' | 'cta' | 'testimonial';
  content: string;
  generated: boolean;
}

interface AIContentGeneratorProps {
  requirements: any;
  onContentGenerated: (content: ContentSection[]) => void;
}

export default function AIContentGenerator({ requirements, onContentGenerated }: AIContentGeneratorProps) {
  const [sections, setSections] = useState<ContentSection[]>([
    { id: '1', type: 'headline', content: '', generated: false },
    { id: '2', type: 'paragraph', content: '', generated: false },
    { id: '3', type: 'list', content: '', generated: false },
    { id: '4', type: 'cta', content: '', generated: false }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [customPrompt, setCustomPrompt] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const contentTypes = {
    headline: 'Headlines & Titles',
    paragraph: 'Paragraphs & Descriptions',
    list: 'Lists & Features',
    cta: 'Call-to-Action Buttons',
    testimonial: 'Testimonials & Reviews'
  };

  const generateContent = async (sectionId?: string) => {
    setIsGenerating(true);
    try {
      const sectionsToGenerate = sectionId 
        ? sections.filter(s => s.id === sectionId)
        : sections;

      for (const section of sectionsToGenerate) {
        const prompt = buildPrompt(section.type);
        const response = await AIService.generateContent({
          ...requirements,
          contentType: section.type,
          prompt
        });

        setSections(prev => prev.map(s => 
          s.id === section.id 
            ? { ...s, content: response.content || generateFallbackContent(section.type), generated: true }
            : s
        ));
        
        // Small delay between generations
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error generating content:', error);
      // Generate fallback content
      const sectionsToUpdate = sectionId 
        ? sections.filter(s => s.id === sectionId)
        : sections;
      
      sectionsToUpdate.forEach(section => {
        setSections(prev => prev.map(s => 
          s.id === section.id 
            ? { ...s, content: generateFallbackContent(section.type), generated: true }
            : s
        ));
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const buildPrompt = (type: string) => {
    const baseContext = `Industry: ${requirements.industry}, Type: ${requirements.type}, Goals: ${requirements.goals?.join(', ')}`;
    
    switch (type) {
      case 'headline':
        return `Create compelling headlines for a ${requirements.industry} ${requirements.type}. ${baseContext}. Make them attention-grabbing and relevant.`;
      case 'paragraph':
        return `Write engaging paragraphs describing a ${requirements.industry} business. ${baseContext}. Focus on benefits and value proposition.`;
      case 'list':
        return `Create a list of key features or benefits for a ${requirements.industry} ${requirements.type}. ${baseContext}. Make each point clear and compelling.`;
      case 'cta':
        return `Generate call-to-action button text for a ${requirements.industry} website. ${baseContext}. Make them action-oriented and persuasive.`;
      case 'testimonial':
        return `Create realistic testimonials for a ${requirements.industry} business. ${baseContext}. Make them authentic and specific.`;
      default:
        return `Generate content for a ${requirements.industry} ${requirements.type}. ${baseContext}.`;
    }
  };

  const generateFallbackContent = (type: string) => {
    const fallbacks = {
      headline: `Welcome to ${requirements.industry} Excellence`,
      paragraph: `We provide exceptional ${requirements.industry.toLowerCase()} services tailored to your needs. Our team is dedicated to delivering quality results that exceed expectations.`,
      list: `• Professional ${requirements.industry.toLowerCase()} services\n• Expert team with years of experience\n• Customer-focused approach\n• Competitive pricing`,
      cta: 'Get Started Today',
      testimonial: `"Outstanding service and results. Highly recommend for anyone looking for quality ${requirements.industry.toLowerCase()} solutions." - Satisfied Customer`
    };
    return fallbacks[type as keyof typeof fallbacks] || 'Content generated successfully';
  };

  const generateCustomContent = async () => {
    if (!customPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await AIService.generateContent({
        ...requirements,
        prompt: customPrompt
      });
      
      const newSection: ContentSection = {
        id: Date.now().toString(),
        type: 'paragraph',
        content: response.content || customPrompt,
        generated: true
      };
      
      setSections(prev => [...prev, newSection]);
      setCustomPrompt('');
    } catch (error) {
      console.error('Error generating custom content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const updateContent = (id: string, newContent: string) => {
    setSections(prev => prev.map(s => 
      s.id === id ? { ...s, content: newContent } : s
    ));
  };

  const addSection = (type: keyof typeof contentTypes) => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      type,
      content: '',
      generated: false
    };
    setSections(prev => [...prev, newSection]);
  };

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const handleSaveContent = () => {
    onContentGenerated(sections);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            AI Content Generator
          </span>
          <Button onClick={handleSaveContent}>
            Save Content
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Content Sections</h3>
                <Button 
                  onClick={() => generateContent()} 
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate All'}
                </Button>
              </div>
              
              {sections.map((section) => (
                <Card key={section.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">
                      {contentTypes[section.type]}
                    </Badge>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => generateContent(section.id)}
                        disabled={isGenerating}
                      >
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(section.content, section.id)}
                        disabled={!section.content}
                      >
                        {copiedId === section.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Textarea
                    value={section.content}
                    onChange={(e) => updateContent(section.id, e.target.value)}
                    placeholder={`Generated ${section.type} will appear here...`}
                    rows={section.type === 'list' ? 6 : 3}
                    className={section.generated ? 'bg-green-50' : ''}
                  />
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Custom Content Generation</h3>
              <div className="space-y-3">
                <Textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Describe the content you want to generate... (e.g., 'Write a professional bio for a web designer' or 'Create product descriptions for handmade jewelry')"
                  rows={4}
                />
                <Button 
                  onClick={generateCustomContent}
                  disabled={isGenerating || !customPrompt.trim()}
                  className="w-full"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Custom Content
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="manage" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Add Content Sections</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(contentTypes).map(([type, label]) => (
                  <Button
                    key={type}
                    variant="outline"
                    onClick={() => addSection(type as keyof typeof contentTypes)}
                    className="justify-start"
                  >
                    + {label}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Current Sections</h4>
                {sections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{contentTypes[section.type]}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeSection(section.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}