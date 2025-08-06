import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Gift, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateAccount: React.FC = () => {
  const trialBenefits = [
    'Full access to all Pro features',
    'Unlimited websites',
    'AI-powered tools',
    'Priority support'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Benefits */}
        <div className="text-center md:text-left">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-lg font-semibold mb-6 animate-pulse">
            <Gift className="w-5 h-5 mr-2" />
            14-Day Free Trial
          </Badge>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            No credit card required. Cancel anytime.
          </p>
          
          <div className="space-y-3">
            {trialBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-3" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - Form */}
        <Card className="w-full bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <Link to="/get-started">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <CardTitle className="text-2xl text-white text-center">Create Your Account</CardTitle>
            <p className="text-gray-300 text-center text-sm">
              Start your 14-day free trial instantly
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input id="name" type="text" placeholder="Enter your full name" className="bg-white/10 border-white/20 text-white placeholder-gray-400" />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" className="bg-white/10 border-white/20 text-white placeholder-gray-400" />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" className="bg-white/10 border-white/20 text-white placeholder-gray-400" />
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-green-300 text-sm text-center">
                ✓ Your 14-day free trial starts immediately
              </p>
            </div>
            
            <Link to="/choose-plan">
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 text-lg font-semibold">
                Start Free Trial
              </Button>
            </Link>
            
            <p className="text-gray-400 text-xs text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateAccount;