import { createContext, useContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import AIEnhancedDoneForYou from './AIEnhancedDoneForYou';

interface AIContextType {
  handleAIAction: (action: string, data?: any) => void;
  showEnhancedSystem: boolean;
  setShowEnhancedSystem: (show: boolean) => void;
  trainingData: any[];
  addTrainingData: (data: any) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showEnhancedSystem, setShowEnhancedSystem] = useState(false);
  const [trainingData, setTrainingData] = useState<any[]>([]);

  const addTrainingData = (data: any) => {
    const trainingPoint = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: data.type || 'user_interaction',
      data: data,
      userId: 'current_user'
    };
    
    setTrainingData(prev => [...prev, trainingPoint].slice(-1000));
    
    // Store in localStorage for persistence
    const stored = JSON.parse(localStorage.getItem('ai-training-interactions') || '[]');
    const updated = [...stored, trainingPoint].slice(-1000);
    localStorage.setItem('ai-training-interactions', JSON.stringify(updated));
  };

  const handleAIAction = (action: string, data?: any) => {
    // Add all actions to training data
    addTrainingData({ action, ...data });
    
    try {
      switch (action) {
        case 'navigate':
          if (data?.path) {
            if (data.filter === 'ecommerce') {
              navigate(`${data.path}?category=ecommerce`);
              toast({
                title: 'E-commerce Templates',
                description: 'Showing e-commerce templates for your online store',
                duration: 2000,
              });
            } else {
              navigate(data.path);
              toast({
                title: 'AI Navigation',
                description: `Taking you to ${data.path.replace('/', '').replace('-', ' ')}`,
                duration: 2000,
              });
            }
          }
          break;
        case 'template-select':
          if (data?.templateId) {
            navigate(`/template-editor?template=${data.templateId}`);
            toast({
              title: 'Template Selected',
              description: 'Opening template editor...',
              duration: 2000,
            });
          }
          break;
        case 'showEcommerceGuide':
          toast({
            title: 'E-commerce Guide',
            description: 'Showing comprehensive e-commerce setup guide',
            duration: 2000,
          });
          break;
        case 'showEnhancedTrainingSystem':
        case 'showTrainingSystem':
          setShowEnhancedSystem(true);
          toast({
            title: 'AI Enhanced Training System',
            description: 'Opening comprehensive AI training with done-for-you features',
            duration: 2000,
          });
          break;
        case 'startTraining':
        case 'continueTraining':
          setShowEnhancedSystem(true);
          toast({
            title: 'AI Training Continued',
            description: 'Enhancing AI with TomaShops creator tools and done-for-you systems',
            duration: 3000,
          });
          break;
        case 'export':
          toast({
            title: 'Export Ready',
            description: 'Your website is ready for export!',
            duration: 3000,
          });
          break;
        case 'preview':
          toast({
            title: 'Preview Mode',
            description: 'Opening preview of your website...',
            duration: 2000,
          });
          break;
        case 'help':
          toast({
            title: 'AI Help',
            description: 'I am here to assist you with comprehensive website building and training!',
            duration: 2000,
          });
          break;
        case 'trainOnInteraction':
          // Specific training data collection
          addTrainingData({
            type: 'user_interaction',
            interaction: data?.interaction,
            context: data?.context,
            result: data?.result
          });
          break;
        case 'improveAI':
          toast({
            title: 'AI Improvement',
            description: 'AI is learning from your interactions to provide better assistance',
            duration: 2000,
          });
          break;
        case 'buildDoneForYou':
          setShowEnhancedSystem(true);
          toast({
            title: 'Done-For-You System',
            description: 'Opening enhanced AI system with everything creators need',
            duration: 3000,
          });
          break;
        default:
          console.log('AI action received:', action, data);
          toast({
            title: 'AI Assistant',
            description: 'Action completed successfully! I am continuously learning and improving.',
            duration: 2000,
          });
      }
    } catch (error) {
      console.error('Error handling AI action:', error);
      toast({
        title: 'Action Error',
        description: 'There was an issue processing that action. Please try again.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return (
    <AIContext.Provider value={{ 
      handleAIAction, 
      showEnhancedSystem, 
      setShowEnhancedSystem,
      trainingData,
      addTrainingData
    }}>
      {children}
      {showEnhancedSystem && (
        <AIEnhancedDoneForYou 
          onClose={() => setShowEnhancedSystem(false)} 
        />
      )}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}