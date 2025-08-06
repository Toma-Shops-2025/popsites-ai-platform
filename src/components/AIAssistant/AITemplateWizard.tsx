import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wand2, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { AIService } from './AIService';

interface TemplateRequirements {
  industry: string;
  type: string;
  features: string[];
  colors: string[];
  content: string;
  goals: string[];
}

interface AITemplateWizardProps {
  onComplete: (template: any) => void;
  onClose: () => void;
}

export default function AITemplateWizard({ onComplete, onClose }: AITemplateWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [requirements, setRequirements] = useState<TemplateRequirements>({
    industry: '',
    type: '',
    features: [],
    colors: [],
    content: '',
    goals: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<any>(null);

  const steps = [
    'Industry & Type',
    'Features & Goals',
    'Design & Colors',
    'Content',
    'Generate Template'
  ];

  const industries = ['Business', 'E-commerce', 'Portfolio', 'Blog', 'Restaurant', 'Healthcare', 'Education', 'Technology'];
  const websiteTypes = ['Landing Page', 'Multi-page Site', 'Online Store', 'Blog', 'Portfolio', 'Directory'];
  const commonFeatures = ['Contact Form', 'Gallery', 'Blog', 'E-commerce', 'Booking System', 'Newsletter', 'Social Media'];
  const colorSchemes = ['Blue & White', 'Green & Gray', 'Purple & Pink', 'Orange & Black', 'Red & Gold', 'Teal & Cream'];
  const businessGoals = ['Generate Leads', 'Sell Products', 'Build Brand', 'Share Content', 'Provide Services', 'Showcase Work'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setRequirements(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleColorToggle = (color: string) => {
    setRequirements(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setRequirements(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const generateTemplate = async () => {
    setIsGenerating(true);
    try {
      const response = await AIService.generateTemplate(requirements);
      setGeneratedTemplate(response);
      onComplete(response);
    } catch (error) {
      console.error('Error generating template:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map(industry => (
                  <Badge
                    key={industry}
                    variant={requirements.industry === industry ? 'default' : 'outline'}
                    className="cursor-pointer p-2 justify-center"
                    onClick={() => setRequirements(prev => ({ ...prev, industry }))}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Website Type</label>
              <div className="grid grid-cols-2 gap-2">
                {websiteTypes.map(type => (
                  <Badge
                    key={type}
                    variant={requirements.type === type ? 'default' : 'outline'}
                    className="cursor-pointer p-2 justify-center"
                    onClick={() => setRequirements(prev => ({ ...prev, type }))}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Features Needed</label>
              <div className="grid grid-cols-2 gap-2">
                {commonFeatures.map(feature => (
                  <Badge
                    key={feature}
                    variant={requirements.features.includes(feature) ? 'default' : 'outline'}
                    className="cursor-pointer p-2 justify-center"
                    onClick={() => handleFeatureToggle(feature)}
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Business Goals</label>
              <div className="grid grid-cols-2 gap-2">
                {businessGoals.map(goal => (
                  <Badge
                    key={goal}
                    variant={requirements.goals.includes(goal) ? 'default' : 'outline'}
                    className="cursor-pointer p-2 justify-center"
                    onClick={() => handleGoalToggle(goal)}
                  >
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Color Scheme</label>
              <div className="grid grid-cols-2 gap-2">
                {colorSchemes.map(color => (
                  <Badge
                    key={color}
                    variant={requirements.colors.includes(color) ? 'default' : 'outline'}
                    className="cursor-pointer p-2 justify-center"
                    onClick={() => handleColorToggle(color)}
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Describe Your Business/Content</label>
              <Textarea
                value={requirements.content}
                onChange={(e) => setRequirements(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Tell me about your business, products, services, or what you want to showcase..."
                rows={6}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Wand2 className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-lg font-medium mb-2">Ready to Generate Your Template</h3>
              <p className="text-sm text-gray-600 mb-4">I'll create a custom template based on your requirements</p>
              <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
                <p><strong>Industry:</strong> {requirements.industry}</p>
                <p><strong>Type:</strong> {requirements.type}</p>
                <p><strong>Features:</strong> {requirements.features.join(', ')}</p>
                <p><strong>Colors:</strong> {requirements.colors.join(', ')}</p>
                <p><strong>Goals:</strong> {requirements.goals.join(', ')}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-500" />
          AI Template Wizard
        </CardTitle>
        <Progress value={(currentStep + 1) / steps.length * 100} className="mt-2" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          {steps.map((step, index) => (
            <span key={step} className={index <= currentStep ? 'text-blue-600' : ''}>
              {step}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStep()}
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={generateTemplate} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Template'}
              <Wand2 className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}