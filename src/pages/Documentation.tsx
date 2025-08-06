import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Book, Video, MessageCircle, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Documentation: React.FC = () => {
  const sections = [
    { title: 'Getting Started', icon: <Book className="w-6 h-6" />, description: 'Learn the basics of using our platform' },
    { title: 'Video Tutorials', icon: <Video className="w-6 h-6" />, description: 'Watch step-by-step video guides' },
    { title: 'FAQ', icon: <MessageCircle className="w-6 h-6" />, description: 'Find answers to common questions' },
    { title: 'API Reference', icon: <FileText className="w-6 h-6" />, description: 'Technical documentation for developers' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/start-building">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                <ArrowLeft className="w-4 h-4 mr-2" />Back
              </Button>
            </Link>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
            <p className="text-xl text-gray-300">Everything you need to know about using PopSite</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white mr-4">
                      {section.icon}
                    </div>
                    <CardTitle className="text-xl text-white">{section.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">
                    View Section
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;