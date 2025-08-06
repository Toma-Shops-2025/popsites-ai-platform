import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, Briefcase, User, Coffee, GraduationCap, Heart } from 'lucide-react';

interface TemplatePresetsProps {
  onLoadTemplate: (template: any) => void;
}

const TemplatePresets: React.FC<TemplatePresetsProps> = ({ onLoadTemplate }) => {
  const templates = [
    {
      id: 'ecommerce-basic',
      name: 'E-commerce Store',
      icon: Store,
      category: 'E-commerce',
      description: 'Complete online store with product showcase',
      elements: [
        { type: 'text', content: 'Welcome to Our Store', x: 50, y: 50, style: { fontSize: '32px', fontWeight: 'bold' } },
        { type: 'product-card', content: 'Featured Product', x: 50, y: 120 },
        { type: 'cart-button', content: 'Add to Cart', x: 200, y: 180 },
        { type: 'contact-form', content: 'Contact Us', x: 50, y: 250 }
      ]
    },
    {
      id: 'business-landing',
      name: 'Business Landing',
      icon: Briefcase,
      category: 'Business',
      description: 'Professional business presentation',
      elements: [
        { type: 'text', content: 'Your Business Solution', x: 50, y: 50, style: { fontSize: '28px', fontWeight: 'bold' } },
        { type: 'text', content: 'We provide exceptional services', x: 50, y: 100 },
        { type: 'button', content: 'Get Started', x: 50, y: 150 },
        { type: 'contact-form', content: 'Contact Form', x: 50, y: 200 }
      ]
    },
    {
      id: 'portfolio-creative',
      name: 'Creative Portfolio',
      icon: User,
      category: 'Portfolio',
      description: 'Showcase your creative work',
      elements: [
        { type: 'text', content: 'Creative Portfolio', x: 50, y: 50, style: { fontSize: '30px', fontWeight: 'bold' } },
        { type: 'image', content: 'Portfolio Image', x: 50, y: 100 },
        { type: 'text', content: 'About Me', x: 200, y: 100 },
        { type: 'button', content: 'View Work', x: 200, y: 150 }
      ]
    },
    {
      id: 'restaurant-menu',
      name: 'Restaurant Menu',
      icon: Coffee,
      category: 'Restaurant',
      description: 'Digital menu and ordering system',
      elements: [
        { type: 'text', content: 'Our Menu', x: 50, y: 50, style: { fontSize: '28px', fontWeight: 'bold' } },
        { type: 'text', content: 'Delicious Appetizers', x: 50, y: 100 },
        { type: 'text', content: 'Main Courses', x: 50, y: 150 },
        { type: 'booking-form', content: 'Reserve Table', x: 200, y: 100 }
      ]
    },
    {
      id: 'education-course',
      name: 'Online Course',
      icon: GraduationCap,
      category: 'Education',
      description: 'Educational content platform',
      elements: [
        { type: 'text', content: 'Learn with Us', x: 50, y: 50, style: { fontSize: '28px', fontWeight: 'bold' } },
        { type: 'text', content: 'Course Description', x: 50, y: 100 },
        { type: 'button', content: 'Enroll Now', x: 50, y: 150 },
        { type: 'text', content: 'Course Features', x: 200, y: 100 }
      ]
    },
    {
      id: 'nonprofit-charity',
      name: 'Nonprofit Organization',
      icon: Heart,
      category: 'Nonprofit',
      description: 'Charity and donation platform',
      elements: [
        { type: 'text', content: 'Make a Difference', x: 50, y: 50, style: { fontSize: '28px', fontWeight: 'bold' } },
        { type: 'text', content: 'Our Mission', x: 50, y: 100 },
        { type: 'button', content: 'Donate Now', x: 50, y: 150 },
        { type: 'contact-form', content: 'Get Involved', x: 200, y: 100 }
      ]
    }
  ];

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">Template Presets</CardTitle>
        <p className="text-gray-400 text-sm">Quick start with pre-built templates</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-2">{category}</h3>
              <div className="space-y-2">
                {templates.filter(t => t.category === category).map(template => {
                  const Icon = template.icon;
                  return (
                    <div key={template.id} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-blue-400" />
                          <span className="text-white font-medium text-sm">{template.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-xs mb-3">{template.description}</p>
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => onLoadTemplate(template)}
                      >
                        Load Template
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplatePresets;