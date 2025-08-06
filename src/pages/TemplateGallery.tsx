import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Grid, List } from 'lucide-react';
import TemplateCard from '@/components/TemplateGallery/TemplateCard';
import TemplateFilters from '@/components/TemplateGallery/TemplateFilters';
import TemplatePreview from '@/components/TemplateGallery/TemplatePreview';
import TemplateStats from '@/components/TemplateGallery/TemplateStats';
import FeaturedTemplates from '@/components/TemplateGallery/FeaturedTemplates';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { templateData, getTemplatesByCategory, searchTemplates, getTemplateById, Template } from '@/data/templateData';

const TemplateGallery: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(templateData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showFeatured, setShowFeatured] = useState(true);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category === 'ecommerce') {
      setSelectedCategory('E-commerce');
      setShowFeatured(false);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = templateData;
    
    if (selectedCategory !== 'All Categories') {
      filtered = getTemplatesByCategory(selectedCategory);
    }
    
    if (searchTerm) {
      filtered = searchTemplates(searchTerm);
      setShowFeatured(false);
    } else if (selectedCategory === 'All Categories' && selectedTags.length === 0) {
      setShowFeatured(true);
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(template => 
        selectedTags.some(tag => template.tags.includes(tag))
      );
      setShowFeatured(false);
    }
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloads - a.downloads;
        default:
          return b.likes - a.likes;
      }
    });
    
    setFilteredTemplates(filtered);
  }, [selectedCategory, searchTerm, selectedTags, sortBy]);

  const handleUseTemplate = (templateId: string) => {
    const template = getTemplateById(templateId);
    toast({ 
      title: `Using ${template?.name}!`, 
      description: "Opening template editor..." 
    });
    setTimeout(() => navigate('/template-editor'), 1000);
  };

  const handlePreview = (templateId: string) => {
    const template = getTemplateById(templateId);
    setPreviewTemplate(template || null);
    setIsPreviewOpen(true);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedTags([]);
    setSortBy('popular');
    setShowFeatured(true);
  };

  const totalDownloads = templateData.reduce((sum, t) => sum + t.downloads, 0);
  const averageRating = templateData.reduce((sum, t) => sum + t.rating, 0) / templateData.length;
  const totalLikes = templateData.reduce((sum, t) => sum + t.likes, 0);
  const premiumCount = templateData.filter(t => t.isPremium).length;
  const freeCount = templateData.filter(t => !t.isPremium).length;

  const categoryFilter = searchParams.get('category');
  const isEcommerceFilter = categoryFilter === 'ecommerce';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link to="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {isEcommerceFilter ? 'E-commerce Templates' : 'Template Gallery'}
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              {isEcommerceFilter 
                ? 'Professional e-commerce templates for your online store'
                : 'Choose from our collection of professional templates'
              }
            </p>
          </div>
          
          <TemplateStats
            totalTemplates={templateData.length}
            totalDownloads={totalDownloads}
            averageRating={averageRating}
            totalLikes={totalLikes}
            premiumCount={premiumCount}
            freeCount={freeCount}
          />
          
          {showFeatured && (
            <FeaturedTemplates
              templates={templateData}
              onUse={handleUseTemplate}
              onPreview={handlePreview}
            />
          )}
          
          <TemplateFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
          
          <div className="mb-4 text-sm text-gray-300 text-center">
            Showing {filteredTemplates.length} of {templateData.length} templates
          </div>
          
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={handleUseTemplate}
                onPreview={handlePreview}
              />
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white text-lg mb-4">No templates found matching your criteria.</p>
              <Button onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <TemplatePreview
        template={previewTemplate}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onUse={handleUseTemplate}
      />
    </div>
  );
};

export default TemplateGallery;