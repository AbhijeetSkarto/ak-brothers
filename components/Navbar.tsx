
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

  // Main navigation links shown in the center on desktop
  const desktopLinks = NAV_SECTIONS.filter(link => 
    ['/stories', '/images', '/films', '/photobooks', '/pre-weddings'].includes(link.path)
  );

  const isHome = location.pathname === '/';
  // If we are on home and not scrolled, background is transparent -> Text White
  // Otherwise background is cream -> Text Obsidian
  const isTransparent = isHome && !isScrolled;

  const textColor = isTransparent ? 'text-white' : 'text-obsidian';
  const borderColor = isTransparent ? 'border-white/30' : 'border-black/10';
  const logoFilter = isTransparent ? 'invert' : ''; // Logo is dark by default, invert makes it white
  const hoverColor = 'hover:text-gold';

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-cream/90 backdrop-blur-xl py-4 border-b border-black/5 shadow-sm' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="container mx-auto px-6 lg:px-12 h-full flex items-center justify-between relative">
        
        {/* LEFT: Logo & Phone */}
        <div className="z-20 flex flex-col items-start">
          <Link to="/" className="block group">
            <img 
              src={BRAND.logo} 
              alt="AK BROTHERS" 
              className={`transition-all duration-500 h-10 md:h-12 object-contain ${logoFilter} opacity-90 group-hover:opacity-100`}
            />
          </Link>
          <span className={`hidden md:block text-[8px] tracking-[0.2em] font-cinzel mt-2 ${isTransparent ? 'text-white/70' : 'text-charcoal/60'}`}>
            CALL: +91 {BRAND.phone}
          </span>
        </div>

        {/* CENTER: Desktop Navigation */}
        <div className={`hidden lg:flex items-center gap-8 xl:gap-12 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}>
           {desktopLinks.map(link => (
             <Link 
               key={link.path} 
               to={link.path}
               className={`text-[10px] xl:text-xs font-cinzel uppercase tracking-[0.25em] transition-colors duration-300 ${textColor} ${hoverColor}`}
             >
               {link.name}
             </Link>
           ))}
        </div>

        {/* RIGHT: Office Button & Mobile Toggle */}
        <div className="flex items-center gap-6 z-20">
           {/* Desktop Contact Button */}
           <Link 
             to="/office" 
             className={`hidden lg:block border px-6 py-2 text-[10px] font-cinzel uppercase tracking-[0.25em] transition-all duration-300 ${textColor} ${borderColor} hover:bg-gold hover:border-gold hover:text-white`}
           >
             Contact
           </Link>

           {/* Mobile Hamburger */}
           <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden ${textColor} hover:scale-110 transition-transform`}>
             {isOpen ? <X size={28} className="text-obsidian" /> : <Menu size={28} />}
           </button>
        </div>
      </div>

      {/* FULL SCREEN MENU OVERLAY (Mobile) */}
      <div className={`fixed inset-0 bg-cream z-[110] flex flex-col items-center justify-center space-y-10 transition-transform duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-gold p-2 hover:rotate-90 transition-transform">
          <X size={32} />
        </button>
        <Link to="/" className="font-cinzel text-2xl tracking-[0.4em] uppercase text-obsidian hover:text-gold">Home</Link>
        {desktopLinks.map((link) => (
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
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
