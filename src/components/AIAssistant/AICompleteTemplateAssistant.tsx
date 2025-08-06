import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, CheckCircle, ArrowRight, Eye, Download } from 'lucide-react';
import AITemplateWizard from './AITemplateWizard';
import AITemplateBuilder from './AITemplateBuilder';
import AIContentGenerator from './AIContentGenerator';
import AIDesignSystem from './AIDesignSystem';

interface TemplateProject {
  id: string;
  name: string;
  requirements: any;
  template: any;
  content: any;
  design: any;
  status: 'requirements' | 'building' | 'content' | 'design' | 'complete';
  progress: number;
}

interface AICompleteTemplateAssistantProps {
  onTemplateComplete: (template: any) => void;
  onClose: () => void;
}

export default function AICompleteTemplateAssistant({ onTemplateComplete, onClose }: AICompleteTemplateAssistantProps) {
  const [project, setProject] = useState<TemplateProject>({
    id: Date.now().toString(),
    name: 'New Template Project',
    requirements: null,
    template: null,
    content: null,
    design: null,
    status: 'requirements',
    progress: 0
  });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 'requirements', name: 'Requirements', icon: Wand2 },
    { id: 'building', name: 'Template Structure', icon: ArrowRight },
    { id: 'content', name: 'Content Generation', icon: ArrowRight },
    { id: 'design', name: 'Design System', icon: ArrowRight },
    { id: 'complete', name: 'Complete', icon: CheckCircle }
  ];

  const handleRequirementsComplete = (requirements: any) => {
    setProject(prev => ({
      ...prev,
      requirements,
      status: 'building',
      progress: 20
    }));
    setActiveStep(1);
  };

  const handleTemplateBuilt = (template: any) => {
    setProject(prev => ({
      ...prev,
      template,
      status: 'content',
      progress: 40
    }));
    setActiveStep(2);
  };

  const handleContentGenerated = (content: any) => {
    setProject(prev => ({
      ...prev,
      content,
      status: 'design',
      progress: 60
    }));
    setActiveStep(3);
  };

  const handleDesignApplied = (design: any) => {
    setProject(prev => ({
      ...prev,
      design,
      status: 'complete',
      progress: 100
    }));
    setActiveStep(4);
  };

  const handlePreviewTemplate = () => {
    const completeTemplate = {
      ...project.template,
      content: project.content,
      design: project.design,
      requirements: project.requirements
    };
    // Open preview in new window or modal
    console.log('Preview template:', completeTemplate);
  };

  const handleDownloadTemplate = () => {
    const completeTemplate = {
      ...project.template,
      content: project.content,
      design: project.design,
      requirements: project.requirements,
      metadata: {
        created: new Date().toISOString(),
        version: '1.0.0',
        generator: 'AI Complete Template Assistant'
      }
    };
    
    const blob = new Blob([JSON.stringify(completeTemplate, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}-template.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCompleteTemplate = () => {
    const completeTemplate = {
      ...project.template,
      content: project.content,
      design: project.design,
      requirements: project.requirements
    };
    onTemplateComplete(completeTemplate);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <AITemplateWizard
            onComplete={handleRequirementsComplete}
            onClose={onClose}
          />
        );
      case 1:
        return (
          <AITemplateBuilder
            requirements={project.requirements}
            onSave={handleTemplateBuilt}
            onPreview={handlePreviewTemplate}
          />
        );
      case 2:
        return (
          <AIContentGenerator
            requirements={project.requirements}
            onContentGenerated={handleContentGenerated}
          />
        );
      case 3:
        return (
          <AIDesignSystem
            requirements={project.requirements}
            onDesignApplied={handleDesignApplied}
          />
        );
      case 4:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                Template Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Your template is ready!</h3>
                <p className="text-gray-600 mb-6">
                  AI has successfully created a complete template based on your requirements.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h4 className="font-medium">Template Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Industry:</span>
                    <span className="ml-2 font-medium">{project.requirements?.industry}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium">{project.requirements?.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Features:</span>
                    <span className="ml-2 font-medium">{project.requirements?.features?.length || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Content Sections:</span>
                    <span className="ml-2 font-medium">{project.content?.length || 0}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handlePreviewTemplate}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDownloadTemplate}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button 
                  onClick={handleCompleteTemplate}
                  className="flex-1"
                >
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>AI Complete Template Assistant</span>
            <Badge variant="outline">{project.progress}% Complete</Badge>
          </CardTitle>
          <Progress value={project.progress} className="mt-2" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-100 text-blue-700' : 
                    isCompleted ? 'bg-green-100 text-green-700' : 
                    'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-px mx-2 ${
                      isCompleted ? 'bg-green-300' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="min-h-[600px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              Previous Step
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              
              {activeStep < steps.length - 1 && (
                <Button 
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={!project.requirements && activeStep === 0}
                >
                  Next Step
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}