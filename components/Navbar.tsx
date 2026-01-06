
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

  // Logic for text color & logo visibility
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  // Invert logo color (White -> Black) when on light background
  const logoFilter = isTransparent ? '' : 'invert';
  const menuColor = isTransparent ? 'text-white' : 'text-gold';

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-cream/90 backdrop-blur-xl py-4 border-b border-black/5 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between relative">
        
        {/* CENTER: Logo (Absolute positioning for true center) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <Link to="/" className="block group">
            <img 
              src={BRAND.logo} 
              alt="AK BROTHERS" 
              className={`transition-all duration-500 ${isScrolled ? 'h-12' : 'h-16'} group-hover:scale-105 ${logoFilter}`}
            />
          </Link>
        </div>

        {/* LEFT: Spacer to balance layout */}
        <div></div>

        {/* RIGHT: Hamburger Menu (Always Visible) */}
        <div className="flex items-center gap-5 z-20">
           <button onClick={() => setIsOpen(!isOpen)} className={`${menuColor} hover:scale-110 transition-transform`}>
             {isOpen ? <X size={28} className="text-obsidian" /> : <Menu size={28} />}
           </button>
        </div>
      </div>

      {/* FULL SCREEN MENU OVERLAY */}
      <div className={`fixed inset-0 bg-cream z-[110] flex flex-col items-center justify-center space-y-10 transition-transform duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-gold p-2 hover:rotate-90 transition-transform">
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
