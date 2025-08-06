import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import DetailedGuide from './DetailedGuide';
import WhyUseThis from './WhyUseThis';
import StepByStepTutorial from './StepByStepTutorial';
import Features from './Features';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const location = useLocation();

  // Show full homepage layout only on root path
  if (location.pathname === '/') {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="overview">
            <DetailedGuide />
          </section>
          <section id="why-choose-us">
            <WhyUseThis />
          </section>
          <section id="tutorial">
            <StepByStepTutorial />
          </section>
          <section id="features">
            <Features />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // For other pages, show minimal layout with children
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
export { AppLayout };