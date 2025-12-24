
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram } from 'lucide-react';
import { WHATSAPP_NUMBER, BRAND } from '../constants';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', date: '', location: '', message: '' });

  const handleWhatsApp = () => {
    const text = `Hi AK BROTHERS! I'd like to inquire about booking my wedding on ${formState.date || '[Date]'}. My name is ${formState.name || '[Name]'}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-48 pb-32 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6">
        <header className="mb-24">
           <span className="text-gold font-cinzel text-xs tracking-[1em] uppercase block mb-6">Concierge</span>
           <h1 className="font-cinzel text-5xl md:text-8xl text-silver tracking-tighter leading-none mb-10">
             RESERVE <br /><span className="text-gold italic">YOUR DATE</span>
           </h1>
           <div className="w-24 h-[1px] bg-gold opacity-30" />
        </header>

        <div className="grid lg:grid-cols-2 gap-32">
          {/* Info Side */}
          <div className="space-y-20">
            <div>
              <p className="text-platinum/60 text-lg font-light leading-relaxed max-w-md mb-12">
                We take on a limited number of commissions each year to ensure every film receives the artistic attention it deserves.
              </p>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-2">
                  <h4 className="text-[10px] text-gold font-cinzel tracking-widest uppercase opacity-60">Studio</h4>
                  <p className="text-silver text-sm leading-relaxed">{BRAND.address}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] text-gold font-cinzel tracking-widest uppercase opacity-60">Inquiries</h4>
                  <p className="text-silver text-sm">{BRAND.email}</p>
                  <p className="text-silver text-sm">+91 {BRAND.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <button 
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-4 bg-green-600/10 border border-green-600/30 hover:bg-green-600 text-green-500 hover:text-white px-10 py-6 font-cinzel text-[10px] tracking-[0.3em] uppercase transition-all"
              >
                <MessageCircle size={18} /> WhatsApp Concierge
              </button>
              <a 
                href={BRAND.instagram}
                target="_blank"
                className="flex items-center justify-center gap-4 border border-white/10 hover:border-gold px-10 py-6 font-cinzel text-[10px] tracking-[0.3em] uppercase transition-all"
              >
                <Instagram size={18} /> Follow Artistry
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-charcoal/50 p-12 md:p-16 border border-white/5 relative">
            <div className="absolute top-0 left-0 w-1 h-12 bg-gold" />
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[9px] tracking-[0.4em] uppercase text-gold/60 font-cinzel">Full Name</label>
                <input 
                  type="text" 
                  placeholder="The Distinguished Guest"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-silver focus:outline-none focus:border-gold transition-colors text-sm" 
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[9px] tracking-[0.4em] uppercase text-gold/60 font-cinzel">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-silver focus:outline-none focus:border-gold transition-colors text-sm" 
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] tracking-[0.4em] uppercase text-gold/60 font-cinzel">Ceremony Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-transparent border-b border-white/10 py-3 text-silver focus:outline-none focus:border-gold transition-colors text-sm" 
                    onChange={(e) => setFormState({...formState, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] tracking-[0.4em] uppercase text-gold/60 font-cinzel">Describe Your Vision</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about your love story..."
                  className="w-full bg-transparent border-b border-white/10 py-3 text-silver focus:outline-none focus:border-gold transition-colors text-sm resize-none" 
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
              </div>

              <button className="w-full bg-gold text-obsidian px-10 py-6 font-cinzel text-[11px] tracking-[0.5em] uppercase hover:bg-white transition-all shadow-2xl">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
