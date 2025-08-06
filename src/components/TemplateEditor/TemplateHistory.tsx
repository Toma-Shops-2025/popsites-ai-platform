import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { History, RotateCcw, Clock, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HistoryItem {
  id: string;
  timestamp: Date;
  action: string;
  description: string;
  preview?: string;
}

interface TemplateHistoryProps {
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onClear: () => void;
}

const TemplateHistory: React.FC<TemplateHistoryProps> = ({ history, onRestore, onClear }) => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'bg-green-100 text-green-800';
      case 'edit': return 'bg-blue-100 text-blue-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'save': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRestore = (item: HistoryItem) => {
    onRestore(item);
    toast({ title: 'Template Restored', description: `Restored to: ${item.description}` });
  };

  const handleClear = () => {
    onClear();
    toast({ title: 'History Cleared', description: 'All history items have been removed' });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="w-4 h-4 mr-2" />
          History ({history.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Template History</span>
            <Button onClick={handleClear} variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No history items yet</p>
            </div>
          ) : (
            history.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getActionColor(item.action)}>
                        {item.action}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatTime(item.timestamp)}
                      </span>
                    </div>
                    <Button 
                      onClick={() => handleRestore(item)}
                      size="sm"
                      variant="outline"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Restore
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700">{item.description}</p>
                  {item.preview && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono">
                      {item.preview}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateHistory;