import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Zap, Shield, Users, Rocket } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const LearnMore: React.FC = () => {
  const features = [
    { title: 'Lightning Fast', icon: <Zap className="w-8 h-8" />, description: 'Build and deploy sites in minutes, not hours' },
    { title: 'Secure & Reliable', icon: <Shield className="w-8 h-8" />, description: 'Enterprise-grade security and 99.9% uptime' },
    { title: 'Team Collaboration', icon: <Users className="w-8 h-8" />, description: 'Work together with your team in real-time' },
    { title: 'Easy to Scale', icon: <Rocket className="w-8 h-8" />, description: 'Grow your site as your business grows' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                <ArrowLeft className="w-4 h-4 mr-2" />Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose PopSite?</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">We're revolutionizing how websites are built. Fast, secure, and incredibly easy to use.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link to="/get-started">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-full">
                Start Building Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnMore;