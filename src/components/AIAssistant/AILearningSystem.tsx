import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, Award, Target } from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedTime: string;
}

interface AILearningSystemProps {
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  completedModules?: string[];
  onModuleSelect?: (module: LearningModule) => void;
}

export default function AILearningSystem({ 
  userLevel = 'beginner', 
  completedModules = [], 
  onModuleSelect 
}: AILearningSystemProps) {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const allModules: LearningModule[] = [
      {
        id: '1',
        title: 'Website Basics',
        description: 'Learn fundamental web concepts and terminology',
        progress: completedModules.includes('1') ? 100 : 0,
        difficulty: 'beginner',
        category: 'Foundation',
        estimatedTime: '15 min'
      },
      {
        id: '2',
        title: 'Template Selection',
        description: 'Choose the perfect template for your needs',
        progress: completedModules.includes('2') ? 100 : 0,
        difficulty: 'beginner',
        category: 'Design',
        estimatedTime: '20 min'
      },
      {
        id: '3',
        title: 'Content Creation',
        description: 'Write compelling content that engages visitors',
        progress: completedModules.includes('3') ? 100 : 0,
        difficulty: 'beginner',
        category: 'Content',
        estimatedTime: '30 min'
      },
      {
        id: '4',
        title: 'SEO Optimization',
        description: 'Improve search engine visibility',
        progress: completedModules.includes('4') ? 100 : 0,
        difficulty: 'intermediate',
        category: 'Marketing',
        estimatedTime: '25 min'
      },
      {
        id: '5',
        title: 'E-commerce Setup',
        description: 'Build an online store with payment processing',
        progress: completedModules.includes('5') ? 100 : 0,
        difficulty: 'intermediate',
        category: 'E-commerce',
        estimatedTime: '45 min'
      },
      {
        id: '6',
        title: 'Advanced Customization',
        description: 'Custom CSS and advanced design techniques',
        progress: completedModules.includes('6') ? 100 : 0,
        difficulty: 'advanced',
        category: 'Technical',
        estimatedTime: '60 min'
      }
    ];

    // Filter modules based on user level
    const filteredModules = allModules.filter(module => {
      if (userLevel === 'beginner') return module.difficulty === 'beginner';
      if (userLevel === 'intermediate') return ['beginner', 'intermediate'].includes(module.difficulty);
      return true; // advanced users see all modules
    });

    setModules(filteredModules);
    
    // Calculate overall progress
    const totalProgress = filteredModules.reduce((sum, module) => sum + module.progress, 0);
    setOverallProgress(Math.round(totalProgress / filteredModules.length));
  }, [userLevel, completedModules]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Foundation': return <BookOpen className="w-4 h-4" />;
      case 'Design': return <Target className="w-4 h-4" />;
      case 'Content': return <BookOpen className="w-4 h-4" />;
      case 'Marketing': return <Award className="w-4 h-4" />;
      case 'E-commerce': return <Target className="w-4 h-4" />;
      case 'Technical': return <Brain className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          AI Learning System
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {modules.map((module) => (
            <div 
              key={module.id}
              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onModuleSelect?.(module)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(module.category)}
                  <h4 className="font-medium text-sm">{module.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getDifficultyColor(module.difficulty)}`}
                  >
                    {module.difficulty}
                  </Badge>
                  <span className="text-xs text-gray-500">{module.estimatedTime}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{module.description}</p>
              <div className="flex items-center justify-between">
                <Progress value={module.progress} className="h-1 flex-1 mr-2" />
                <span className="text-xs text-gray-500">{module.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}