import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Plus, Tag, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: Date;
  views: number;
  helpful: number;
}

interface AIKnowledgeBaseProps {
  onEntrySelect?: (entry: KnowledgeEntry) => void;
  searchQuery?: string;
}

const AIKnowledgeBase: React.FC<AIKnowledgeBaseProps> = ({ 
  onEntrySelect, 
  searchQuery = '' 
}) => {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<KnowledgeEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: '',
    difficulty: 'beginner' as const
  });

  const categories = [
    'all', 'website_basics', 'design_principles', 'content_creation',
    'seo_optimization', 'e_commerce', 'troubleshooting', 'best_practices'
  ];

  useEffect(() => {
    loadKnowledgeBase();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [entries, searchTerm, selectedCategory]);

  const loadKnowledgeBase = async () => {
    try {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('*')
        .order('views', { ascending: false });
      
      if (error) throw error;
      
      const formattedEntries = data?.map(entry => ({
        ...entry,
        lastUpdated: new Date(entry.last_updated),
        tags: entry.tags || []
      })) || [];
      
      setEntries(formattedEntries);
    } catch (error) {
      console.error('Error loading knowledge base:', error);
      const fallbackEntries: KnowledgeEntry[] = [
        {
          id: '1',
          title: 'Getting Started with Website Building',
          content: 'Learn the fundamentals of creating your first website. This guide covers choosing templates, customizing content, and publishing your site.',
          category: 'website_basics',
          tags: ['beginner', 'tutorial', 'getting-started'],
          difficulty: 'beginner',
          lastUpdated: new Date(),
          views: 1250,
          helpful: 98
        },
        {
          id: '2',
          title: 'SEO Best Practices for Small Businesses',
          content: 'Optimize your website for search engines with these proven strategies. Includes keyword research, meta tags, and content optimization.',
          category: 'seo_optimization',
          tags: ['seo', 'marketing', 'business'],
          difficulty: 'intermediate',
          lastUpdated: new Date(),
          views: 890,
          helpful: 87
        },
        {
          id: '3',
          title: 'E-commerce Store Setup Guide',
          content: 'Complete guide to setting up an online store. Covers product catalogs, payment processing, shipping, and inventory management.',
          category: 'e_commerce',
          tags: ['ecommerce', 'online-store', 'payments'],
          difficulty: 'advanced',
          lastUpdated: new Date(),
          views: 654,
          helpful: 92
        }
      ];
      setEntries(fallbackEntries);
    }
  };

  const filterEntries = () => {
    let filtered = entries;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(entry => entry.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredEntries(filtered);
  };

  const addEntry = async () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;
    
    try {
      const entry: KnowledgeEntry = {
        id: Date.now().toString(),
        title: newEntry.title.trim(),
        content: newEntry.content.trim(),
        category: newEntry.category,
        tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        difficulty: newEntry.difficulty,
        lastUpdated: new Date(),
        views: 0,
        helpful: 0
      };
      
      setEntries(prev => [entry, ...prev]);
      setNewEntry({
        title: '',
        content: '',
        category: 'general',
        tags: '',
        difficulty: 'beginner'
      });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const incrementViews = async (id: string) => {
    setEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, views: entry.views + 1 } : entry
      )
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            AI Knowledge Base
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search knowledge base..."
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
            <Button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isAdding && (
            <div className="space-y-4 mb-6 p-4 border rounded-lg">
              <Input
                value={newEntry.title}
                onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Entry title..."
              />
              <Textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Entry content..."
                className="min-h-[100px]"
              />
              <div className="flex gap-4">
                <select
                  value={newEntry.category}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-2 border rounded-md"
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>
                      {cat.replace('_', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
                <Input
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Tags (comma-separated)"
                  className="flex-1"
                />
                <Button onClick={addEntry}>Add</Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              </div>
            </div>
          )}
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredEntries.map((entry) => (
              <div 
                key={entry.id} 
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  incrementViews(entry.id);
                  onEntrySelect?.(entry);
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-lg">{entry.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getDifficultyColor(entry.difficulty)}`}
                    >
                      {entry.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {entry.views} views
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {entry.content.substring(0, 150)}...
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {entry.helpful}% helpful
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIKnowledgeBase;