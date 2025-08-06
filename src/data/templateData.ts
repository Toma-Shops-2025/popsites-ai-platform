export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  downloads: number;
  likes: number;
  tags: string[];
  isPremium: boolean;
  features: string[];
  demoUrl?: string;
}

export const templateData: Template[] = [
  {
    id: 'business-portfolio-1',
    name: 'Executive Portfolio',
    category: 'Business',
    description: 'Professional portfolio template perfect for executives and business professionals.',
    image: '/placeholder.svg',
    rating: 4.8,
    downloads: 1250,
    likes: 89,
    tags: ['Professional', 'Corporate', 'Responsive', 'Modern'],
    isPremium: true,
    features: [
      'Professional layout design',
      'Contact form integration',
      'Portfolio showcase',
      'Testimonials section',
      'Social media integration'
    ],
    demoUrl: 'https://example.com/demo1'
  },
  {
    id: 'ecommerce-fashion-1',
    name: 'Fashion Boutique',
    category: 'E-commerce',
    description: 'Elegant e-commerce template designed for fashion and clothing stores.',
    image: '/placeholder.svg',
    rating: 4.9,
    downloads: 2100,
    likes: 156,
    tags: ['E-commerce', 'Fashion', 'Minimalist', 'Mobile-First'],
    isPremium: true,
    features: [
      'Product catalog',
      'Shopping cart functionality',
      'Secure checkout',
      'Inventory management',
      'Customer reviews'
    ]
  },
  {
    id: 'creative-studio-1',
    name: 'Creative Agency',
    category: 'Creative',
    description: 'Bold and creative template for design agencies and creative professionals.',
    image: '/placeholder.svg',
    rating: 4.7,
    downloads: 890,
    likes: 67,
    tags: ['Creative', 'Colorful', 'Animation', 'Portfolio'],
    isPremium: false,
    features: [
      'Creative layouts',
      'Animation effects',
      'Project showcase',
      'Team profiles',
      'Client testimonials'
    ]
  },
  {
    id: 'tech-startup-1',
    name: 'SaaS Landing',
    category: 'Technology',
    description: 'Modern landing page template for SaaS products and tech startups.',
    image: '/placeholder.svg',
    rating: 4.6,
    downloads: 1500,
    likes: 112,
    tags: ['Technology', 'SaaS', 'Modern', 'Conversion'],
    isPremium: true,
    features: [
      'Conversion optimized',
      'Feature highlights',
      'Pricing tables',
      'Customer testimonials',
      'Call-to-action sections'
    ]
  },
  {
    id: 'blog-personal-1',
    name: 'Personal Blog',
    category: 'Blog',
    description: 'Clean and minimal blog template for personal blogging and content creation.',
    image: '/placeholder.svg',
    rating: 4.5,
    downloads: 750,
    likes: 45,
    tags: ['Blog', 'Minimalist', 'Typography', 'SEO'],
    isPremium: false,
    features: [
      'Blog post layouts',
      'Comment system',
      'Social sharing',
      'SEO optimized',
      'Newsletter signup'
    ]
  },
  {
    id: 'portfolio-photo-1',
    name: 'Photography Portfolio',
    category: 'Portfolio',
    description: 'Stunning portfolio template designed specifically for photographers.',
    image: '/placeholder.svg',
    rating: 4.8,
    downloads: 950,
    likes: 78,
    tags: ['Photography', 'Portfolio', 'Gallery', 'Responsive'],
    isPremium: true,
    features: [
      'Image galleries',
      'Lightbox functionality',
      'Client proofing',
      'Booking system',
      'Print shop integration'
    ]
  },
  {
    id: 'restaurant-1',
    name: 'Fine Dining',
    category: 'Food',
    description: 'Elegant restaurant template with menu showcase and reservation system.',
    image: '/placeholder.svg',
    rating: 4.7,
    downloads: 680,
    likes: 52,
    tags: ['Restaurant', 'Food', 'Elegant', 'Reservations'],
    isPremium: false,
    features: [
      'Menu display',
      'Online reservations',
      'Location map',
      'Chef profiles',
      'Event booking'
    ]
  },
  {
    id: 'music-band-1',
    name: 'Music Band',
    category: 'Entertainment',
    description: 'Dynamic template for music bands and entertainment professionals.',
    image: '/placeholder.svg',
    rating: 4.6,
    downloads: 420,
    likes: 34,
    tags: ['Music', 'Entertainment', 'Dark Mode', 'Audio'],
    isPremium: false,
    features: [
      'Music player',
      'Tour dates',
      'Merchandise store',
      'Fan club signup',
      'Social media feeds'
    ]
  }
];

export const getTemplatesByCategory = (category: string): Template[] => {
  if (category === 'All Categories') return templateData;
  return templateData.filter(template => template.category === category);
};

export const searchTemplates = (query: string): Template[] => {
  const lowercaseQuery = query.toLowerCase();
  return templateData.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getTemplateById = (id: string): Template | undefined => {
  return templateData.find(template => template.id === id);
};