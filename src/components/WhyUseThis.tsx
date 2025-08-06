import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, Users, Lightbulb, Shield, Rocket } from 'lucide-react';

const WhyUseThis: React.FC = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Save Time",
      description: "Create professional templates in minutes, not hours",
      details: "Our drag-and-drop interface eliminates the need for coding, reducing template creation time by up to 90%."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: "Cost Effective",
      description: "Replace expensive design software and freelancers",
      details: "One platform replaces multiple tools, saving thousands in software licenses and design costs."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team",
      details: "Real-time collaboration features allow multiple team members to work on templates simultaneously."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      title: "No Coding Required",
      description: "Visual editor for non-technical users",
      details: "Anyone can create professional templates without HTML, CSS, or design experience."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Enterprise Security",
      description: "Your templates and data are secure",
      details: "Bank-level encryption and security measures protect your work and sensitive information."
    },
    {
      icon: <Rocket className="w-8 h-8 text-indigo-600" />,
      title: "Instant Publishing",
      description: "Deploy templates immediately",
      details: "Export and publish your templates instantly to web, email, or print formats."
    }
  ];

  const comparisons = [
    {
      feature: "Learning Curve",
      traditional: "Weeks to months",
      ourPlatform: "Minutes to hours",
      advantage: "99% faster to learn"
    },
    {
      feature: "Cost",
      traditional: "$500-2000/month",
      ourPlatform: "$29-99/month",
      advantage: "90% cost savings"
    },
    {
      feature: "Template Creation",
      traditional: "Hours to days",
      ourPlatform: "Minutes",
      advantage: "95% time savings"
    },
    {
      feature: "Collaboration",
      traditional: "File sharing",
      ourPlatform: "Real-time editing",
      advantage: "Seamless teamwork"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the compelling reasons why thousands of users trust our platform for their template creation needs
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">{benefit.icon}</div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
                <CardDescription>{benefit.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">{benefit.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How We Compare</CardTitle>
            <CardDescription>See the difference our platform makes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    <th className="text-left py-3 px-4 font-semibold">Traditional Tools</th>
                    <th className="text-left py-3 px-4 font-semibold">Our Platform</th>
                    <th className="text-left py-3 px-4 font-semibold">Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comparison, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{comparison.feature}</td>
                      <td className="py-3 px-4 text-gray-600">{comparison.traditional}</td>
                      <td className="py-3 px-4 text-green-600 font-medium">{comparison.ourPlatform}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          {comparison.advantage}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Success Stories */}
        <Card>
          <CardHeader>
            <CardTitle>Who Benefits Most?</CardTitle>
            <CardDescription>Success stories from our user base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Small Businesses</h4>
                <p className="text-sm text-gray-600">
                  Create professional marketing materials without hiring expensive designers
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Marketing Teams</h4>
                <p className="text-sm text-gray-600">
                  Rapidly prototype and deploy campaigns with consistent branding
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Freelancers</h4>
                <p className="text-sm text-gray-600">
                  Deliver client projects faster while maintaining high quality standards
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhyUseThis;