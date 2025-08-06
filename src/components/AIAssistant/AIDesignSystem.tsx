import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Palette, Type, Layout, Sparkles } from 'lucide-react';
import { AIService } from './AIService';

interface DesignSystem {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    sizes: {
      h1: number;
      h2: number;
      h3: number;
      body: number;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  layout: {
    maxWidth: number;
    columns: number;
    gap: number;
  };
}

interface AIDesignSystemProps {
  requirements: any;
  onDesignApplied: (design: DesignSystem) => void;
}

export default function AIDesignSystem({ requirements, onDesignApplied }: AIDesignSystemProps) {
  const [designSystem, setDesignSystem] = useState<DesignSystem>({
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      accent: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      sizes: {
        h1: 48,
        h2: 36,
        h3: 24,
        body: 16
      }
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    },
    layout: {
      maxWidth: 1200,
      columns: 12,
      gap: 24
    }
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('colors');

  const colorPalettes = [
    { name: 'Ocean Blue', primary: '#0EA5E9', secondary: '#0F172A', accent: '#06B6D4' },
    { name: 'Forest Green', primary: '#059669', secondary: '#374151', accent: '#F59E0B' },
    { name: 'Sunset Orange', primary: '#EA580C', secondary: '#1F2937', accent: '#EF4444' },
    { name: 'Royal Purple', primary: '#7C3AED', secondary: '#4B5563', accent: '#EC4899' },
    { name: 'Minimalist', primary: '#000000', secondary: '#6B7280', accent: '#3B82F6' },
    { name: 'Warm Earth', primary: '#92400E', secondary: '#78716C', accent: '#DC2626' }
  ];

  const fontPairs = [
    { heading: 'Inter', body: 'Inter', name: 'Modern Clean' },
    { heading: 'Playfair Display', body: 'Source Sans Pro', name: 'Classic Elegant' },
    { heading: 'Montserrat', body: 'Open Sans', name: 'Professional' },
    { heading: 'Poppins', body: 'Roboto', name: 'Friendly Modern' },
    { heading: 'Merriweather', body: 'Lato', name: 'Editorial' },
    { heading: 'Oswald', body: 'Nunito', name: 'Bold Impact' }
  ];

  const generateDesignSystem = async () => {
    setIsGenerating(true);
    try {
      const response = await AIService.generateDesignSystem(requirements);
      if (response.designSystem) {
        setDesignSystem(response.designSystem);
      } else {
        const generatedDesign = generateFromRequirements();
        setDesignSystem(generatedDesign);
      }
    } catch (error) {
      console.error('Error generating design system:', error);
      const generatedDesign = generateFromRequirements();
      setDesignSystem(generatedDesign);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFromRequirements = (): DesignSystem => {
    let selectedPalette = colorPalettes[0];
    if (requirements.industry === 'Healthcare') {
      selectedPalette = colorPalettes.find(p => p.name === 'Ocean Blue') || colorPalettes[0];
    } else if (requirements.industry === 'Technology') {
      selectedPalette = colorPalettes.find(p => p.name === 'Minimalist') || colorPalettes[0];
    } else if (requirements.industry === 'Restaurant') {
      selectedPalette = colorPalettes.find(p => p.name === 'Warm Earth') || colorPalettes[0];
    }

    let selectedFonts = fontPairs[0];
    if (requirements.industry === 'Business') {
      selectedFonts = fontPairs.find(f => f.name === 'Professional') || fontPairs[0];
    } else if (requirements.industry === 'Portfolio') {
      selectedFonts = fontPairs.find(f => f.name === 'Classic Elegant') || fontPairs[0];
    }

    return {
      ...designSystem,
      colors: {
        primary: selectedPalette.primary,
        secondary: selectedPalette.secondary,
        accent: selectedPalette.accent,
        background: '#FFFFFF',
        text: '#1F2937'
      },
      typography: {
        headingFont: selectedFonts.heading,
        bodyFont: selectedFonts.body,
        sizes: designSystem.typography.sizes
      }
    };
  };

  const applyPalette = (palette: typeof colorPalettes[0]) => {
    setDesignSystem(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        primary: palette.primary,
        secondary: palette.secondary,
        accent: palette.accent
      }
    }));
  };

  const applyFontPair = (fonts: typeof fontPairs[0]) => {
    setDesignSystem(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        headingFont: fonts.heading,
        bodyFont: fonts.body
      }
    }));
  };

  const updateColor = (colorType: keyof DesignSystem['colors'], value: string) => {
    setDesignSystem(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  const handleApplyDesign = () => {
    onDesignApplied(designSystem);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            AI Design System
          </span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={generateDesignSystem}
              disabled={isGenerating}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Auto Generate'}
            </Button>
            <Button onClick={handleApplyDesign}>
              Apply Design
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">Color Palettes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {colorPalettes.map((palette) => (
                    <div 
                      key={palette.name}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => applyPalette(palette)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: palette.primary }}></div>
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: palette.secondary }}></div>
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: palette.accent }}></div>
                        <span className="text-sm font-medium">{palette.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Custom Colors</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(designSystem.colors).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="text-sm font-medium capitalize">{key}</label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={value}
                          onChange={(e) => updateColor(key as keyof DesignSystem['colors'], e.target.value)}
                          className="w-12 h-8 p-0 border-0"
                        />
                        <Input
                          value={value}
                          onChange={(e) => updateColor(key as keyof DesignSystem['colors'], e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="typography" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">Font Pairs</h3>
                <div className="grid grid-cols-1 gap-3">
                  {fontPairs.map((fonts) => (
                    <div 
                      key={fonts.name}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => applyFontPair(fonts)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium" style={{ fontFamily: fonts.heading }}>{fonts.heading}</p>
                          <p className="text-sm text-gray-600" style={{ fontFamily: fonts.body }}>{fonts.body}</p>
                        </div>
                        <Badge variant="outline">{fonts.name}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Layout Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Width</label>
                  <Input
                    type="number"
                    value={designSystem.layout.maxWidth}
                    onChange={(e) => setDesignSystem(prev => ({
                      ...prev,
                      layout: { ...prev.layout, maxWidth: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Columns</label>
                  <Input
                    type="number"
                    value={designSystem.layout.columns}
                    onChange={(e) => setDesignSystem(prev => ({
                      ...prev,
                      layout: { ...prev.layout, columns: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}