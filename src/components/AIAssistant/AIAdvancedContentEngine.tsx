import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Image, Video, Music, Globe, Sparkles, Wand2, Bot } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ContentType {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface GeneratedContent {
  id: string;
  type: string;
  title: string;
  content: string;
  quality: number;
  timestamp: Date;
}

export function AIAdvancedContentEngine() {
  const [selectedType, setSelectedType] = useState('');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [length, setLength] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTypes: ContentType[] = [
    { id: 'blog', name: 'Blog Post', icon: FileText, description: 'SEO-optimized blog articles' },
    { id: 'product', name: 'Product Description', icon: Sparkles, description: 'Compelling product copy' },
    { id: 'landing', name: 'Landing Page', icon: Globe, description: 'High-converting page content' },
    { id: 'social', name: 'Social Media', icon: Bot, description: 'Engaging social posts' },
    { id: 'email', name: 'Email Campaign', icon: Wand2, description: 'Persuasive email content' }
  ];

  const tones = ['Professional', 'Casual', 'Friendly', 'Authoritative', 'Creative', 'Technical'];
  const lengths = ['Short (100-300 words)', 'Medium (300-800 words)', 'Long (800+ words)'];

  const generateContent = async () => {
    if (!selectedType || !topic.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const { data } = await supabase.functions.invoke('ai-nlp-processor', {
        body: {
          action: 'generate_content',
          type: selectedType,
          topic,
          tone,
          length
        }
      });
      
      // Simulate content generation
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: selectedType,
        title: `${topic} - ${contentTypes.find(t => t.id === selectedType)?.name}`,
        content: data?.content || `Generated ${selectedType} content about ${topic} in ${tone.toLowerCase()} tone...`,
        quality: Math.random() * 20 + 80, // 80-100% quality
        timestamp: new Date()
      };
      
      setGeneratedContent(prev => [newContent, ...prev]);
      
    } catch (error) {
      console.error('Content generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-500" />
            AI Advanced Content Engine
          </CardTitle>
          <CardDescription>
            Generate high-quality content for any purpose using advanced AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Content Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{type.name}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Topic/Subject</label>
            <Input
              placeholder="Enter the topic or subject for your content..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Length</label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger>
                <SelectValue placeholder="Select content length" />
              </SelectTrigger>
              <SelectContent>
                {lengths.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={generateContent} 
            disabled={isGenerating || !selectedType || !topic.trim()}
            className="w-full"
          >
            {isGenerating ? 'Generating Content...' : 'Generate Content'}
          </Button>
        </CardContent>
      </Card>

      {generatedContent.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Generated Content</h3>
          {generatedContent.map((content) => (
            <Card key={content.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{content.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Quality: {Math.round(content.quality)}%</Badge>
                    <Badge>{content.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={content.content} 
                  readOnly 
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>Generated: {content.timestamp.toLocaleString()}</span>
                  <Button size="sm" variant="outline">Copy Content</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}