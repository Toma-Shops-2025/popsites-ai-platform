import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, Globe, Palette, FileText, Code } from 'lucide-react';
import { AIService } from './AIService';

interface AIWebsiteBuilderProps {
  onComplete: (website: any) => void;
}

const AIWebsiteBuilder: React.FC<AIWebsiteBuilderProps> = ({ onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const buildSteps = [
    { id: 'analyze', label: 'Analyzing requirements', icon: FileText },
    { id: 'structure', label: 'Creating site structure', icon: Globe },
    { id: 'design', label: 'Generating design system', icon: Palette },
    { id: 'content', label: 'Creating content', icon: FileText },
    { id: 'code', label: 'Building components', icon: Code },
    { id: 'finalize', label: 'Finalizing website', icon: Wand2 }
  ];

  const buildWebsite = async () => {
    if (!userInput.trim()) return;
    
    setIsBuilding(true);
    setBuildProgress(0);
    
    try {
      for (let i = 0; i < buildSteps.length; i++) {
        const step = buildSteps[i];
        setCurrentStep(step.label);
        setBuildProgress((i / buildSteps.length) * 100);
        
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (i === buildSteps.length - 1) {
          // Final step - generate complete website
          const website = await AIService.generateWebsite(userInput);
          const completeWebsite = {
            ...website,
            id: Date.now().toString(),
            name: 'AI Generated Website',
            description: userInput,
            ready: true,
            timestamp: new Date().toISOString()
          };
          
          setBuildProgress(100);
          onComplete(completeWebsite);
        }
      }
    } catch (error) {
      console.error('Error building website:', error);
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          AI Website Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Describe your website:
          </label>
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="I want to create a modern e-commerce website for selling handmade jewelry with a clean design, product gallery, shopping cart, and customer reviews..."
            className="min-h-[120px]"
            disabled={isBuilding}
          />
        </div>
        
        {isBuilding && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">{currentStep}</span>
            </div>
            <Progress value={buildProgress} className="w-full" />
            <div className="flex flex-wrap gap-2">
              {buildSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = buildSteps.findIndex(s => s.label === currentStep) === index;
                const isComplete = buildProgress > (index / buildSteps.length) * 100;
                
                return (
                  <Badge
                    key={step.id}
                    variant={isComplete ? 'default' : isActive ? 'secondary' : 'outline'}
                    className="flex items-center gap-1"
                  >
                    <Icon className="h-3 w-3" />
                    {step.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
        
        <Button
          onClick={buildWebsite}
          disabled={!userInput.trim() || isBuilding}
          className="w-full"
          size="lg"
        >
          {isBuilding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Building Your Website...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Build My Website
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIWebsiteBuilder;