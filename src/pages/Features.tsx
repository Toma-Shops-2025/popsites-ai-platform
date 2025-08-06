import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Zap, Shield, Rocket, Heart, Star, Globe, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized platform",
      details: ["Sub-second load times", "Real-time updates", "Optimized for all devices"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Secure & Safe",
      description: "Your data is protected with enterprise-grade security measures",
      details: ["End-to-end encryption", "GDPR compliant", "Regular security audits"]
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-500" />,
      title: "Easy to Use",
      description: "Intuitive interface designed for users of all skill levels",
      details: ["Drag & drop builder", "No coding required", "Comprehensive tutorials"]
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Made with Love",
      description: "Crafted with passion and attention to every detail",
      details: ["User-centered design", "Continuous improvements", "Community feedback"]
    },
    {
      icon: <Star className="w-8 h-8 text-green-500" />,
      title: "Premium Quality",
      description: "Top-tier features and functionality you can rely on",
      details: ["99.9% uptime guarantee", "24/7 support", "Regular feature updates"]
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-500" />,
      title: "Global Reach",
      description: "Connect with users worldwide through our platform",
      details: ["Multi-language support", "Global CDN", "Worldwide accessibility"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Platform <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Features</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all the powerful features that make our platform the best choice for your digital needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </CardDescription>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link to="/get-started">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
              Try These Features Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;