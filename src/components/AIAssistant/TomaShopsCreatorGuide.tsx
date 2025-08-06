import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Star, Zap, Users, TrendingUp, DollarSign } from 'lucide-react';

interface CreatorFeature {
  title: string;
  description: string;
  icon: React.ElementType;
  benefits: string[];
  tier: 'essential' | 'pro' | 'enterprise';
}

const TomaShopsCreatorGuide: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'essential' | 'pro' | 'enterprise'>('pro');

  const creatorFeatures: CreatorFeature[] = [
    {
      title: 'AI-Powered Store Builder',
      description: 'Create professional e-commerce stores instantly with AI',
      icon: Zap,
      benefits: [
        'Instant store generation from description',
        'Smart product catalog creation',
        'Automated SEO optimization',
        'Mobile-responsive design'
      ],
      tier: 'essential'
    },
    {
      title: 'Advanced Analytics Dashboard',
      description: 'Track performance and optimize your stores',
      icon: TrendingUp,
      benefits: [
        'Real-time sales tracking',
        'Customer behavior insights',
        'Conversion optimization tips',
        'Revenue forecasting'
      ],
      tier: 'pro'
    },
    {
      title: 'Multi-Store Management',
      description: 'Manage multiple client stores from one dashboard',
      icon: Users,
      benefits: [
        'Centralized store management',
        'Client portal access',
        'Bulk operations',
        'White-label solutions'
      ],
      tier: 'pro'
    },
    {
      title: 'Revenue Optimization Suite',
      description: 'Maximize earnings with advanced tools',
      icon: DollarSign,
      benefits: [
        'Dynamic pricing strategies',
        'Upsell automation',
        'Abandoned cart recovery',
        'Loyalty program builder'
      ],
      tier: 'enterprise'
    },
    {
      title: 'Creator Marketplace',
      description: 'Sell your templates and services',
      icon: Star,
      benefits: [
        'Template marketplace listing',
        'Service booking system',
        'Revenue sharing program',
        'Creator community access'
      ],
      tier: 'pro'
    }
  ];

  const pricingTiers = [
    {
      name: 'Essential',
      price: '$29/month',
      description: 'Perfect for getting started',
      features: ['5 AI-generated stores', 'Basic analytics', 'Email support'],
      tier: 'essential' as const
    },
    {
      name: 'Pro Creator',
      price: '$99/month',
      description: 'For serious creators and agencies',
      features: ['Unlimited stores', 'Advanced analytics', 'Multi-store management', 'Priority support'],
      tier: 'pro' as const,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$299/month',
      description: 'For large agencies and enterprises',
      features: ['Everything in Pro', 'White-label solution', 'Custom integrations', 'Dedicated support'],
      tier: 'enterprise' as const
    }
  ];

  const successStories = [
    {
      name: 'Sarah Chen',
      role: 'Digital Agency Owner',
      story: 'Increased client delivery speed by 300% using TomaShops AI',
      revenue: '$50K+ monthly'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Freelance Developer',
      story: 'Built 200+ stores in 6 months, became top-rated creator',
      revenue: '$25K+ monthly'
    },
    {
      name: 'Emma Thompson',
      role: 'E-commerce Consultant',
      story: 'Scaled from solo consultant to 10-person agency',
      revenue: '$100K+ monthly'
    }
  ];

  const filteredFeatures = creatorFeatures.filter(feature => {
    if (selectedTier === 'essential') return feature.tier === 'essential';
    if (selectedTier === 'pro') return ['essential', 'pro'].includes(feature.tier);
    return true; // enterprise gets all features
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Everything You Need as a TomaShops Creator</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Build, manage, and scale your e-commerce business with our comprehensive creator toolkit
        </p>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="success">Success Stories</TabsTrigger>
          <TabsTrigger value="getting-started">Get Started</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <div className="flex justify-center gap-2 mb-6">
            {pricingTiers.map((tier) => (
              <Button
                key={tier.tier}
                variant={selectedTier === tier.tier ? 'default' : 'outline'}
                onClick={() => setSelectedTier(tier.tier)}
                className="relative"
              >
                {tier.name}
                {tier.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500">Popular</Badge>
                )}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="relative">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                      {feature.title}
                      <Badge variant="secondary" className="ml-auto">
                        {feature.tier}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="text-3xl font-bold">{tier.price}</div>
                  <p className="text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                    Choose {tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="success" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{story.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{story.role}</p>
                    <p className="text-sm mb-4 italic">"{story.story}"</p>
                    <Badge className="bg-green-100 text-green-800">
                      {story.revenue}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="getting-started" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Journey to Success</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Sign Up & Learn</h3>
                    <p className="text-sm text-muted-foreground">
                      Create your account and complete our creator onboarding
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Build Your First Store</h3>
                    <p className="text-sm text-muted-foreground">
                      Use our AI tools to create your first professional store
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Scale & Earn</h3>
                    <p className="text-sm text-muted-foreground">
                      Grow your client base and maximize your revenue
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <Button size="lg" className="mr-4">
                    Start Free Trial
                  </Button>
                  <Button variant="outline" size="lg">
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TomaShopsCreatorGuide;