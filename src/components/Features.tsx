import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Rocket, Heart, Star, Globe, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized platform",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Secure & Safe",
      description: "Your data is protected with enterprise-grade security measures",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-500" />,
      title: "Easy to Use",
      description: "Intuitive interface designed for users of all skill levels",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Made with Love",
      description: "Crafted with passion and attention to every detail",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: <Star className="w-8 h-8 text-green-500" />,
      title: "Premium Quality",
      description: "Top-tier features and functionality you can rely on",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-500" />,
      title: "Global Reach",
      description: "Connect with users worldwide through our platform",
      color: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-lg font-semibold mb-6 animate-pulse">
            <Gift className="w-5 h-5 mr-2" />
            Try All Features Free for 14 Days
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Platform</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover the features that make us stand out from the competition
          </p>
          
          <Link to="/get-started">
            <Button className="px-8 py-3 text-lg font-semibold rounded-full">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link key={index} to="/features" className="block">
              <Card clickable className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm mb-4">
            No credit card required • Cancel anytime • Full access to all Pro features
          </p>
          <Link to="/create-account">
            <Button>
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;