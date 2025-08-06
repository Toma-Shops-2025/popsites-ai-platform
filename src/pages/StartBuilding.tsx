import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Rocket, Zap, Crown, Sparkles, Check, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StartBuilding: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEditorChoice = (editorType: string, path: string) => {
    toast({ 
      title: `Opening ${editorType}`, 
      description: 'Loading your website builder...' 
    });
    setTimeout(() => navigate(path), 1000);
  };

  const editorTiers = [
    {
      name: 'Basic Editor',
      icon: <Rocket className="w-8 h-8" />,
      description: 'Perfect for beginners and simple websites',
      path: '/template-editor',
      badge: 'Free',
      badgeColor: 'bg-green-500',
      features: [
        { name: 'Drag & Drop Builder', included: true },
        { name: 'Basic Templates', included: true },
        { name: 'Mobile Responsive', included: true },
        { name: 'Basic Customization', included: true },
        { name: 'AI Assistant', included: true },
        { name: 'Advanced Elements', included: false },
        { name: 'Version Control', included: false },
        { name: 'Team Collaboration', included: false },
        { name: 'Analytics Dashboard', included: false },
        { name: 'SEO Tools', included: false }
      ]
    },
    {
      name: 'Enhanced Editor',
      icon: <Zap className="w-8 h-8" />,
      description: 'Advanced features for professional websites',
      path: '/enhanced-editor',
      badge: 'Pro',
      badgeColor: 'bg-blue-500',
      features: [
        { name: 'Drag & Drop Builder', included: true },
        { name: 'Premium Templates', included: true },
        { name: 'Mobile Responsive', included: true },
        { name: 'Advanced Customization', included: true },
        { name: 'AI Assistant', included: true },
        { name: 'Advanced Elements', included: true },
        { name: 'Template Presets', included: true },
        { name: 'Responsive Preview', included: true },
        { name: 'Team Collaboration', included: false },
        { name: 'Analytics Dashboard', included: false }
      ]
    },
    {
      name: 'Advanced Editor',
      icon: <Crown className="w-8 h-8" />,
      description: 'Enterprise-grade tools for teams',
      path: '/advanced-editor',
      badge: 'Enterprise',
      badgeColor: 'bg-purple-500',
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Team Collaboration', included: true },
        { name: 'Version Control', included: true },
        { name: 'Export Options', included: true },
        { name: 'One-Click Publishing', included: true },
        { name: 'Custom Domains', included: true },
        { name: 'Advanced SEO', included: false },
        { name: 'Analytics Dashboard', included: false },
        { name: 'Third-party Integrations', included: false },
        { name: 'White-label Options', included: false }
      ]
    },
    {
      name: 'Professional Editor',
      icon: <Sparkles className="w-8 h-8" />,
      description: 'Ultimate website building experience',
      path: '/professional-editor',
      badge: 'Ultimate',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      features: [
        { name: 'Everything in Enterprise', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'SEO Optimization Tools', included: true },
        { name: 'Third-party Integrations', included: true },
        { name: 'Custom Code Injection', included: true },
        { name: 'White-label Options', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Custom Training', included: true },
        { name: 'API Access', included: true },
        { name: 'Unlimited Everything', included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                <ArrowLeft className="w-4 h-4 mr-2" />Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Choose Your Editor</h1>
            <p className="text-xl text-gray-300 mb-8">
              Select the perfect editor for your needs - from simple to enterprise-grade
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {editorTiers.map((tier, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 relative overflow-hidden">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
                      {tier.icon}
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <CardTitle className="text-lg text-white mr-2">{tier.name}</CardTitle>
                    <Badge className={`${tier.badgeColor} text-white text-xs`}>
                      {tier.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300 text-sm">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {tier.features.slice(0, 6).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => handleEditorChoice(tier.name, tier.path)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    Start Building
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Buttons */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Start Options</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => navigate('/template-gallery')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Browse Templates
              </Button>
              <Button 
                onClick={() => navigate('/template-gallery?category=ecommerce')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                E-commerce Templates
              </Button>
              <Button 
                onClick={() => navigate('/documentation')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StartBuilding;