import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Users, Zap, Target, Globe, Palette } from 'lucide-react';

const DetailedGuide: React.FC = () => {
  const capabilities = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Visual Template Editor",
      description: "Drag-and-drop interface for creating professional templates"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Platform Export",
      description: "Export templates for web, mobile, and print formats"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Share and collaborate on templates with your team"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Preview",
      description: "See changes instantly as you build your templates"
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up for free and access the template editor",
      details: "Click 'Get Started' and fill out the registration form. Verify your email to activate your account."
    },
    {
      step: 2,
      title: "Choose a Template",
      description: "Browse our gallery or start from scratch",
      details: "Visit the Template Gallery to browse pre-made templates or click 'Start Building' for a blank canvas."
    },
    {
      step: 3,
      title: "Design Your Template",
      description: "Use our visual editor to customize your design",
      details: "Add text, images, buttons, and shapes. Drag elements to position them and use the property panel to customize."
    },
    {
      step: 4,
      title: "Preview & Export",
      description: "Test your template and export in your preferred format",
      details: "Use the preview mode to test your template, then export as HTML, PDF, or image formats."
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Platform Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover everything our template builder can do and learn how to master every feature
          </p>
        </div>

        {/* What This Site Is */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              What Is This Platform?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform is a comprehensive visual template builder designed to empower users to create professional-quality templates without coding knowledge. Whether you're a designer, marketer, small business owner, or developer, our intuitive drag-and-drop interface makes template creation accessible to everyone.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Built with modern web technologies, our platform combines the power of professional design tools with the simplicity of visual editing, allowing you to create everything from landing pages and email templates to marketing materials and web components.
            </p>
          </CardContent>
        </Card>

        {/* Capabilities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Platform Capabilities</CardTitle>
            <CardDescription>Everything you can accomplish with our tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">{capability.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{capability.title}</h4>
                    <p className="text-gray-600 text-sm">{capability.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Can You Build?</CardTitle>
            <CardDescription>Real-world applications and use cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center py-2">Business</Badge>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Landing pages</li>
                  <li>• Email templates</li>
                  <li>• Marketing materials</li>
                  <li>• Business cards</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center py-2">Creative</Badge>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Portfolio layouts</li>
                  <li>• Event invitations</li>
                  <li>• Social media posts</li>
                  <li>• Presentations</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center py-2">Technical</Badge>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Web components</li>
                  <li>• UI mockups</li>
                  <li>• Dashboard layouts</li>
                  <li>• App interfaces</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step by Step Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Step-by-Step Guide</CardTitle>
            <CardDescription>Master the platform from start to finish</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 mb-2">{step.description}</p>
                      <p className="text-sm text-gray-500">{step.details}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  </div>
                  {index < steps.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailedGuide;