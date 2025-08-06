import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PS</span>
            </div>
            <span className="font-bold text-xl">PopSites</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/template-gallery" className="text-sm font-medium hover:text-blue-600">
              Templates
            </Link>
            <Link to="/features" className="text-sm font-medium hover:text-blue-600">
              Features
            </Link>
            <Link to="/ai-assistant" className="text-sm font-medium hover:text-blue-600 flex items-center gap-1">
              <Brain className="h-4 w-4" />
              AI Assistant
            </Link>
            <Link to="/get-started">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </nav>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;