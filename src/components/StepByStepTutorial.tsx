import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Play, CheckCircle, ArrowRight } from 'lucide-react';

const StepByStepTutorial: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const tutorialSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Set up your account and navigate the platform',
      steps: [
        {
          title: 'Create Your Account',
          description: 'Sign up and verify your email',
          details: 'Click the "Get Started" button, fill in your details, and check your email for verification. This gives you access to all features.',
          tips: ['Use a professional email address', 'Choose a strong password', 'Verify your email immediately']
        },
        {
          title: 'Explore the Dashboard',
          description: 'Familiarize yourself with the main interface',
          details: 'The dashboard shows your recent templates, quick actions, and navigation menu. Spend a few minutes exploring each section.',
          tips: ['Bookmark important pages', 'Check out the template gallery', 'Review your account settings']
        },
        {
          title: 'Choose Your First Template',
          description: 'Select a starting point for your project',
          details: 'Browse the template gallery or start with a blank canvas. Templates are organized by category and use case.',
          tips: ['Start with a template close to your needs', 'Preview templates before selecting', 'Save templates you like for later']
        }
      ]
    },
    {
      id: 'template-editor',
      title: 'Using the Template Editor',
      description: 'Master the visual editing interface',
      steps: [
        {
          title: 'Understanding the Interface',
          description: 'Learn the three main areas: Toolbar, Canvas, and Properties',
          details: 'The toolbar contains all elements you can add. The canvas is your design area. The properties panel lets you customize selected elements.',
          tips: ['Keep the properties panel open', 'Use keyboard shortcuts', 'Zoom in for precise editing']
        },
        {
          title: 'Adding Elements',
          description: 'Insert text, images, buttons, and shapes',
          details: 'Click elements in the toolbar to add them to your canvas. Each element type has specific properties you can customize.',
          tips: ['Start with layout elements first', 'Group related elements', 'Use consistent spacing']
        },
        {
          title: 'Customizing Properties',
          description: 'Modify colors, fonts, sizes, and positioning',
          details: 'Select any element to see its properties. Change colors, fonts, sizes, and positioning using the property panel.',
          tips: ['Use consistent colors throughout', 'Stick to 2-3 font families', 'Align elements properly']
        }
      ]
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Step-by-Step Tutorial
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master every feature with our comprehensive guide - from beginner to expert
          </p>
        </div>

        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {tutorialSections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="text-sm text-gray-900 data-[state=active]:text-gray-900">
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {tutorialSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-blue-600" />
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {section.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {stepIndex + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                            <p className="text-gray-600 mb-3">{step.description}</p>
                            <p className="text-sm text-gray-700 mb-4">{step.details}</p>
                            
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900 mb-2">Pro Tips:</h5>
                              <ul className="space-y-1">
                                {step.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {stepIndex < section.steps.length - 1 && (
                              <div className="flex items-center gap-2 text-sm text-blue-600">
                                <span>Next step</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Start CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Building?
              </h3>
              <p className="text-gray-600 mb-6">
                Put this knowledge into practice and create your first template today
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Building Now
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="text-gray-900 border-gray-300 hover:bg-gray-50">
                  Browse Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StepByStepTutorial;