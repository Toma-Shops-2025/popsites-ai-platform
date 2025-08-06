import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Apple, PlayCircle, Store } from 'lucide-react';

interface AppStoreConfig {
  store: string;
  status: 'ready' | 'publishing' | 'published' | 'rejected';
  progress?: number;
  lastUpdate?: string;
}

export const AIPopSitesAppStorePublisher: React.FC = () => {
  const [appStores, setAppStores] = useState<AppStoreConfig[]>([
    { store: 'Google Play', status: 'published', lastUpdate: '3 days ago' },
    { store: 'Apple App Store', status: 'publishing', progress: 75 },
    { store: 'Samsung Galaxy Store', status: 'ready' },
    { store: 'Amazon Appstore', status: 'ready' }
  ]);

  const storeIcons = {
    'Google Play': PlayCircle,
    'Apple App Store': Apple,
    'Samsung Galaxy Store': Smartphone,
    'Amazon Appstore': Store
  };

  const handlePublish = (store: string) => {
    setAppStores(prev => prev.map(s => 
      s.store === store ? { ...s, status: 'publishing', progress: 0 } : s
    ));
    
    // Simulate publishing progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAppStores(prev => prev.map(s => 
        s.store === store ? { ...s, progress } : s
      ));
      
      if (progress >= 100) {
        clearInterval(interval);
        setAppStores(prev => prev.map(s => 
          s.store === store ? { ...s, status: 'published', progress: undefined, lastUpdate: 'Just now' } : s
        ));
      }
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>App Store Publishing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appStores.map((store) => {
              const Icon = storeIcons[store.store as keyof typeof storeIcons];
              return (
                <Card key={store.store} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{store.store}</span>
                    </div>
                    <Badge variant={store.status === 'published' ? 'default' : 'secondary'}>
                      {store.status}
                    </Badge>
                  </div>
                  
                  {store.progress !== undefined && (
                    <div className="mb-3">
                      <Progress value={store.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Publishing... {store.progress}%
                      </p>
                    </div>
                  )}
                  
                  {store.lastUpdate && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Last update: {store.lastUpdate}
                    </p>
                  )}
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handlePublish(store.store)}
                    disabled={store.status === 'publishing'}
                  >
                    {store.status === 'published' ? 'Update' : 
                     store.status === 'publishing' ? 'Publishing...' : 'Publish'}
                  </Button>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};