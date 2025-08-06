-- PopSites AI Platform Database Schema

-- User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  company TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  timezone TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Subscription Plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  interval TEXT NOT NULL CHECK (interval IN ('month', 'year')),
  features JSONB NOT NULL,
  max_projects INTEGER DEFAULT -1,
  max_deployments INTEGER DEFAULT -1,
  ai_features BOOLEAN DEFAULT false,
  priority INTEGER DEFAULT 0,
  stripe_price_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id TEXT,
  stripe_subscription_id TEXT,
  tier TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'trial',
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Billing History
CREATE TABLE IF NOT EXISTS billing_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_invoice_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL,
  description TEXT,
  invoice_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage Records
CREATE TABLE IF NOT EXISTS usage_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_type TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Training Modules
CREATE TABLE IF NOT EXISTS ai_training_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL, -- 'development', 'deployment', 'mobile', 'platforms'
  training_data JSONB,
  accuracy FLOAT DEFAULT 0,
  progress FLOAT DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'pending', 'active', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated Projects
CREATE TABLE IF NOT EXISTS generated_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  generation_id UUID,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  project_type TEXT NOT NULL, -- 'website', 'mobile-app', 'pwa', 'desktop-app'
  framework TEXT DEFAULT 'react',
  project_structure JSONB,
  code_files JSONB,
  status TEXT DEFAULT 'generating', -- 'generating', 'ready', 'deployed', 'published'
  thumbnail_url TEXT,
  preview_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deployments
CREATE TABLE IF NOT EXISTS deployments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES generated_projects(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'github', 'netlify', 'vercel', 'firebase'
  deployment_url TEXT,
  deployment_id TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'building', 'deployed', 'failed'
  config JSONB,
  logs TEXT,
  build_time INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- App Store Publications
CREATE TABLE IF NOT EXISTS app_store_publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES generated_projects(id) ON DELETE CASCADE,
  store_type TEXT NOT NULL, -- 'google_play', 'app_store', 'samsung_galaxy', 'amazon_appstore'
  app_name TEXT NOT NULL,
  bundle_url TEXT,
  app_id TEXT,
  status TEXT DEFAULT 'preparing', -- 'preparing', 'submitted', 'published', 'rejected'
  store_response JSONB,
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform Integrations
CREATE TABLE IF NOT EXISTS platform_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'github', 'supabase', 'netlify', 'vercel', 'firebase'
  status TEXT DEFAULT 'disconnected', -- 'connected', 'disconnected', 'configuring'
  credentials JSONB, -- encrypted credentials
  config JSONB,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- AI Analytics
CREATE TABLE IF NOT EXISTS ai_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'generation', 'deployment', 'training', 'user_feedback'
  event_data JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES generated_projects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates
CREATE TABLE IF NOT EXISTS templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'business', 'ecommerce', 'portfolio', 'blog', 'landing'
  thumbnail_url TEXT,
  preview_url TEXT,
  template_data JSONB NOT NULL,
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Favorites
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, template_id)
);

-- Insert default subscription plans
INSERT INTO subscription_plans (plan_id, name, description, price, interval, features, max_projects, max_deployments, ai_features, priority) VALUES
('free', 'Free Trial', 'Perfect for getting started', 0, 'month', 
  '["14-day free trial", "Up to 3 projects", "Basic AI features", "Community support", "Standard templates"]', 
  3, 5, false, 1),
('starter', 'Starter', 'Great for small businesses', 29, 'month',
  '["Unlimited projects", "Advanced AI features", "Priority support", "Custom domains", "Analytics dashboard", "Team collaboration"]',
  -1, 50, true, 2),
('professional', 'Professional', 'For growing businesses', 79, 'month',
  '["Everything in Starter", "Advanced analytics", "Custom branding", "API access", "White-label options", "Priority deployment", "Dedicated support"]',
  -1, -1, true, 3),
('enterprise', 'Enterprise', 'For large organizations', 199, 'month',
  '["Everything in Professional", "Custom integrations", "SLA guarantee", "On-premise deployment", "Custom training", "Dedicated account manager"]',
  -1, -1, true, 4)
ON CONFLICT (plan_id) DO NOTHING;

-- Insert initial training modules
INSERT INTO ai_training_modules (module_name, category, accuracy, progress, status) VALUES
('React/Next.js Development', 'development', 98.5, 95, 'active'),
('GitHub Integration & CI/CD', 'deployment', 96.2, 88, 'active'),
('Supabase Backend Setup', 'platforms', 97.8, 92, 'completed'),
('Netlify/Vercel Deployment', 'deployment', 94.1, 85, 'active'),
('PWA & Mobile App Creation', 'mobile', 91.3, 78, 'active'),
('App Store Publishing', 'mobile', 87.9, 65, 'active'),
('Firebase Integration', 'platforms', 82.1, 45, 'pending'),
('E-commerce Platforms', 'development', 89.4, 72, 'active')
ON CONFLICT (module_name) DO NOTHING;

-- Insert sample templates
INSERT INTO templates (name, description, category, tags, is_featured, template_data) VALUES
('Modern Business', 'Clean and professional business website template', 'business', 
  ARRAY['business', 'professional', 'modern'], true, '{"elements": [], "styles": {}}'),
('E-commerce Store', 'Complete online store with shopping cart and checkout', 'ecommerce',
  ARRAY['ecommerce', 'store', 'shopping'], true, '{"elements": [], "styles": {}}'),
('Creative Portfolio', 'Showcase your work with this stunning portfolio template', 'portfolio',
  ARRAY['portfolio', 'creative', 'showcase'], true, '{"elements": [], "styles": {}}'),
('Blog Platform', 'Perfect for content creators and bloggers', 'blog',
  ARRAY['blog', 'content', 'writing'], false, '{"elements": [], "styles": {}}'),
('Landing Page', 'High-converting landing page for your product or service', 'landing',
  ARRAY['landing', 'conversion', 'marketing'], true, '{"elements": [], "styles": {}}')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_store_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own subscription" ON user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own billing history" ON billing_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own usage records" ON usage_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own projects" ON generated_projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects" ON generated_projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON generated_projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON generated_projects
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own deployments" ON deployments
  FOR SELECT USING (project_id IN (SELECT id FROM generated_projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their own app publications" ON app_store_publications
  FOR SELECT USING (project_id IN (SELECT id FROM generated_projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their own integrations" ON platform_integrations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own analytics" ON ai_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own favorites" ON user_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites" ON user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Public policies for templates
CREATE POLICY "Anyone can view templates" ON templates
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_generated_projects_user_id ON generated_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_deployments_project_id ON deployments(project_id);
CREATE INDEX IF NOT EXISTS idx_usage_records_user_id ON usage_records(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_analytics_user_id ON ai_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_featured ON templates(is_featured);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generated_projects_updated_at BEFORE UPDATE ON generated_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deployments_updated_at BEFORE UPDATE ON deployments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_store_publications_updated_at BEFORE UPDATE ON app_store_publications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_integrations_updated_at BEFORE UPDATE ON platform_integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();