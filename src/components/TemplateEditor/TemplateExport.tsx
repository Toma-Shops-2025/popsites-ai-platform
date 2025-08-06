import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Code, Globe, Smartphone, Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TemplateExportProps {
  template: any;
  onExport: (format: string) => void;
}

const TemplateExport: React.FC<TemplateExportProps> = ({ template, onExport }) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { id: 'html', name: 'HTML/CSS', icon: <Code className="w-5 h-5" />, desc: 'Static HTML files' },
    { id: 'react', name: 'React', icon: <Globe className="w-5 h-5" />, desc: 'React components' },
    { id: 'vue', name: 'Vue.js', icon: <Globe className="w-5 h-5" />, desc: 'Vue components' },
    { id: 'wordpress', name: 'WordPress', icon: <Globe className="w-5 h-5" />, desc: 'WordPress theme' },
    { id: 'mobile', name: 'Mobile App', icon: <Smartphone className="w-5 h-5" />, desc: 'React Native' }
  ];

  const handleExport = async (format: string) => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onExport(format);
      toast({ title: 'Export Complete!', description: `Template exported as ${format}` });
    } catch (error) {
      toast({ title: 'Export Failed', description: 'Please try again', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Link Copied!', description: 'Share link copied to clipboard' });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Template</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportFormats.map((format) => (
              <Card key={format.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    {format.icon}
                    <div>
                      <h3 className="font-semibold">{format.name}</h3>
                      <p className="text-sm text-gray-600">{format.desc}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleExport(format.id)}
                    disabled={isExporting}
                    className="w-full mt-2"
                    size="sm"
                  >
                    {isExporting ? 'Exporting...' : 'Export'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Share Template</h3>
            <div className="flex space-x-2">
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
              <Button variant="outline" className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateExport;