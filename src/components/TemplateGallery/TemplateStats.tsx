import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Download, Star, Heart, Users, Zap } from 'lucide-react';

interface TemplateStatsProps {
  totalTemplates: number;
  totalDownloads: number;
  averageRating: number;
  totalLikes: number;
  premiumCount: number;
  freeCount: number;
}

const TemplateStats: React.FC<TemplateStatsProps> = ({
  totalTemplates,
  totalDownloads,
  averageRating,
  totalLikes,
  premiumCount,
  freeCount
}) => {
  const stats = [
    {
      title: 'Total Templates',
      value: totalTemplates,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Downloads',
      value: totalDownloads.toLocaleString(),
      icon: <Download className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Avg Rating',
      value: averageRating.toFixed(1),
      icon: <Star className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Total Likes',
      value: totalLikes.toLocaleString(),
      icon: <Heart className="w-5 h-5" />,
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Premium',
      value: premiumCount,
      icon: <Zap className="w-5 h-5" />,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Free',
      value: freeCount,
      icon: <Users className="w-5 h-5" />,
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <div className="text-white">{stat.icon}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TemplateStats;