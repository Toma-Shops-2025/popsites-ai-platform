import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, MicOff, Volume2, VolumeX, Settings, Zap, MessageSquare } from 'lucide-react';

interface VoiceCommand {
  id: string;
  phrase: string;
  action: string;
  category: string;
  confidence: number;
}

interface AIVoiceCommandsProps {
  onVoiceCommand: (command: string) => void;
}

const AIVoiceCommands: React.FC<AIVoiceCommandsProps> = ({ onVoiceCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [recentCommands, setRecentCommands] = useState<VoiceCommand[]>([]);

  const voiceCommands = {
    creation: [
      { phrase: 'Create a new website', action: 'Start website builder' },
      { phrase: 'Add a new page', action: 'Create new page' },
      { phrase: 'Insert an image', action: 'Open image library' },
      { phrase: 'Add contact form', action: 'Insert contact form' }
    ],
    editing: [
      { phrase: 'Change the color to blue', action: 'Update color scheme' },
      { phrase: 'Make text bigger', action: 'Increase font size' },
      { phrase: 'Center this element', action: 'Apply center alignment' },
      { phrase: 'Delete this section', action: 'Remove selected element' }
    ],
    navigation: [
      { phrase: 'Go to dashboard', action: 'Navigate to dashboard' },
      { phrase: 'Open template gallery', action: 'Show template gallery' },
      { phrase: 'Show analytics', action: 'Display analytics panel' },
      { phrase: 'Save my work', action: 'Save current project' }
    ],
    ai: [
      { phrase: 'Optimize for mobile', action: 'Run mobile optimization' },
      { phrase: 'Improve SEO', action: 'Start SEO optimization' },
      { phrase: 'Generate content', action: 'Open content generator' },
      { phrase: 'Analyze performance', action: 'Run performance analysis' }
    ]
  };

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const commands = Object.values(voiceCommands).flat();
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setTranscript(randomCommand.phrase);
      setConfidence(Math.random() * 40 + 60); // 60-100% confidence
      
      const newCommand: VoiceCommand = {
        id: Date.now().toString(),
        phrase: randomCommand.phrase,
        action: randomCommand.action,
        category: 'recognized',
        confidence: Math.random() * 40 + 60
      };
      
      setRecentCommands(prev => [newCommand, ...prev.slice(0, 4)]);
      onVoiceCommand(randomCommand.action);
      
      setTimeout(() => {
        setIsListening(false);
        setTranscript('');
        setConfidence(0);
      }, 2000);
    }, 1500);
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript('');
    setConfidence(0);
  };

  const speak = (text: string) => {
    setIsSpeaking(true);
    // Simulate text-to-speech
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500';
    if (confidence >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">AI Voice Commands</h2>
        <p className="text-muted-foreground">Control PopSites with your voice</p>
      </div>

      {/* Voice Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Voice Control Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Microphone Controls */}
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                variant={isListening ? 'destructive' : 'default'}
                onClick={isListening ? stopListening : startListening}
                className="w-32"
              >
                {isListening ? (
                  <>
                    <MicOff className="h-5 w-5 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    Listen
                  </>
                )}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => speak('Voice commands are ready')}
                disabled={isSpeaking}
                className="w-32"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="h-5 w-5 mr-2" />
                    Speaking...
                  </>
                ) : (
                  <>
                    <Volume2 className="h-5 w-5 mr-2" />
                    Test Voice
                  </>
                )}
              </Button>
            </div>

            {/* Live Transcript */}
            {isListening && (
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Listening...</span>
                </div>
                {transcript && (
                  <div className="space-y-2">
                    <p className="text-lg">"{transcript}"</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Confidence:</span>
                      <Progress value={confidence} className="flex-1" />
                      <span className={`text-sm font-medium ${getConfidenceColor(confidence)}`}>
                        {confidence.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Commands */}
      {recentCommands.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Commands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {recentCommands.map((command) => (
                  <div key={command.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">"{command.phrase}"</p>
                      <p className="text-xs text-muted-foreground">{command.action}</p>
                    </div>
                    <Badge className={getConfidenceColor(command.confidence)}>
                      {command.confidence.toFixed(0)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Available Commands */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Available Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(voiceCommands).map(([category, commands]) => (
              <div key={category}>
                <h4 className="font-medium mb-2 capitalize">{category}</h4>
                <div className="grid gap-2">
                  {commands.map((command, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded hover:bg-muted/50">
                      <span className="text-sm">"{command.phrase}"</span>
                      <Badge variant="outline" className="text-xs">
                        {command.action}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Voice Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Voice Recognition Language</span>
              <Badge>English (US)</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Confidence Threshold</span>
              <Badge>60%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Voice Feedback</span>
              <Badge variant="outline">Enabled</Badge>
            </div>
            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Configure Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIVoiceCommands;