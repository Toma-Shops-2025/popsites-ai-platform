import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Zap, Target, Rocket, Users, Globe, ShoppingCart, Camera } from 'lucide-react';

interface AIAdvancedFeaturesProps {
  onFeatureSelect: (feature: string) => void;
}

const AIAdvancedFeatures: React.FC<AIAdvancedFeaturesProps> = ({ onFeatureSelect }) => {
  const features = {
    ecommerce: {
      title: 'E-commerce Builder',
      icon: ShoppingCart,
      description: 'Complete online store with payments, inventory, and analytics',
      capabilities: ['Product Catalog', 'Payment Integration', 'Inventory Management', 'Order Tracking']
    },
    portfolio: {
      title: 'Portfolio Creator',
      icon: Camera,
      description: 'Professional portfolios for creatives and professionals',
      capabilities: ['Gallery Management', 'Client Testimonials', 'Contact Forms', 'SEO Optimization']
    },
    business: {
      title: 'Business Suite',
      icon: Globe,
      description: 'Corporate websites with advanced business features',
      capabilities: ['Team Management', 'Service Booking', 'CRM Integration', 'Analytics Dashboard']
    },
    social: {
      title: 'Social Platform',
      icon: Users,
      description: 'Community and social networking features',
      capabilities: ['User Profiles', 'Social Feed', 'Messaging System', 'Community Tools']
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Advanced AI Features</h2>
        <p className="text-muted-foreground">Unlock powerful capabilities for your PopSites</p>
      </div>

      <Tabs defaultValue="ecommerce" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {Object.entries(features).map(([key, feature]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-2">
              <feature.icon className="h-4 w-4" />
              {feature.title.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(features).map(([key, feature]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5" />
                  {feature.title}
                </CardTitle>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {feature.capabilities.map((capability, index) => (
                      <Badge key={index} variant="secondary">{capability}</Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={() => onFeatureSelect(key)}
                    className="w-full"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Build with {feature.title}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AIAdvancedFeatures;