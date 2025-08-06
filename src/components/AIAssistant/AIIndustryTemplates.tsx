import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Store, Briefcase, Heart, GraduationCap, Utensils, Car, Home, Music } from 'lucide-react';

interface AIIndustryTemplatesProps {
  onTemplateSelect: (template: any) => void;
}

const AIIndustryTemplates: React.FC<AIIndustryTemplatesProps> = ({ onTemplateSelect }) => {
  const industries = [
    {
      id: 'retail',
      name: 'Retail & E-commerce',
      icon: Store,
      color: 'bg-blue-500',
      templates: [
        { name: 'Fashion Store', features: ['Product Catalog', 'Size Guide', 'Wishlist'] },
        { name: 'Electronics Shop', features: ['Tech Specs', 'Reviews', 'Comparisons'] },
        { name: 'Marketplace', features: ['Multi-vendor', 'Ratings', 'Advanced Search'] }
      ]
    },
    {
      id: 'business',
      name: 'Professional Services',
      icon: Briefcase,
      color: 'bg-green-500',
      templates: [
        { name: 'Consulting Firm', features: ['Team Profiles', 'Case Studies', 'Booking'] },
        { name: 'Law Office', features: ['Practice Areas', 'Testimonials', 'Contact Forms'] },
        { name: 'Agency Portfolio', features: ['Project Gallery', 'Client List', 'Process'] }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Wellness',
      icon: Heart,
      color: 'bg-red-500',
      templates: [
        { name: 'Medical Practice', features: ['Appointments', 'Services', 'Insurance'] },
        { name: 'Fitness Studio', features: ['Class Schedule', 'Trainers', 'Membership'] },
        { name: 'Wellness Blog', features: ['Health Tips', 'Nutrition', 'Community'] }
      ]
    },
    {
      id: 'education',
      name: 'Education & Training',
      icon: GraduationCap,
      color: 'bg-purple-500',
      templates: [
        { name: 'Online Courses', features: ['Video Lessons', 'Progress Tracking', 'Certificates'] },
        { name: 'School Website', features: ['Admissions', 'Events', 'Parent Portal'] },
        { name: 'Tutoring Service', features: ['Subject Areas', 'Scheduling', 'Resources'] }
      ]
    },
    {
      id: 'food',
      name: 'Food & Beverage',
      icon: Utensils,
      color: 'bg-orange-500',
      templates: [
        { name: 'Restaurant', features: ['Menu', 'Reservations', 'Online Ordering'] },
        { name: 'Food Delivery', features: ['Order Tracking', 'Multiple Restaurants', 'Reviews'] },
        { name: 'Recipe Blog', features: ['Recipe Cards', 'Nutrition Info', 'Shopping Lists'] }
      ]
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: Car,
      color: 'bg-gray-500',
      templates: [
        { name: 'Car Dealership', features: ['Inventory', 'Financing', 'Test Drives'] },
        { name: 'Auto Repair', features: ['Services', 'Estimates', 'Appointments'] },
        { name: 'Car Rental', features: ['Fleet Management', 'Booking', 'Insurance'] }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Industry Templates</h2>
        <p className="text-muted-foreground">Choose from professional templates tailored to your industry</p>
      </div>

      <ScrollArea className="h-96">
        <div className="grid gap-4">
          {industries.map((industry) => (
            <Card key={industry.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${industry.color} text-white`}>
                    <industry.icon className="h-5 w-5" />
                  </div>
                  {industry.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {industry.templates.map((template, index) => (
                    <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Button 
                          size="sm" 
                          onClick={() => onTemplateSelect({ ...template, industry: industry.name })}
                        >
                          Use Template
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AIIndustryTemplates;