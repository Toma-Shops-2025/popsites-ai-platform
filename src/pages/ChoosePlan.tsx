import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChoosePlan: React.FC = () => {
  const plans = [
    {
      name: 'Free Trial',
      price: '$0',
      period: '14 days',
      features: ['All Pro features', 'Unlimited websites', 'AI Assistant', 'Priority support', 'All templates'],
      badge: 'Most Popular',
      description: 'Try everything free for 2 weeks'
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      features: ['All templates', 'Unlimited websites', 'Priority support', 'AI Assistant', 'Advanced analytics'],
      description: 'Perfect for professionals'
    },
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Basic templates', '1 website', 'Community support'],
      description: 'Get started for free'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <Link to="/create-account">
          <Button className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-300">Start with a 14-day free trial - no credit card required</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Link key={index} to="/template-gallery">
              <Card clickable className={`bg-white/10 backdrop-blur-sm border-white/20 relative ${plan.badge ? 'ring-2 ring-pink-500 scale-105' : ''}`}>
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-white">
                    {plan.price}
                    <span className="text-lg">/{plan.period}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">
                    {plan.name === 'Free Trial' ? 'Start Free Trial' : `Choose ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-300 text-sm">
            Free trial includes all Pro features. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;