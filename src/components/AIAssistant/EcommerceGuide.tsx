import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ShoppingCart, Palette, Settings, Upload, Eye } from 'lucide-react';
import { useState } from 'react';

interface EcommerceGuideProps {
  onActionSuggestion?: (action: string, data?: any) => void;
}

export default function EcommerceGuide({ onActionSuggestion }: EcommerceGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: 'Choose E-commerce Template',
      description: 'Select a professional e-commerce template from our gallery',
      action: () => onActionSuggestion?.('navigate', { path: '/template-gallery', filter: 'ecommerce' }),
      details: 'Browse templates designed specifically for online stores with product catalogs, shopping carts, and checkout pages.'
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: 'Customize Your Store Design',
      description: 'Personalize colors, fonts, and layout to match your brand',
      action: () => onActionSuggestion?.('navigate', { path: '/template-editor' }),
      details: 'Use our drag-and-drop editor to modify your store\'s appearance, add your logo, and set your brand colors.'
    },
    {
      icon: <Upload className="w-5 h-5" />,
      title: 'Add Your Products',
      description: 'Upload product images and add descriptions, prices',
      action: () => onActionSuggestion?.('navigate', { path: '/template-editor' }),
      details: 'Add product photos, write compelling descriptions, set prices, and organize your inventory.'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: 'Configure Store Settings',
      description: 'Set up payment methods, shipping, and store policies',
      action: () => onActionSuggestion?.('navigate', { path: '/template-editor' }),
      details: 'Configure payment gateways, shipping options, tax settings, and return policies.'
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: 'Preview & Test',
      description: 'Test your store functionality and mobile responsiveness',
      action: () => onActionSuggestion?.('preview', {}),
      details: 'Preview your store on different devices and test the shopping experience.'
    }
  ];

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-blue-500" />
          E-commerce Store Setup Guide
        </CardTitle>
        <p className="text-sm text-gray-600">
          Follow these steps to create your online store
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;
          
          return (
            <div key={index} className={`p-4 border rounded-lg transition-all ${
              isCurrent ? 'border-blue-500 bg-blue-50' : 
              isCompleted ? 'border-green-500 bg-green-50' : 
              'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  isCompleted ? 'bg-green-100' : 
                  isCurrent ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5 text-green-600" /> : step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{step.title}</h4>
                    <Badge variant={isCompleted ? 'default' : isCurrent ? 'secondary' : 'outline'}>
                      Step {index + 1}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  <p className="text-xs text-gray-500 mb-3">{step.details}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={step.action}
                      variant={isCurrent ? 'default' : 'outline'}
                    >
                      {isCompleted ? 'Revisit' : isCurrent ? 'Start' : 'Begin'}
                    </Button>
                    {isCurrent && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markStepComplete(index)}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Progress: {completedSteps.length}/{steps.length} steps completed</h4>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}