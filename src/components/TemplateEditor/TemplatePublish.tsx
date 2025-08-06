import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Rocket, Settings, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PublishSettings {
  domain: string;
  subdomain: string;
  customDomain?: string;
  seoTitle: string;
  seoDescription: string;
  analytics: boolean;
  password?: string;
}

interface TemplatePublishProps {
  template: any;
  onPublish: (settings: PublishSettings) => void;
  publishStatus?: 'draft' | 'publishing' | 'published' | 'error';
}

const TemplatePublish: React.FC<TemplatePublishProps> = ({ template, onPublish, publishStatus = 'draft' }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<PublishSettings>({
    domain: 'mysite',
    subdomain: 'builderapp.com',
    seoTitle: 'My Website',
    seoDescription: 'Built with Website Builder',
    analytics: true
  });

  const [isPublishing, setIsPublishing] = useState(false);

  const getStatusIcon = () => {
    switch (publishStatus) {
      case 'published': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'publishing': return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Globe className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (publishStatus) {
      case 'published': return 'Published';
      case 'publishing': return 'Publishing...';
      case 'error': return 'Error';
      default: return 'Draft';
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      onPublish(settings);
      toast({ title: 'Site Published!', description: `Your site is live at ${settings.domain}.${settings.subdomain}` });
    } catch (error) {
      toast({ title: 'Publish Failed', description: 'Please try again', variant: 'destructive' });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Rocket className="w-4 h-4 mr-2" />
          Publish
          <Badge variant="secondary" className="ml-2">
            {getStatusIcon()}
            <span className="ml-1">{getStatusText()}</span>
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Publish Your Website</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="domain" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="domain">Domain</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="domain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Choose Your Domain</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Free Subdomain</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={settings.domain}
                      onChange={(e) => setSettings({...settings, domain: e.target.value})}
                      placeholder="mysite"
                    />
                    <span className="text-gray-500">.builderapp.com</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Your site will be available at: {settings.domain}.builderapp.com</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Custom Domain (Pro)</label>
                  <Input
                    value={settings.customDomain || ''}
                    onChange={(e) => setSettings({...settings, customDomain: e.target.value})}
                    placeholder="www.mysite.com"
                    disabled
                  />
                  <p className="text-sm text-gray-600 mt-1">Upgrade to Pro to use your own domain</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Page Title</label>
                  <Input
                    value={settings.seoTitle}
                    onChange={(e) => setSettings({...settings, seoTitle: e.target.value})}
                    placeholder="My Awesome Website"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <Textarea
                    value={settings.seoDescription}
                    onChange={(e) => setSettings({...settings, seoDescription: e.target.value})}
                    placeholder="Describe your website for search engines..."
                    rows={3}
                  />
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">SEO Preview</h4>
                  <div className="space-y-1">
                    <div className="text-blue-600 text-lg">{settings.seoTitle}</div>
                    <div className="text-green-600 text-sm">{settings.domain}.builderapp.com</div>
                    <div className="text-gray-600 text-sm">{settings.seoDescription}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium">Google Analytics</label>
                    <p className="text-sm text-gray-600">Track your website visitors</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(e) => setSettings({...settings, analytics: e.target.checked})}
                    className="w-4 h-4"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Password Protection (Optional)</label>
                  <Input
                    type="password"
                    value={settings.password || ''}
                    onChange={(e) => setSettings({...settings, password: e.target.value})}
                    placeholder="Leave empty for public access"
                  />
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium mb-2">Publishing Checklist</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Template design complete</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Content added</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>SEO settings configured</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline">Save Draft</Button>
          <Button 
            onClick={handlePublish}
            disabled={isPublishing || publishStatus === 'publishing'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPublishing ? 'Publishing...' : 'Publish Now'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePublish;