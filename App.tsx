
import React, { useLayoutEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Admin from './pages/Admin';
import DynamicCategory from './pages/DynamicCategory';
import Images from './pages/Images';
import Films from './pages/Films';
import Stories from './pages/Stories';
import Photobooks from './pages/Photobooks';
import PreWeddings from './pages/PreWeddings';
import { NAV_SECTIONS } from './constants';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, [location.pathname]);

  return <div ref={containerRef} className="min-h-screen">{children}</div>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-obsidian font-manrope selection:bg-gold selection:text-obsidian">
        <Navbar />
        <main className="flex-grow pt-16 md:pt-24">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/images" element={<Images />} />
              <Route path="/films" element={<Films />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/photobooks" element={<Photobooks />} />
              <Route path="/pre-weddings" element={<PreWeddings />} />
              
              {NAV_SECTIONS.filter(s => !['/images', '/films', '/stories', '/photobooks', '/pre-weddings'].includes(s.path)).map((section) => (
                <Route 
                  key={section.path} 
                  path={section.path} 
                  element={<DynamicCategory title={section.name} subtitle="Artistic Selection" />} 
                />
              ))}

              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </PageTransition>
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
