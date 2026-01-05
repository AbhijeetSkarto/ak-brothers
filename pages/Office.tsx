
import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Clock } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants.tsx';
import { useContent } from '../context/ContentContext.tsx';

const Office: React.FC = () => {
  const { content } = useContent();
  const { contact } = content;
  const [formState, setFormState] = useState({ name: '', email: '', date: '', message: '' });

  const handleWhatsApp = () => {
    const text = `Hi AK BROTHERS! I'd like to visit your office or inquire about booking. My name is ${formState.name || '[Name]'}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-40 min-h-screen bg-cream">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
            <span className="text-gold font-cinzel text-xs tracking-[1em] uppercase block mb-6">Headquarters</span>
            <h1 className="font-cinzel text-6xl md:text-8xl text-obsidian tracking-tighter leading-none mb-4">THE OFFICE</h1>
            <div className="w-24 h-[1px] bg-gold mx-auto opacity-50 mt-10" />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start max-w-7xl mx-auto mb-32">
            
            {/* Left: Location & Info */}
            <div className="space-y-16">
                <div>
                   <h3 className="font-cinzel text-2xl text-obsidian mb-8 flex items-center gap-4"><MapPin className="text-gold" size={28}/> Studio Location</h3>
                   <p className="text-charcoal/80 font-manrope font-light leading-loose text-lg whitespace-pre-line border-l-2 border-gold pl-6">
                     {contact.address}
                   </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-white p-8 border border-black/5 shadow-sm">
                      <h4 className="font-cinzel text-xs text-obsidian uppercase tracking-widest mb-6 flex items-center gap-3">
                        <Phone size={16} className="text-gold"/> Contact
                      </h4>
                      <p className="text-charcoal/70 text-sm mb-2">+91 {contact.phone}</p>
                      <p className="text-charcoal/70 text-sm">{contact.email}</p>
                   </div>
                   <div className="bg-white p-8 border border-black/5 shadow-sm">
                      <h4 className="font-cinzel text-xs text-obsidian uppercase tracking-widest mb-6 flex items-center gap-3">
                        <Clock size={16} className="text-gold"/> Hours
                      </h4>
                      <p className="text-charcoal/70 text-sm mb-2">Mon - Sat: 11:00 AM - 8:00 PM</p>
                      <p className="text-charcoal/70 text-sm">Sun: By Appointment</p>
                   </div>
                </div>

                <div className="relative aspect-video bg-gray-200 border border-black/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-xl group overflow-hidden">
                   <iframe 
                     width="100%" 
                     height="100%" 
                     frameBorder="0" 
                     scrolling="no" 
                     marginHeight={0} 
                     marginWidth={0} 
                     src="https://maps.google.com/maps?q=House%20no%2078%20Bhavani%20Dham,%20Phase-2,%20Ayodhya%20Bypass%20Road,%20Narela%20Shankri.%20Bhopal&t=&z=15&ie=UTF8&iwloc=&output=embed"
                     className="w-full h-full"
                     title="Office Map"
                   ></iframe>
                   <div className="absolute inset-0 pointer-events-none border-[10px] border-white/20"></div>
                </div>
            </div>
            
            {/* Right: Inquiry Form */}
            <div className="bg-white p-10 md:p-14 border border-black/5 relative shadow-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
                <h3 className="font-cinzel text-2xl text-obsidian mb-2">Book an Appointment</h3>
                <p className="text-charcoal/50 text-xs uppercase tracking-widest mb-10">Visit us or start your journey online</p>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 font-cinzel">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-cream/30 border-b border-black/10 py-3 px-2 text-obsidian focus:outline-none focus:border-gold transition-colors text-sm" 
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 font-cinzel">Email</label>
                      <input 
                        type="email" 
                        className="w-full bg-cream/30 border-b border-black/10 py-3 px-2 text-obsidian focus:outline-none focus:border-gold transition-colors text-sm" 
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 font-cinzel">Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-cream/30 border-b border-black/10 py-3 px-2 text-obsidian focus:outline-none focus:border-gold transition-colors text-sm" 
                        onChange={(e) => setFormState({...formState, date: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 font-cinzel">Message</label>
                    <textarea 
                      rows={4} 
                      className="w-full bg-cream/30 border-b border-black/10 py-3 px-2 text-obsidian focus:outline-none focus:border-gold transition-colors text-sm resize-none" 
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    />
                  </div>

                  <div className="pt-6 flex flex-col gap-4">
                      <button className="w-full bg-gold text-white px-8 py-5 font-cinzel text-[11px] tracking-[0.4em] uppercase hover:bg-obsidian transition-all shadow-lg">
                        Submit Request
                      </button>
                      <button 
                        onClick={handleWhatsApp}
                        className="flex items-center justify-center gap-3 w-full border border-green-600/20 text-green-800 px-8 py-4 font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-green-50 transition-all"
                      >
                        <MessageCircle size={16} /> WhatsApp Us
                      </button>
                  </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Office;
