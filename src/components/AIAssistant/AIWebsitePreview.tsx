import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Edit, Download, Rocket, CheckCircle } from 'lucide-react';

interface AIWebsitePreviewProps {
  website: any;
  onEdit: () => void;
  onDeploy: () => void;
  onDownload: () => void;
}

const AIWebsitePreview: React.FC<AIWebsitePreviewProps> = ({ 
  website, 
  onEdit, 
  onDeploy, 
  onDownload 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{website.name}</h2>
        <p className="text-muted-foreground">{website.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Website Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="capitalize">{website.type}</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{website.pages?.length || 5}</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{website.features?.length || 8}</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Your website has been generated with all requested features and is ready for customization.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={onEdit} size="lg" className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Website
        </Button>
        <Button onClick={onDeploy} variant="outline" size="lg" className="flex items-center gap-2">
          <Rocket className="h-4 w-4" />
          Deploy Live
        </Button>
        <Button onClick={onDownload} variant="outline" size="lg" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Code
        </Button>
      </div>
    </div>
  );
};

export default AIWebsitePreview;