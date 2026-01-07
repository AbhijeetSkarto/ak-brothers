
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import { gsap } from 'gsap';
import { useContent } from '../context/ContentContext.tsx';
import { BRAND } from '../constants.tsx';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content } = useContent();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/stories' },
    { name: 'Portraits', path: '/images' },
    { name: 'Films', path: '/films' },
    { name: 'Photobooks', path: '/photobooks' },
    { name: 'Pre-Weddings', path: '/pre-weddings' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="relative z-[110]">
            <img 
              src={content.logo} 
              alt="AK BROTHERS" 
              className={`h-12 md:h-16 transition-all duration-500 invert ${scrolled ? 'scale-90' : 'scale-100'}`} 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`font-cinzel text-[10px] tracking-[0.3em] uppercase transition-all hover:text-gold ${location.pathname === link.path ? 'text-gold' : 'text-obsidian'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="bg-gold text-white px-8 py-3 font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-obsidian transition-all shadow-lg">
              Contact
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden relative z-[110] text-gold p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[105] bg-cream transition-all duration-700 ease-expo ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6 text-center">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-cinzel text-2xl md:text-4xl tracking-[0.4em] uppercase transition-all duration-500 hover:text-gold ${location.pathname === link.path ? 'text-gold' : 'text-obsidian'}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="mt-8 border border-gold text-gold px-12 py-5 font-cinzel text-xs tracking-[0.4em] uppercase hover:bg-gold hover:text-white transition-all w-full max-w-xs"
          >
            Contact
          </Link>
          
          <div className="pt-12 flex gap-8">
            <a href={content.contact.instagram} target="_blank" className="text-obsidian hover:text-gold transition-colors"><Instagram size={24} /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
