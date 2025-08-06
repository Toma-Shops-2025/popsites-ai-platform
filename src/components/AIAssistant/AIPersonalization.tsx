import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { User, Settings, Brain, Target, Palette } from 'lucide-react';

interface UserPreferences {
  designStyle: string;
  colorScheme: string;
  complexity: number;
  industryFocus: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredFeatures: string[];
  autoSuggestions: boolean;
  smartRecommendations: boolean;
  learningMode: boolean;
}

interface AIPersonalizationProps {
  onPreferencesUpdate?: (preferences: UserPreferences) => void;
}

const AIPersonalization: React.FC<AIPersonalizationProps> = ({ onPreferencesUpdate }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    designStyle: 'modern',
    colorScheme: 'blue',
    complexity: 50,
    industryFocus: 'general',
    experienceLevel: 'beginner',
    preferredFeatures: [],
    autoSuggestions: true,
    smartRecommendations: true,
    learningMode: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [adaptationProgress, setAdaptationProgress] = useState(0);
  const [personalityInsights, setPersonalityInsights] = useState<any>(null);

  const designStyles = ['modern', 'classic', 'minimalist', 'creative', 'corporate'];
  const colorSchemes = ['blue', 'green', 'purple', 'orange', 'red', 'neutral'];
  const industries = ['general', 'business', 'ecommerce', 'portfolio', 'blog', 'nonprofit'];
  const availableFeatures = [
    'responsive_design', 'seo_optimization', 'social_media', 'analytics',
    'contact_forms', 'galleries', 'testimonials', 'blog', 'ecommerce', 'booking'
  ];

  useEffect(() => {
    if (onPreferencesUpdate) {
      onPreferencesUpdate(preferences);
    }
  }, [preferences, onPreferencesUpdate]);

  const savePreferences = async () => {
    setIsLoading(true);
    
    try {
      await adaptAIToPreferences();
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const adaptAIToPreferences = async () => {
    setAdaptationProgress(0);
    
    const steps = [
      'Analyzing design preferences',
      'Customizing communication style',
      'Updating recommendation engine',
      'Personalizing feature suggestions',
      'Optimizing user experience',
      'Finalizing AI adaptation'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setAdaptationProgress((i / steps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setAdaptationProgress(100);
    
    const insights = {
      designPersonality: getDesignPersonality(),
      workingStyle: getWorkingStyle(),
      recommendations: getPersonalizedRecommendations(),
      adaptationLevel: Math.round(85 + Math.random() * 15)
    };
    
    setPersonalityInsights(insights);
    setTimeout(() => setAdaptationProgress(0), 2000);
  };

  const getDesignPersonality = () => {
    const styleMap: { [key: string]: string } = {
      modern: 'Contemporary and clean aesthetic preference',
      classic: 'Timeless and elegant design approach',
      minimalist: 'Simple and focused visual style',
      creative: 'Bold and innovative design choices',
      corporate: 'Professional and structured layouts'
    };
    
    return styleMap[preferences.designStyle] || 'Balanced design approach';
  };

  const getWorkingStyle = () => {
    if (preferences.complexity > 70) return 'Prefers detailed control and advanced features';
    if (preferences.complexity > 30) return 'Balanced approach with moderate customization';
    return 'Prefers simple, guided experiences';
  };

  const getPersonalizedRecommendations = () => {
    const recs = [];
    
    if (preferences.experienceLevel === 'beginner') {
      recs.push('Enable guided tutorials and step-by-step assistance');
    }
    
    if (preferences.autoSuggestions) {
      recs.push('Activate smart content and design suggestions');
    }
    
    if (preferences.industryFocus !== 'general') {
      recs.push(`Focus on ${preferences.industryFocus}-specific templates and features`);
    }
    
    return recs;
  };

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (feature: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredFeatures: prev.preferredFeatures.includes(feature)
        ? prev.preferredFeatures.filter(f => f !== feature)
        : [...prev.preferredFeatures, feature]
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            AI Personalization Settings
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Customize how the AI assistant works with your preferences and style
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Design Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Design Style</label>
                <select
                  value={preferences.designStyle}
                  onChange={(e) => updatePreference('designStyle', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {designStyles.map(style => (
                    <option key={style} value={style}>
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Color Scheme</label>
                <select
                  value={preferences.colorScheme}
                  onChange={(e) => updatePreference('colorScheme', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {colorSchemes.map(color => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Complexity Level: {preferences.complexity}%
              </label>
              <Slider
                value={[preferences.complexity]}
                onValueChange={(value) => updatePreference('complexity', value[0])}
                max={100}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Simple</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Experience & Focus
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Experience Level</label>
                <select
                  value={preferences.experienceLevel}
                  onChange={(e) => updatePreference('experienceLevel', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Industry Focus</label>
                <select
                  value={preferences.industryFocus}
                  onChange={(e) => updatePreference('industryFocus', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry.charAt(0).toUpperCase() + industry.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preferred Features
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableFeatures.map(feature => (
                <div key={feature} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={feature}
                    checked={preferences.preferredFeatures.includes(feature)}
                    onChange={() => toggleFeature(feature)}
                    className="rounded"
                  />
                  <label htmlFor={feature} className="text-sm">
                    {feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Behavior
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Auto Suggestions</label>
                  <p className="text-xs text-muted-foreground">Get automatic design and content suggestions</p>
                </div>
                <Switch
                  checked={preferences.autoSuggestions}
                  onCheckedChange={(checked) => updatePreference('autoSuggestions', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Smart Recommendations</label>
                  <p className="text-xs text-muted-foreground">Receive personalized feature recommendations</p>
                </div>
                <Switch
                  checked={preferences.smartRecommendations}
                  onCheckedChange={(checked) => updatePreference('smartRecommendations', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Learning Mode</label>
                  <p className="text-xs text-muted-foreground">AI learns from your choices to improve suggestions</p>
                </div>
                <Switch
                  checked={preferences.learningMode}
                  onCheckedChange={(checked) => updatePreference('learningMode', checked)}
                />
              </div>
            </div>
          </div>

          {adaptationProgress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 animate-pulse" />
                <span className="text-sm">Adapting AI to your preferences...</span>
              </div>
              <Progress value={adaptationProgress} className="w-full" />
            </div>
          )}

          {personalityInsights && (
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium">AI Adaptation Complete</h4>
              <div className="text-sm space-y-2">
                <p><strong>Design Personality:</strong> {personalityInsights.designPersonality}</p>
                <p><strong>Working Style:</strong> {personalityInsights.workingStyle}</p>
                <div>
                  <strong>Recommendations:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {personalityInsights.recommendations.map((rec: string, index: number) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
                <p><strong>Adaptation Level:</strong> {personalityInsights.adaptationLevel}%</p>
              </div>
            </div>
          )}

          <Button
            onClick={savePreferences}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Saving Preferences...' : 'Save & Apply Preferences'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalization;