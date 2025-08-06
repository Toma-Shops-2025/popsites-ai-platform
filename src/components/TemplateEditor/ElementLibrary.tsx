import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Type, Square, Image, Layout, ShoppingCart, Mail, Phone, Calendar } from 'lucide-react';

interface ElementLibraryProps {
  onAddElement: (type: string, config?: any) => void;
}

const ElementLibrary: React.FC<ElementLibraryProps> = ({ onAddElement }) => {
  const basicElements = [
    { type: 'text', icon: Type, label: 'Text', color: 'bg-blue-500' },
    { type: 'button', icon: Square, label: 'Button', color: 'bg-green-500' },
    { type: 'image', icon: Image, label: 'Image', color: 'bg-purple-500' },
    { type: 'container', icon: Layout, label: 'Container', color: 'bg-gray-500' }
  ];

  const ecommerceElements = [
    { type: 'product-card', icon: ShoppingCart, label: 'Product Card', color: 'bg-orange-500' },
    { type: 'cart-button', icon: ShoppingCart, label: 'Add to Cart', color: 'bg-red-500' },
    { type: 'price-display', icon: Square, label: 'Price', color: 'bg-yellow-500' }
  ];

  const contactElements = [
    { type: 'contact-form', icon: Mail, label: 'Contact Form', color: 'bg-indigo-500' },
    { type: 'phone-number', icon: Phone, label: 'Phone', color: 'bg-teal-500' },
    { type: 'booking-form', icon: Calendar, label: 'Booking', color: 'bg-pink-500' }
  ];

  const renderElementGroup = (title: string, elements: any[]) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
      <div className="space-y-2">
        {elements.map((element) => {
          const Icon = element.icon;
          return (
            <Button
              key={element.type}
              variant="outline"
              className="w-full justify-start border-white/20 text-white hover:bg-white/10"
              onClick={() => onAddElement(element.type)}
            >
              <div className={`w-4 h-4 rounded mr-2 ${element.color} flex items-center justify-center`}>
                <Icon className="w-3 h-3 text-white" />
              </div>
              {element.label}
            </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">Elements</CardTitle>
      </CardHeader>
      <CardContent>
        {renderElementGroup('Basic', basicElements)}
        {renderElementGroup('E-commerce', ecommerceElements)}
        {renderElementGroup('Contact', contactElements)}
      </CardContent>
    </Card>
  );
};

export default ElementLibrary;