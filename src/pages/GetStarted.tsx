import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Rocket, Gift, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetStarted: React.FC = () => {
  const steps = [
    {
      title: "Start Your Free Trial",
      description: "Get full access to all Pro features for 14 days - no credit card required",
      completed: false,
      link: "/create-account",
      highlight: true
    },
    {
      title: "Explore Templates",
      description: "Browse our extensive library of professional templates",
      completed: false,
      link: "/template-gallery"
    },
    {
      title: "Build Your Website",
      description: "Use our AI-powered editor to create stunning websites",
      completed: false,
      link: "/start-building"
    }
  ];

  const trialFeatures = [
    "All Pro templates and features",
    "AI-powered website builder",
    "Unlimited websites",
    "Priority support",
    "Advanced analytics",
    "No credit card required"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-lg font-semibold mb-6 animate-pulse">
            <Gift className="w-5 h-5 mr-2" />
            14-Day Free Trial Available
          </Badge>
          
          <div className="flex items-center justify-center mb-6">
            <Rocket className="w-12 h-12 text-yellow-400 animate-bounce" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Get Started <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Today</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start your free trial and experience everything we have to offer
          </p>
        </div>
        
        {/* Trial Features */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-center">What's Included in Your Free Trial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {trialFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  {feature}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 mb-12">
          {steps.map((step, index) => (
            <Link key={index} to={step.link}>
              <Card className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group ${
                step.highlight ? 'ring-2 ring-green-500' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform ${
                      step.highlight ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-pink-500 to-purple-600'
                    }`}>
                      {index + 1}
                    </div>
                    <CardTitle className="text-white group-hover:text-purple-200 transition-colors">{step.title}</CardTitle>
                    {step.highlight && (
                      <Badge className="ml-auto bg-green-500 text-white">Free</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 ml-12 group-hover:text-gray-200 transition-colors">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/create-account">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
              Start Your Free Trial Now
            </Button>
          </Link>
          <p className="text-gray-400 text-sm mt-4">
            No credit card required • Cancel anytime • Full access to Pro features
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;