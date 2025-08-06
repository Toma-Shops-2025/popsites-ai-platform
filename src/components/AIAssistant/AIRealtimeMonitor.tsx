import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Cpu, Database, Globe, Zap, AlertCircle } from 'lucide-react';
import { useAI } from './AIProvider';

interface AIRealtimeMonitorProps {
  onClose: () => void;
}

const AIRealtimeMonitor: React.FC<AIRealtimeMonitorProps> = ({ onClose }) => {
  const { trainingData, addTrainingData } = useAI();
  const [systemStatus, setSystemStatus] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    activeConnections: 12,
    requestsPerSecond: 8.5,
    errorRate: 0.2,
    uptime: '99.9%'
  });
  
  const [realtimeEvents, setRealtimeEvents] = useState<any[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    if (!isMonitoring) return;
    
    const interval = setInterval(() => {
      // Simulate real-time system updates
      setSystemStatus(prev => ({
        ...prev,
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        activeConnections: Math.max(5, Math.min(25, prev.activeConnections + Math.floor((Math.random() - 0.5) * 4))),
        requestsPerSecond: Math.max(1, Math.min(20, prev.requestsPerSecond + (Math.random() - 0.5) * 2))
      }));
      
      // Add new events
      const eventTypes = ['user_interaction', 'ai_response', 'training_update', 'system_optimization'];
      const newEvent = {
        id: Date.now(),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        message: generateEventMessage(),
        timestamp: new Date(),
        severity: Math.random() > 0.8 ? 'warning' : 'info'
      };
      
      setRealtimeEvents(prev => [newEvent, ...prev.slice(0, 19)]);
      
      // Add to training data
      addTrainingData({
        type: 'system_monitoring',
        event: newEvent,
        systemStatus: systemStatus
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring, systemStatus, addTrainingData]);

  const generateEventMessage = () => {
    const messages = [
      'AI model processed website generation request',
      'Training data updated with user feedback',
      'System optimization completed successfully',
      'New user interaction recorded',
      'Template matching algorithm improved',
      'Content generation model updated',
      'Performance metrics recalculated',
      'User satisfaction score updated'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getStatusColor = (value: number, thresholds: { warning: number; danger: number }) => {
    if (value >= thresholds.danger) return 'text-red-600';
    if (value >= thresholds.warning) return 'text-orange-600';
    return 'text-green-600';
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-orange-100 text-orange-800',
      error: 'bg-red-100 text-red-800'
    };
    return colors[severity as keyof typeof colors] || colors.info;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Activity className="h-6 w-6 text-green-600" />
                AI Real-time Monitor
              </h2>
              <p className="text-muted-foreground mt-1">
                Live system monitoring and performance tracking
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsMonitoring(!isMonitoring)}
                variant={isMonitoring ? 'default' : 'outline'}
              >
                {isMonitoring ? 'Pause' : 'Resume'} Monitoring
              </Button>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>CPU Usage</span>
                    <span className={`font-bold ${getStatusColor(systemStatus.cpuUsage, { warning: 70, danger: 85 })}`}>
                      {systemStatus.cpuUsage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${systemStatus.cpuUsage}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Memory Usage</span>
                    <span className={`font-bold ${getStatusColor(systemStatus.memoryUsage, { warning: 75, danger: 90 })}`}>
                      {systemStatus.memoryUsage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${systemStatus.memoryUsage}%` }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">{systemStatus.activeConnections}</div>
                      <div className="text-sm text-muted-foreground">Active Users</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-2xl font-bold text-green-600">{systemStatus.requestsPerSecond.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">Requests/sec</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>System Uptime</span>
                    <Badge className="bg-green-100 text-green-800">{systemStatus.uptime}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Error Rate</span>
                    <span className="text-green-600 font-bold">{systemStatus.errorRate}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Training Data Points</span>
                    <span className="text-blue-600 font-bold">{trainingData.length}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">AI Models: Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">Training System: Active</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">Analytics: Running</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Events */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Real-time Events
                {isMonitoring && <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse ml-2"></div>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {realtimeEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <div className="flex-shrink-0 mt-1">
                      {event.severity === 'warning' ? (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      ) : (
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getSeverityBadge(event.severity)}>
                          {event.type.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{event.message}</p>
                    </div>
                  </div>
                ))}
                
                {realtimeEvents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No events yet. Monitoring will begin shortly...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIRealtimeMonitor;