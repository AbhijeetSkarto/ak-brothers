
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND } from '../constants.tsx';
import { useContent } from '../context/ContentContext.tsx';

const Footer: React.FC = () => {
  const { content } = useContent();
  const { contact } = content;

  return (
    <footer className="bg-cream border-t border-black/5 py-24">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24">
          <div className="col-span-1 md:col-span-2">
            <Link to="/">
              <img src={BRAND.logo} alt="AK BROTHERS" className="h-20 mb-10 opacity-90 hover:opacity-100 transition-opacity invert" />
            </Link>
            <p className="text-charcoal/80 max-w-md font-light leading-loose text-sm tracking-wide">
              Crafting cinematic legacies for the world's most distinguished couples. AK BROTHERS specializes in high-contrast, emotional storytelling that transcends time.
            </p>
            <div className="flex space-x-6 mt-12">
              <a href={contact.instagram} target="_blank" className="text-obsidian hover:text-gold transition-all hover:scale-110"><Instagram size={24} /></a>
              <a href="#" className="text-obsidian hover:text-gold transition-all hover:scale-110"><Youtube size={24} /></a>
              <a href="#" className="text-obsidian hover:text-gold transition-all hover:scale-110"><Facebook size={24} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-cinzel text-gold text-xs tracking-[0.4em] uppercase mb-10">Portfolio</h4>
            <ul className="space-y-5 text-[11px] tracking-[0.2em] uppercase text-charcoal/80">
              <li><Link to="/images" className="hover:text-gold transition-colors">Portraits</Link></li>
              <li><Link to="/stories" className="hover:text-gold transition-colors">Wedding Stories</Link></li>
              <li><Link to="/films" className="hover:text-gold transition-colors">Films</Link></li>
              <li><Link to="/pre-weddings" className="hover:text-gold transition-colors">Pre-Weddings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-gold text-xs tracking-[0.4em] uppercase mb-10">Bhopal Studio</h4>
            <div className="space-y-6 text-sm text-charcoal/80 font-light leading-loose">
              <p className="flex items-start gap-3">
                <MapPin size={20} className="text-gold flex-shrink-0 mt-1" /> 
                <span className="whitespace-pre-line">{contact.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={18} className="text-gold" /> {contact.email}
              </p>
              <p className="flex items-center gap-3">
                <Phone size={18} className="text-gold" /> +91 {contact.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-[0.5em] uppercase text-charcoal/40 font-cinzel">
          <p>© 2024 AK BROTHERS CINEMATOGRAPHY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 items-center">
            <Link to="/faq" className="hover:text-gold transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-gold transition-colors">Booking</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
