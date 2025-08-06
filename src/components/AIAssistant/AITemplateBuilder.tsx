import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Palette, Type, Image, ShoppingCart, Mail } from 'lucide-react';
import { AIService } from './AIService';

interface TemplateElement {
  id: string;
  type: 'header' | 'hero' | 'features' | 'gallery' | 'contact' | 'footer';
  content: any;
  styles: any;
}

interface AITemplateBuilderProps {
  requirements: any;
  onSave: (template: any) => void;
  onPreview: (template: any) => void;
}

export default function AITemplateBuilder({ requirements, onSave, onPreview }: AITemplateBuilderProps) {
  const [template, setTemplate] = useState<TemplateElement[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [activeTab, setActiveTab] = useState('structure');

  const buildSteps = [
    'Analyzing requirements',
    'Creating structure',
    'Generating content',
    'Applying design',
    'Optimizing layout',
    'Finalizing template'
  ];

  useEffect(() => {
    buildTemplate();
  }, [requirements]);

  const buildTemplate = async () => {
    setIsBuilding(true);
    setBuildProgress(0);
    
    try {
      for (let i = 0; i < buildSteps.length; i++) {
        setCurrentStep(buildSteps[i]);
        setBuildProgress((i + 1) / buildSteps.length * 100);
        
        // Simulate building process
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        switch (i) {
          case 1: // Creating structure
            await createStructure();
            break;
          case 2: // Generating content
            await generateContent();
            break;
          case 3: // Applying design
            await applyDesign();
            break;
          case 4: // Optimizing layout
            await optimizeLayout();
            break;
        }
      }
    } catch (error) {
      console.error('Error building template:', error);
    } finally {
      setIsBuilding(false);
      setCurrentStep('Complete');
    }
  };

  const createStructure = async () => {
    const structure: TemplateElement[] = [
      {
        id: 'header',
        type: 'header',
        content: { navigation: ['Home', 'About', 'Services', 'Contact'] },
        styles: { background: 'white', height: '80px' }
      },
      {
        id: 'hero',
        type: 'hero',
        content: { 
          title: `Welcome to ${requirements.industry}`,
          subtitle: 'Your success starts here',
          cta: 'Get Started'
        },
        styles: { background: 'gradient', height: '500px' }
      }
    ];

    // Add features based on requirements
    if (requirements.features.includes('Gallery')) {
      structure.push({
        id: 'gallery',
        type: 'gallery',
        content: { images: [], title: 'Our Work' },
        styles: { columns: 3, spacing: '20px' }
      });
    }

    if (requirements.features.includes('Contact Form')) {
      structure.push({
        id: 'contact',
        type: 'contact',
        content: { 
          title: 'Get In Touch',
          fields: ['name', 'email', 'message']
        },
        styles: { background: 'gray-50' }
      });
    }

    structure.push({
      id: 'footer',
      type: 'footer',
      content: { 
        links: ['Privacy', 'Terms', 'Contact'],
        social: ['facebook', 'twitter', 'linkedin']
      },
      styles: { background: 'dark', color: 'white' }
    });

    setTemplate(structure);
  };

  const generateContent = async () => {
    try {
      const response = await AIService.generateContent(requirements);
      setTemplate(prev => prev.map(element => {
        if (element.type === 'hero') {
          return {
            ...element,
            content: {
              ...element.content,
              title: response.heroTitle || element.content.title,
              subtitle: response.heroSubtitle || element.content.subtitle
            }
          };
        }
        return element;
      }));
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const applyDesign = async () => {
    const colorScheme = requirements.colors[0] || 'Blue & White';
    const colors = getColorPalette(colorScheme);
    
    setTemplate(prev => prev.map(element => ({
      ...element,
      styles: {
        ...element.styles,
        primaryColor: colors.primary,
        secondaryColor: colors.secondary,
        textColor: colors.text
      }
    })));
  };

  const optimizeLayout = async () => {
    // Apply responsive design and optimization
    setTemplate(prev => prev.map(element => ({
      ...element,
      styles: {
        ...element.styles,
        responsive: true,
        optimized: true
      }
    })));
  };

  const getColorPalette = (scheme: string) => {
    const palettes: { [key: string]: any } = {
      'Blue & White': { primary: '#3B82F6', secondary: '#FFFFFF', text: '#1F2937' },
      'Green & Gray': { primary: '#10B981', secondary: '#6B7280', text: '#111827' },
      'Purple & Pink': { primary: '#8B5CF6', secondary: '#EC4899', text: '#1F2937' },
      'Orange & Black': { primary: '#F97316', secondary: '#000000', text: '#FFFFFF' },
      'Red & Gold': { primary: '#EF4444', secondary: '#F59E0B', text: '#1F2937' },
      'Teal & Cream': { primary: '#14B8A6', secondary: '#FEF3C7', text: '#1F2937' }
    };
    return palettes[scheme] || palettes['Blue & White'];
  };

  const handlePreview = () => {
    onPreview({ elements: template, requirements });
  };

  const handleSave = () => {
    onSave({ elements: template, requirements });
  };

  if (isBuilding) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Building Your Template</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium">{currentStep}</p>
            <Progress value={buildProgress} className="mt-4" />
            <p className="text-sm text-gray-600 mt-2">{Math.round(buildProgress)}% Complete</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Template Builder</span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              Preview
            </Button>
            <Button onClick={handleSave}>
              Save Template
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="structure" className="mt-4">
            <div className="space-y-3">
              <h3 className="font-medium">Template Structure</h3>
              {template.map((element, index) => (
                <div key={element.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                    {getElementIcon(element.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium capitalize">{element.type}</p>
                    <p className="text-sm text-gray-600">{getElementDescription(element.type)}</p>
                  </div>
                  <Badge variant="outline">{index + 1}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Generated Content</h3>
              {template.map(element => (
                <div key={element.id} className="p-4 border rounded-lg">
                  <h4 className="font-medium capitalize mb-2">{element.type} Section</h4>
                  <pre className="text-sm bg-gray-50 p-2 rounded overflow-x-auto">
                    {JSON.stringify(element.content, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="design" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Design System</h3>
              {template.map(element => (
                <div key={element.id} className="p-4 border rounded-lg">
                  <h4 className="font-medium capitalize mb-2">{element.type} Styles</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(element.styles).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Template preview will be available after generation</p>
              <Button onClick={handlePreview}>Generate Preview</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function getElementIcon(type: string) {
  const icons: { [key: string]: any } = {
    header: <Settings className="w-4 h-4" />,
    hero: <Type className="w-4 h-4" />,
    features: <Palette className="w-4 h-4" />,
    gallery: <Image className="w-4 h-4" />,
    contact: <Mail className="w-4 h-4" />,
    footer: <Settings className="w-4 h-4" />
  };
  return icons[type] || <Settings className="w-4 h-4" />;
}

function getElementDescription(type: string) {
  const descriptions: { [key: string]: string } = {
    header: 'Navigation and branding',
    hero: 'Main banner with call-to-action',
    features: 'Key features and benefits',
    gallery: 'Image gallery or portfolio',
    contact: 'Contact form and information',
    footer: 'Footer links and social media'
  };
  return descriptions[type] || 'Template element';
}