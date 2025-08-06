import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Code, Palette, Zap, Globe, ShoppingCart, Users, Building } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  examples: number;
  confidence: number;
  tags: string[];
}

export const AIAdvancedKnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const knowledgeBase: KnowledgeItem[] = [
    {
      id: '1',
      title: 'E-commerce Store Layouts',
      category: 'ecommerce',
      description: 'Product grids, shopping carts, checkout flows, payment integration',
      examples: 450,
      confidence: 98,
      tags: ['shopify', 'woocommerce', 'stripe', 'paypal']
    },
    {
      id: '2',
      title: 'Restaurant Website Features',
      category: 'business',
      description: 'Menu displays, online ordering, reservation systems, location maps',
      examples: 320,
      confidence: 95,
      tags: ['menu', 'ordering', 'reservations', 'food']
    },
    {
      id: '3',
      title: 'Portfolio Showcase Designs',
      category: 'portfolio',
      description: 'Image galleries, project details, skill displays, contact forms',
      examples: 280,
      confidence: 92,
      tags: ['gallery', 'projects', 'creative', 'showcase']
    },
    {
      id: '4',
      title: 'Landing Page Conversions',
      category: 'marketing',
      description: 'Hero sections, CTAs, testimonials, lead capture forms',
      examples: 380,
      confidence: 96,
      tags: ['conversion', 'cta', 'leads', 'marketing']
    },
    {
      id: '5',
      title: 'Real Estate Listings',
      category: 'business',
      description: 'Property cards, search filters, virtual tours, agent profiles',
      examples: 190,
      confidence: 89,
      tags: ['properties', 'search', 'tours', 'agents']
    },
    {
      id: '6',
      title: 'Healthcare Practice Sites',
      category: 'business',
      description: 'Appointment booking, service descriptions, doctor profiles, patient forms',
      examples: 150,
      confidence: 87,
      tags: ['appointments', 'medical', 'doctors', 'patients']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe, count: knowledgeBase.length },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, count: knowledgeBase.filter(k => k.category === 'ecommerce').length },
    { id: 'business', name: 'Business', icon: Building, count: knowledgeBase.filter(k => k.category === 'business').length },
    { id: 'portfolio', name: 'Portfolio', icon: Users, count: knowledgeBase.filter(k => k.category === 'portfolio').length },
    { id: 'marketing', name: 'Marketing', icon: Zap, count: knowledgeBase.filter(k => k.category === 'marketing').length }
  ];

  const filteredKnowledge = knowledgeBase.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-600';
    if (confidence >= 90) return 'text-blue-600';
    if (confidence >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            AI Knowledge Base
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive knowledge for building any type of website
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search knowledge base..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
            
            <div className="grid gap-4">
              {filteredKnowledge.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Code className="h-4 w-4" />
                            {item.examples} examples
                          </span>
                          <span className={`flex items-center gap-1 font-medium ${getConfidenceColor(item.confidence)}`}>
                            <Zap className="h-4 w-4" />
                            {item.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      
                      <Badge 
                        variant="secondary"
                        className="capitalize"
                      >
                        {item.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredKnowledge.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No knowledge found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};