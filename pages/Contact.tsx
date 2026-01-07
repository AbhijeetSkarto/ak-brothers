
import React, { useState } from 'react';
import { MessageCircle, Instagram, MapPin, Mail, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants.tsx';
import { useContent } from '../context/ContentContext.tsx';

const Contact: React.FC = () => {
  const { content } = useContent();
  const { contact } = content;
  const [formState, setFormState] = useState({ 
    brideFirst: '', brideLast: '', 
    groomFirst: '', groomLast: '', 
    weddingDates: '', 
    eventDetails: '', 
    venue: '', 
    phone: '', 
    email: '' 
  });

  const handleWhatsApp = () => {
    const text = `Hi AK BROTHERS! I'd like to inquire about booking my wedding.
    
Mandatory Details:
- Bride: ${formState.brideFirst} ${formState.brideLast}
- Groom: ${formState.groomFirst} ${formState.groomLast}
- Dates: ${formState.weddingDates}
- Venue: ${formState.venue}
- Contact: ${formState.phone}
- Email: ${formState.email}

Event Vision: ${formState.eventDetails}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-32 md:pt-48 pb-20 md:pb-32 bg-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-12 md:mb-20">
           <span className="text-gold font-cinzel text-xs tracking-[1em] uppercase block mb-4 md:mb-6">Concierge</span>
           <h1 className="font-cinzel text-4xl md:text-8xl text-obsidian tracking-tighter leading-none mb-6">
             RESERVE <br /><span className="text-gold italic">YOUR DATE</span>
           </h1>
           <div className="w-16 md:w-24 h-[1px] bg-gold opacity-50" />
        </header>

        <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-8">
              <p className="text-charcoal/70 text-base font-light leading-relaxed">
                We take on a limited number of commissions each year to ensure every film receives the artistic attention it deserves.
              </p>
              
              <div className="space-y-6 pt-6 border-t border-black/5">
                <div className="flex items-start gap-4">
                  <MapPin className="text-gold shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="text-[10px] text-gold font-cinzel tracking-widest uppercase mb-1">Studio</h4>
                    <p className="text-obsidian text-xs leading-relaxed whitespace-pre-line">{contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-gold shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="text-[10px] text-gold font-cinzel tracking-widest uppercase mb-1">Inquiries</h4>
                    <p className="text-obsidian text-xs">{contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-gold shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="text-[10px] text-gold font-cinzel tracking-widest uppercase mb-1">Direct</h4>
                    <p className="text-obsidian text-xs">+91 {contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-4 bg-green-600 text-white px-8 py-5 font-cinzel text-[10px] tracking-[0.3em] uppercase transition-all hover:bg-obsidian shadow-lg"
              >
                <MessageCircle size={18} /> WhatsApp Concierge
              </button>
              <a 
                href={contact.instagram}
                target="_blank"
                className="flex items-center justify-center gap-4 border border-black/10 hover:border-gold px-8 py-5 font-cinzel text-[10px] tracking-[0.3em] uppercase transition-all text-charcoal hover:bg-gold hover:text-white"
              >
                <Instagram size={18} /> Follow Our Journey
              </a>
            </div>
          </div>

          {/* Form Side - New Mandatory Format */}
          <div className="lg:col-span-8 bg-white p-8 md:p-14 border border-black/5 shadow-sm relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gold opacity-30" />
            
            <div className="mb-12">
               <h2 className="font-cinzel text-xl text-obsidian tracking-[0.2em] uppercase border-b border-black/10 pb-4 mb-1">Mandatory Details</h2>
               <div className="w-24 h-[1px] bg-gold -mt-[1px]" />
            </div>

            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              
              {/* Bride Details */}
              <div className="space-y-6">
                <h3 className="font-cinzel text-xs tracking-widest text-obsidian uppercase font-bold">Bride <span className="text-gold/60 normal-case font-light">(required)</span></h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 font-manrope">First Name</label>
                    <input type="text" className="w-full bg-transparent border border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors" onChange={(e) => setFormState({...formState, brideFirst: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 font-manrope">Last Name</label>
                    <input type="text" className="w-full bg-transparent border border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors" onChange={(e) => setFormState({...formState, brideLast: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Groom Details */}
              <div className="space-y-6">
                <h3 className="font-cinzel text-xs tracking-widest text-obsidian uppercase font-bold">Groom <span className="text-gold/60 normal-case font-light">(required)</span></h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 font-manrope">First Name</label>
                    <input type="text" className="w-full bg-transparent border border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors" onChange={(e) => setFormState({...formState, groomFirst: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 font-manrope">Last Name</label>
                    <input type="text" className="w-full bg-transparent border border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors" onChange={(e) => setFormState({...formState, groomLast: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Wedding Dates */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-xs tracking-widest text-obsidian uppercase font-bold">Your Wedding Dates <span className="text-gold/60 normal-case font-light">(required)</span></h3>
                <input type="text" placeholder="e.g. 12th - 15th December 2025" className="w-full bg-transparent border border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors" onChange={(e) => setFormState({...formState, weddingDates: e.target.value})} />
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                   <h3 className="font-cinzel text-xs tracking-widest text-obsidian uppercase font-bold">Event Details <span className="text-gold/60 normal-case font-light">(required)</span></h3>
                </div>
                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">What are the tentative events / functions / timings per day</p>
                <textarea rows={5} className="w-full bg-transparent border border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors resize-none" onChange={(e) => setFormState({...formState, eventDetails: e.target.value})} />
              </div>

              {/* Venue */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-xs tracking-widest text-obsidian uppercase font-bold">Venue <span className="text-gold/60 normal-case font-light">(required)</span></h3>
                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">Please mention the hotel, city & the country</p>
                <input type="text" className="w-full bg-transparent border border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors" onChange={(e) => setFormState({...formState, venue: e.target.value})} />
              </div>

              {/* Contact Numbers */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-cinzel text-xs tracking-widest text-obsidian uppercase font-bold">Contact Number <span className="text-gold/60 normal-case font-light">(required)</span></h3>
                  <input type="tel" className="w-full bg-transparent border border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors" onChange={(e) => setFormState({...formState, phone: e.target.value})} />
                </div>
                <div className="space-y-4">
                  <h3 className="font-cinzel text-xs tracking-widest text-obsidian uppercase font-bold">Your Email <span className="text-gold/60 normal-case font-light">(required)</span></h3>
                  <input type="email" className="w-full bg-transparent border border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors" onChange={(e) => setFormState({...formState, email: e.target.value})} />
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-obsidian text-gold px-8 py-6 font-cinzel text-[12px] tracking-[0.5em] uppercase hover:bg-gold hover:text-white transition-all shadow-2xl"
                >
                  Confirm & Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
