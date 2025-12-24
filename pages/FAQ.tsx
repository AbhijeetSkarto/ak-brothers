
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { 
    q: 'Do you travel for destination weddings?', 
    a: 'Absolutely! We have captured love stories across 15+ countries. Travel and accommodation are typically handled by the client, but we offer competitive destination packages.' 
  },
  { 
    q: 'How long until we receive our photos?', 
    a: 'We provide a "First Look" teaser gallery (20-30 images) within 7 days. The full high-resolution gallery is typically delivered within 8-10 weeks after thorough post-production.' 
  },
  { 
    q: 'Do you provide raw footage?', 
    a: 'We believe our editing is a crucial part of our art. We do not provide unedited raw files, but we ensure our final deliveries are comprehensive.' 
  },
  { 
    q: 'What is your booking process?', 
    a: 'A 40% advance payment secures your date. The remaining balance is split: 40% on the wedding day and 20% upon delivery of the first set of images.' 
  },
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-40 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <h1 className="font-cinzel text-5xl text-silver mb-6 uppercase tracking-[0.1em]">Inquiry Center</h1>
          <div className="w-20 h-[1px] bg-gold mx-auto mb-10" />
          <p className="text-platinum/60 font-light">Everything you need to know about working with AK BROTHERS.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-white/5 bg-charcoal/30 overflow-hidden">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-white/5"
              >
                <span className="font-cinzel text-lg text-silver">{faq.q}</span>
                <span className="text-gold">
                  {openIdx === idx ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${openIdx === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-8 pt-0 text-platinum font-light leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 text-center border-t border-white/5">
           <h3 className="font-cinzel text-silver mb-4 uppercase tracking-widest">Still have questions?</h3>
           <p className="text-platinum/50 mb-8 text-sm">Our concierge team is available 24/7 for consultation.</p>
           <a href={`mailto:hello@akbrothers.com`} className="text-gold font-cinzel text-xs tracking-widest uppercase border-b border-gold/40 pb-1 hover:border-gold transition-all">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
