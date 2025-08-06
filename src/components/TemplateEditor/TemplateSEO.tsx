import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Search, Globe, Image, Code } from 'lucide-react';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  structuredData: string;
}

const TemplateSEO: React.FC = () => {
  const [seoData, setSeoData] = useState<SEOData>({
    title: 'My Awesome Website',
    description: 'A professional website built with PopSite',
    keywords: 'website, business, professional',
    canonicalUrl: 'https://mysite.com',
    ogTitle: 'My Awesome Website',
    ogDescription: 'A professional website built with PopSite',
    ogImage: 'https://mysite.com/og-image.jpg',
    twitterTitle: 'My Awesome Website',
    twitterDescription: 'A professional website built with PopSite',
    twitterImage: 'https://mysite.com/twitter-image.jpg',
    structuredData: '{}'
  });

  const [seoScore, setSeoScore] = useState(75);

  const seoChecks = [
    { name: 'Title Tag', status: 'good', message: 'Title is optimal length (60 chars)' },
    { name: 'Meta Description', status: 'good', message: 'Description is well optimized' },
    { name: 'Keywords', status: 'warning', message: 'Consider adding more relevant keywords' },
    { name: 'Open Graph', status: 'good', message: 'Social media tags are configured' },
    { name: 'Structured Data', status: 'error', message: 'No structured data found' },
    { name: 'Image Alt Text', status: 'warning', message: 'Some images missing alt text' }
  ];

  const handleInputChange = (field: keyof SEOData, value: string) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">SEO Optimization</h2>
        <Button>
          <Search className="w-4 h-4 mr-2" />
          Analyze SEO
        </Button>
      </div>

      {/* SEO Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>SEO Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{seoScore}/100</span>
              <Badge className={seoScore >= 80 ? 'bg-green-500' : seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}>
                {seoScore >= 80 ? 'Excellent' : seoScore >= 60 ? 'Good' : 'Needs Work'}
              </Badge>
            </div>
            <Progress value={seoScore} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Your website's SEO is performing well. Address the issues below to improve your score.
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={seoData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter page title"
                />
                <p className="text-xs text-muted-foreground">
                  {seoData.title.length}/60 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                  id="description"
                  value={seoData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter meta description"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {seoData.description.length}/160 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={seoData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="Enter keywords separated by commas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canonical">Canonical URL</Label>
                <Input
                  id="canonical"
                  value={seoData.canonicalUrl}
                  onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Open Graph (Facebook)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ogTitle">OG Title</Label>
                  <Input
                    id="ogTitle"
                    value={seoData.ogTitle}
                    onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                    placeholder="Open Graph title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ogDescription">OG Description</Label>
                  <Textarea
                    id="ogDescription"
                    value={seoData.ogDescription}
                    onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                    placeholder="Open Graph description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ogImage">OG Image URL</Label>
                  <Input
                    id="ogImage"
                    value={seoData.ogImage}
                    onChange={(e) => handleInputChange('ogImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image className="w-5 h-5" />
                  <span>Twitter Cards</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twitterTitle">Twitter Title</Label>
                  <Input
                    id="twitterTitle"
                    value={seoData.twitterTitle}
                    onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                    placeholder="Twitter title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterDescription">Twitter Description</Label>
                  <Textarea
                    id="twitterDescription"
                    value={seoData.twitterDescription}
                    onChange={(e) => handleInputChange('twitterDescription', e.target.value)}
                    placeholder="Twitter description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterImage">Twitter Image URL</Label>
                  <Input
                    id="twitterImage"
                    value={seoData.twitterImage}
                    onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Structured Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="structuredData">JSON-LD Structured Data</Label>
                <Textarea
                  id="structuredData"
                  value={seoData.structuredData}
                  onChange={(e) => handleInputChange('structuredData', e.target.value)}
                  placeholder='{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company"
}'
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
              <Button variant="outline" size="sm">
                Validate Schema
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(check.status)}
                      <div>
                        <p className="font-medium">{check.name}</p>
                        <p className="text-sm text-muted-foreground">{check.message}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(check.status)}>
                      {check.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          Preview SEO
        </Button>
        <Button>
          Save SEO Settings
        </Button>
      </div>
    </div>
  );
};

export default TemplateSEO;