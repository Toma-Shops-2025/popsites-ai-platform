import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AIProvider } from '@/components/AIAssistant/AIProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from '@/components/AppLayout';
import Index from '@/pages/Index';
import TemplateGallery from '@/pages/TemplateGallery';
import TemplateEditor from '@/pages/TemplateEditor';
import Features from '@/pages/Features';
import GetStarted from '@/pages/GetStarted';
import AIAssistant from '@/pages/AIAssistant';
import AIComprehensivePlatform from '@/pages/AIComprehensivePlatform';
import Dashboard from '@/pages/Dashboard';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import VerifyEmail from '@/pages/VerifyEmail';
import ChoosePlan from '@/pages/ChoosePlan';
import NotFound from '@/pages/NotFound';
import AIFloatingButton from '@/components/AIAssistant/AIFloatingButton';
import ProtectedRoute from '@/components/ProtectedRoute';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <Router>
            <AIProvider>
              <div className="min-h-screen bg-background">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/choose-plan" element={<ChoosePlan />} />
                  
                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/template-gallery" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <TemplateGallery />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/template-editor" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <TemplateEditor />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-assistant" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <AIAssistant />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-platform" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <AIComprehensivePlatform />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <AIFloatingButton />
              </div>
              <Toaster />
            </AIProvider>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;