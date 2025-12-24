
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

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-obsidian/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group">
          <img 
            src={BRAND.logo} 
            alt="AK BROTHERS" 
            className={`transition-all duration-500 ${isScrolled ? 'h-10' : 'h-14'} group-hover:scale-105`}
          />
          <span className="hidden sm:block font-cinzel text-xs tracking-[0.4em] text-silver group-hover:text-gold transition-colors">AK BROTHERS</span>
        </Link>

        <div className="hidden lg:flex items-center space-x-10">
          {NAV_SECTIONS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-cinzel text-[10px] tracking-[0.2em] uppercase transition-all hover:text-gold ${location.pathname === link.path ? 'text-gold' : 'text-platinum/60'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="bg-gold/10 border border-gold/40 px-6 py-2 text-[10px] tracking-[0.3em] uppercase text-gold hover:bg-gold hover:text-obsidian transition-all"
          >
            Connect
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gold hover:scale-110 transition-transform">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`fixed inset-0 bg-obsidian z-[110] flex flex-col items-center justify-center space-y-10 transition-transform duration-700 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-gold p-2">
          <X size={32} />
        </button>
        <Link to="/" className="font-cinzel text-2xl tracking-[0.4em] uppercase text-silver hover:text-gold">Home</Link>
        {NAV_SECTIONS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="font-cinzel text-2xl tracking-[0.4em] uppercase text-silver hover:text-gold"
          >
            {link.name}
          </Link>
        ))}
        <Link 
          to="/contact" 
          className="border border-gold px-12 py-4 text-sm tracking-[0.4em] uppercase text-gold hover:bg-gold hover:text-obsidian"
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
