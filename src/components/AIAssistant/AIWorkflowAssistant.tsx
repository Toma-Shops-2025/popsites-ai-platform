import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight, Workflow } from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  optional?: boolean;
  estimatedTime: string;
  action: string;
}

interface AIWorkflowAssistantProps {
  workflowType?: 'website' | 'ecommerce' | 'blog' | 'portfolio';
  currentStep?: number;
  onStepClick?: (step: WorkflowStep, index: number) => void;
  onNextStep?: () => void;
}

export default function AIWorkflowAssistant({ 
  workflowType = 'website',
  currentStep = 0,
  onStepClick,
  onNextStep
}: AIWorkflowAssistantProps) {
  const [steps, setSteps] = useState<WorkflowStep[]>(() => {
    const workflows = {
      website: [
        {
          id: '1',
          title: 'Choose Template',
          description: 'Select a template that matches your vision',
          completed: false,
          estimatedTime: '5 min',
          action: 'Browse Templates'
        },
        {
          id: '2',
          title: 'Customize Design',
          description: 'Personalize colors, fonts, and layout',
          completed: false,
          estimatedTime: '15 min',
          action: 'Open Editor'
        },
        {
          id: '3',
          title: 'Add Content',
          description: 'Write compelling text and upload images',
          completed: false,
          estimatedTime: '30 min',
          action: 'Start Writing'
        },
        {
          id: '4',
          title: 'SEO Setup',
          description: 'Optimize for search engines',
          completed: false,
          optional: true,
          estimatedTime: '10 min',
          action: 'Configure SEO'
        },
        {
          id: '5',
          title: 'Preview & Test',
          description: 'Check responsiveness and functionality',
          completed: false,
          estimatedTime: '10 min',
          action: 'Preview Site'
        },
        {
          id: '6',
          title: 'Publish',
          description: 'Make your site live to the world',
          completed: false,
          estimatedTime: '5 min',
          action: 'Go Live'
        }
      ],
      ecommerce: [
        {
          id: '1',
          title: 'Choose Store Template',
          description: 'Select an e-commerce template',
          completed: false,
          estimatedTime: '5 min',
          action: 'Browse Store Templates'
        },
        {
          id: '2',
          title: 'Add Products',
          description: 'Upload product images and descriptions',
          completed: false,
          estimatedTime: '45 min',
          action: 'Manage Products'
        },
        {
          id: '3',
          title: 'Payment Setup',
          description: 'Configure payment processing',
          completed: false,
          estimatedTime: '15 min',
          action: 'Setup Payments'
        },
        {
          id: '4',
          title: 'Shipping Options',
          description: 'Set up shipping rates and zones',
          completed: false,
          estimatedTime: '20 min',
          action: 'Configure Shipping'
        },
        {
          id: '5',
          title: 'Store Policies',
          description: 'Add terms, privacy, and return policies',
          completed: false,
          estimatedTime: '15 min',
          action: 'Create Policies'
        },
        {
          id: '6',
          title: 'Launch Store',
          description: 'Go live and start selling',
          completed: false,
          estimatedTime: '5 min',
          action: 'Launch Store'
        }
      ]
    };

    return workflows[workflowType] || workflows.website;
  });

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = Math.round((completedSteps / steps.length) * 100);

  const handleStepComplete = (stepIndex: number) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].completed = !updatedSteps[stepIndex].completed;
    setSteps(updatedSteps);
  };

  const getStepIcon = (step: WorkflowStep, index: number) => {
    if (step.completed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (index === currentStep) {
      return <Circle className="w-5 h-5 text-blue-500 fill-blue-100" />;
    }
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-blue-500" />
          Workflow Assistant
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{completedSteps}/{steps.length} steps</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`p-3 border rounded-lg transition-colors cursor-pointer ${
                index === currentStep ? 'border-blue-200 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => onStepClick?.(step, index)}
            >
              <div className="flex items-start gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStepComplete(index);
                  }}
                  className="mt-0.5"
                >
                  {getStepIcon(step, index)}
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium text-sm ${
                      step.completed ? 'line-through text-gray-500' : ''
                    }`}>
                      {step.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {step.optional && (
                        <Badge variant="outline" className="text-xs">
                          Optional
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">{step.estimatedTime}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    disabled={step.completed}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStepClick?.(step, index);
                    }}
                  >
                    {step.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {currentStep < steps.length - 1 && (
          <div className="mt-4 pt-4 border-t">
            <Button 
              onClick={onNextStep}
              className="w-full"
              disabled={!steps[currentStep]?.completed}
            >
              Continue to Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}