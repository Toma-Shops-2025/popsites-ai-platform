import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MessageSquare, BarChart3, CreditCard, ShoppingCart, Users, Zap, Settings } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  connected: boolean;
  category: string;
  settings?: { [key: string]: any };
}

const TemplateIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Track website traffic and user behavior',
      connected: true,
      category: 'Analytics',
      settings: { trackingId: 'GA-123456789' }
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      icon: <Mail className="w-5 h-5" />,
      description: 'Email marketing and newsletter management',
      connected: false,
      category: 'Marketing'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Accept payments and manage subscriptions',
      connected: true,
      category: 'Payments',
      settings: { publishableKey: 'pk_test_...' }
    },
    {
      id: 'shopify',
      name: 'Shopify',
      icon: <ShoppingCart className="w-5 h-5" />,
      description: 'E-commerce platform integration',
      connected: false,
      category: 'E-commerce'
    },
    {
      id: 'intercom',
      name: 'Intercom',
      icon: <MessageSquare className="w-5 h-5" />,
      description: 'Customer messaging and support',
      connected: false,
      category: 'Support'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      icon: <Users className="w-5 h-5" />,
      description: 'CRM and marketing automation',
      connected: false,
      category: 'CRM'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      icon: <Zap className="w-5 h-5" />,
      description: 'Connect with 3000+ apps and automate workflows',
      connected: true,
      category: 'Automation'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Analytics', 'Marketing', 'Payments', 'E-commerce', 'Support', 'CRM', 'Automation'];

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
  };

  const filteredIntegrations = selectedCategory === 'All' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Integrations</h2>
          <p className="text-muted-foreground">
            {connectedCount} of {integrations.length} integrations connected
          </p>
        </div>
        <Button>
          <Settings className="w-4 h-4 mr-2" />
          Manage All
        </Button>
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="connected">Connected ({connectedCount})</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="flex items-center space-x-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.map(integration => (
              <Card key={integration.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {integration.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <Switch
                      checked={integration.connected}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {integration.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={integration.connected ? "default" : "secondary"}
                      className={integration.connected ? "bg-green-500" : ""}
                    >
                      {integration.connected ? 'Connected' : 'Not Connected'}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleIntegration(integration.id)}
                    >
                      {integration.connected ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          <div className="space-y-4">
            {integrations.filter(i => i.connected).map(integration => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {integration.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500">Connected</Badge>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleIntegration(integration.id)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {integration.settings && (
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium">Settings</h4>
                      {Object.entries(integration.settings).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Label className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}:</Label>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {typeof value === 'string' && value.length > 20 
                              ? `${value.substring(0, 20)}...` 
                              : String(value)
                            }
                          </code>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Integration Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-site.com/webhooks"
                  value="https://mysite.com/webhooks"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">Global API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-sync" />
                <Label htmlFor="auto-sync">Enable automatic data synchronization</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" defaultChecked />
                <Label htmlFor="notifications">Send integration notifications</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add custom integrations using webhooks or API connections.
              </p>
              <div className="space-y-2">
                <Label htmlFor="custom-name">Integration Name</Label>
                <Input id="custom-name" placeholder="My Custom Integration" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-url">API Endpoint</Label>
                <Input id="custom-url" placeholder="https://api.example.com" />
              </div>
              <Button>
                Add Custom Integration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateIntegrations;