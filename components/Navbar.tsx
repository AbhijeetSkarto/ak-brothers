
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BRAND, NAV_SECTIONS } from '../constants.tsx';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  // Filter out Office from the main list to use it as a button
  const centerLinks = NAV_SECTIONS.filter(link => link.path !== '/office');

  // Logic for text color
  const isHome = location.pathname === '/';
  const textColor = (isHome && !isScrolled) ? 'text-white' : 'text-obsidian';
  const logoTextSilver = (isHome && !isScrolled) ? 'text-silver' : 'text-obsidian';
  const logoTextPlatinum = (isHome && !isScrolled) ? 'text-platinum/60' : 'text-charcoal/60';
  const borderColor = (isHome && !isScrolled) ? 'border-white/20' : 'border-obsidian/20';

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-cream/90 backdrop-blur-xl py-2 border-b border-black/5 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LEFT: Logo + Brand Text */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={BRAND.logo} 
            alt="AK BROTHERS" 
            className={`transition-all duration-500 ${isScrolled ? 'h-10' : 'h-12'} group-hover:scale-105`}
          />
          <div className="hidden sm:flex flex-col justify-center">
            <span className={`font-cinzel text-[10px] tracking-[0.3em] leading-tight group-hover:text-gold transition-colors ${logoTextSilver}`}>AK BROTHERS</span>
            <span className={`font-cinzel text-[8px] tracking-[0.5em] leading-tight ${logoTextPlatinum}`}>PHOTOGRAPHY</span>
          </div>
        </Link>

        {/* CENTER: Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {centerLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-cinzel text-[10px] tracking-[0.2em] uppercase transition-all hover:text-gold hover:scale-105 ${location.pathname === link.path ? 'text-gold' : textColor}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT: Boxed Office Button */}
        <div className="hidden lg:flex items-center gap-6">
          <Link 
            to="/office" 
            className={`block border px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-cinzel hover:bg-gold hover:text-white hover:border-gold transition-all duration-500 ${borderColor} ${textColor}`}
          >
            Office
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-5">
           <button onClick={() => setIsOpen(!isOpen)} className="text-gold hover:scale-110 transition-transform">
             {isOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-cream z-[110] flex flex-col items-center justify-center space-y-10 transition-transform duration-700 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-gold p-2">
          <X size={32} />
        </button>
        <Link to="/" className="font-cinzel text-2xl tracking-[0.4em] uppercase text-obsidian hover:text-gold">Home</Link>
        {centerLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="font-cinzel text-xl tracking-[0.3em] uppercase text-obsidian hover:text-gold"
          >
            {link.name}
          </Link>
        ))}
        <Link 
          to="/office" 
          className="border border-gold px-12 py-4 text-sm tracking-[0.4em] uppercase text-gold hover:bg-gold hover:text-white transition-all"
        >
          Office
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
