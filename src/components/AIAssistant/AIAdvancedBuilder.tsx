import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Wand2, Rocket, Settings, Eye } from 'lucide-react';

interface BuildConfig {
  type: string;
  features: string[];
  style: string;
}

export const AIAdvancedBuilder: React.FC = () => {
  const [buildConfig, setBuildConfig] = useState<BuildConfig>({
    type: 'website',
    features: [],
    style: 'modern'
  });
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');

  const handleBuild = async () => {
    setIsBuilding(true);
    setBuildProgress(0);
    
    // Simulate build progress
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBuilding(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            AI Advanced Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              What do you want to build?
            </label>
            <Textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {['E-commerce', 'Blog', 'Portfolio', 'Landing Page'].map((type) => (
              <Badge key={type} variant="outline" className="cursor-pointer">
                {type}
              </Badge>
            ))}
          </div>

          {isBuilding && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Building your site...</span>
                <span>{buildProgress}%</span>
              </div>
              <Progress value={buildProgress} />
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleBuild} disabled={isBuilding || !userPrompt}>
              <Rocket className="h-4 w-4 mr-2" />
              {isBuilding ? 'Building...' : 'Build Now'}
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};