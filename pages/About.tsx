
import React, { useState } from 'react';
import { Camera, Heart, Film, Play, Award } from 'lucide-react';
import { useContent } from '../context/ContentContext.tsx';
import VideoModal from '../components/VideoModal.tsx';

const About: React.FC = () => {
  const { content } = useContent();
  const { about } = content;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Smart Content Parser
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmed = line.trim();
      
      // Detect Headers (All Uppercase and specific keywords)
      if (trimmed.match(/^(OUR PHILOSOPHY|WHAT MAKES US DIFFERENT|MEET THE FOUNDER|OUR PROMISE|LET’S CREATE SOMETHING BEAUTIFUL|AK BROTHERS PHOTOGRAPHY)$/) || (trimmed === trimmed.toUpperCase() && trimmed.length > 10 && !trimmed.startsWith('✔️') && !trimmed.startsWith('✨'))) {
        return (
          <h3 key={index} className="font-cinzel text-gold text-lg md:text-2xl tracking-[0.2em] uppercase mt-8 md:mt-12 mb-6 md:mb-8 pb-4 border-b border-gold/20 inline-block">
            {line}
          </h3>
        );
      }

      // Detect List Items
      if (trimmed.startsWith('✔️') || trimmed.startsWith('✨') || trimmed.startsWith('-')) {
        return (
          <div key={index} className="flex gap-4 md:gap-6 mb-4 items-start pl-2 md:pl-4 group">
            <span className="text-gold shrink-0 mt-1 transform group-hover:scale-125 transition-transform duration-300">{trimmed.substring(0, 2).replace(/[a-zA-Z]/g, '') || '•'}</span>
            <p className="text-charcoal/80 font-light text-base md:text-lg leading-relaxed">
               {trimmed.replace(/^[✔️✨-]\s*/, '')}
            </p>
          </div>
        );
      }

      // Empty Lines
      if (trimmed === '') return <br key={index} className="block content-[''] h-4" />;

      // Standard Paragraph
      return (
        <p key={index} className="text-charcoal font-light text-base md:text-xl leading-loose mb-4 tracking-wide text-justify">
          {line}
        </p>
      );
    });
  };

  const images = about.images || [];

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-cream">
      {/* Hero Header */}
      <section className="px-6 md:px-20 mb-12 md:mb-20 text-center relative z-10">
        <span className="text-gold font-cinzel text-[10px] tracking-[1em] uppercase mb-4 md:mb-6 block opacity-80">{about.subtitle}</span>
        <h2 className="font-cinzel text-4xl md:text-8xl text-obsidian tracking-tighter leading-none mb-8 md:mb-10">{about.title}</h2>
        <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8 md:mb-10" />
      </section>

      <section className="container mx-auto px-6 md:px-20 mb-20 md:mb-32">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-start">
          
          {/* LEFT: Artistic Collage (Sticky) */}
          <div className="lg:w-5/12 lg:sticky lg:top-32 w-full order-1 lg:order-1">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
               {/* Main Portrait */}
               <div className="col-span-2 relative group overflow-hidden bg-gray-200 aspect-[4/5] shadow-2xl border border-white/50">
                  <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 z-10 transition-transform duration-700 group-hover:scale-95 pointer-events-none" />
                  <img 
                    src={images[0]} 
                    alt="Founder Main" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <span className="bg-black/40 backdrop-blur-md text-white px-4 py-2 font-cinzel text-[10px] tracking-widest uppercase border border-white/20">The Visionary</span>
                  </div>
               </div>

               {/* Secondary Image 1 */}
               <div className="relative group overflow-hidden bg-gray-200 aspect-square mt-4 md:mt-8 shadow-xl">
                  <img 
                    src={images[1]} 
                    alt="Detail 1" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
               </div>

               {/* Secondary Image 2 */}
               <div className="relative group overflow-hidden bg-gray-200 aspect-square mt-4 md:mt-0 shadow-xl">
                  <img 
                    src={images[2]} 
                    alt="Detail 2" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-obsidian/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               </div>

               {/* Wide Image */}
               {images[3] && (
                  <div className="col-span-2 relative group overflow-hidden bg-gray-200 aspect-[16/9] mt-2 md:mt-4 shadow-xl border-t-4 border-gold/10">
                    <img 
                        src={images[3]} 
                        alt="Lifestyle" 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                        <Camera className="text-white/80 w-12 h-12" strokeWidth={1} />
                     </div>
                  </div>
               )}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 mt-8 md:mt-12 pt-8 border-t border-black/5">
              <div className="text-center group cursor-default">
                <Camera size={24} className="text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-charcoal/50 text-[9px] uppercase tracking-widest">Vision</p>
              </div>
              <div className="text-center group cursor-default">
                <Award size={24} className="text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-charcoal/50 text-[9px] uppercase tracking-widest">Excellence</p>
              </div>
              <div className="text-center group cursor-default">
                <Heart size={24} className="text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-charcoal/50 text-[9px] uppercase tracking-widest">Passion</p>
              </div>
            </div>
          </div>
          
          {/* RIGHT: Content */}
          <div className="lg:w-7/12 space-y-2 pb-10 md:pb-20 relative order-2 lg:order-2">
             <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-black/5 hidden lg:block" />
             {renderFormattedText(about.description)}
             
             <div className="pt-10 md:pt-16 mt-10 md:mt-16 border-t border-black/5">
                <p className="font-cinzel text-xl md:text-3xl text-obsidian italic">"Every frame is a promise kept forever."</p>
                <p className="text-gold mt-4 text-sm tracking-widest uppercase">— Akash, Founder</p>
             </div>
          </div>

        </div>
      </section>

      {/* Videos Section */}
      {about.videos && about.videos.length > 0 && (
        <section className="container mx-auto px-6 md:px-20 mb-32 border-t border-black/5 pt-12 md:pt-20">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-gold font-cinzel text-[10px] tracking-[0.5em] uppercase block mb-4">Behind The Scenes</span>
            <h3 className="font-cinzel text-3xl md:text-4xl text-obsidian">The Process</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {about.videos.map((vid, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedVideo(vid)}
                className="relative aspect-video bg-black/5 border border-black/10 group cursor-pointer overflow-hidden shadow-lg"
              >
                 <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-cover bg-center grayscale group-hover:grayscale-0" style={{ backgroundImage: `url(${images[0]})` }}></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500 scale-90 group-hover:scale-100">
                      <Play size={24} fill="currentColor" />
                    </div>
                 </div>
                 <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-xs font-cinzel tracking-widest uppercase">Watch Video {index + 1}</p>
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} videoUrl={selectedVideo || ''} />
    </div>
  );
};

export default About;
