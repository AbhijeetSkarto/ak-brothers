
import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Heart, Film, Play, Award } from 'lucide-react';
import { useContent } from '../context/ContentContext.tsx';
import VideoModal from '../components/VideoModal.tsx';
import { THEME_EFFECTS } from '../constants.tsx';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const { content } = useContent();
  const { about } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-text', { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' });
      
      // Section Reveals
      gsap.utils.toArray('.reveal-block').forEach((el: any) => {
        gsap.from(el, {
           y: 40, opacity: 0, duration: 1.2, ease: 'power2.out',
           scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const renderText = (text: string) => {
      if (!text) return null;
      return text.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="text-charcoal/80 font-light text-base md:text-lg leading-loose mb-6 text-justify">
              {paragraph}
          </p>
      ));
  };

  const images = about.images || [];

  return (
    <div ref={containerRef} className="pt-32 md:pt-48 pb-24 bg-cream min-h-screen">
       
       {/* 1. HERO HEADER */}
       <section className="container mx-auto px-6 md:px-20 mb-20 md:mb-32 text-center">
          <span className="hero-text text-gold font-cinzel text-[10px] md:text-xs tracking-[1em] uppercase block mb-6 opacity-80">{about.subtitle}</span>
          <h1 className="hero-text font-cinzel text-5xl md:text-8xl text-obsidian tracking-tighter leading-none mb-8 uppercase">{about.title}</h1>
          <div className="hero-text w-24 h-[1px] bg-gold mx-auto opacity-50"></div>
       </section>

       {/* 2. EDITORIAL LAYOUT */}
       <section className="container mx-auto px-6 md:px-20 mb-20 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
             
             {/* LEFT COLUMN: Sticky Image Collage */}
             <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-4 reveal-block">
                {/* Main Brand Image */}
                <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative shadow-2xl group border border-white/40">
                   <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                   <img 
                     src={images[0]} 
                     alt="Brand Philosophy" 
                     className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${THEME_EFFECTS[content.globalEffect]}`} 
                   />
                   <div className="absolute bottom-6 left-6 z-20">
                      <span className="bg-white/95 backdrop-blur-md px-4 py-2 font-cinzel text-[10px] tracking-widest uppercase text-obsidian shadow-sm border border-black/5">
                        The Studio
                      </span>
                   </div>
                </div>

                {/* Secondary Grid */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="aspect-square bg-gray-200 overflow-hidden shadow-lg relative group">
                      <img 
                        src={images[1]} 
                        alt="Founder" 
                        className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ${THEME_EFFECTS[content.globalEffect]}`} 
                      />
                   </div>
                   <div className="aspect-square bg-obsidian flex flex-col items-center justify-center text-gold text-center p-4 shadow-lg border border-gold/10">
                      <Award size={28} className="mb-3 opacity-80" strokeWidth={1} />
                      <span className="font-cinzel text-3xl block leading-none mb-1">7+</span>
                      <span className="text-[8px] uppercase tracking-widest opacity-60">Years Exp.</span>
                   </div>
                </div>
             </div>

             {/* RIGHT COLUMN: Narrative Content */}
             <div className="lg:col-span-7 space-y-16 reveal-block">
                
                {/* Philosophy */}
                <div>
                   <h3 className="font-cinzel text-3xl text-obsidian mb-8 flex items-center gap-4">
                     <span className="w-8 h-[1px] bg-gold"></span> Our Philosophy
                   </h3>
                   {renderText(about.description)}
                </div>

                {/* Founder Section */}
                {about.founderBio && (
                   <div className="bg-white p-8 md:p-12 border border-black/5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gold opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute -right-10 -top-10 text-black/[0.02] font-cinzel text-9xl pointer-events-none select-none">ART</div>
                      
                      <h3 className="font-cinzel text-2xl text-obsidian mb-6">The Artist</h3>
                      <div className="text-charcoal/70 font-light italic text-lg leading-relaxed mb-8">
                         {renderText(about.founderBio)}
                      </div>
                      
                      <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                         <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <img src={images[1] || images[0]} className="w-full h-full object-cover grayscale" />
                         </div>
                         <div>
                            <span className="font-cinzel text-gold text-sm tracking-widest uppercase font-bold block">Akash</span>
                            <span className="text-[9px] uppercase tracking-widest text-charcoal/50 block">Founder & Creative Director</span>
                         </div>
                      </div>
                   </div>
                )}
                
                {/* Stats / Values */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-black/5">
                   <div className="text-center group">
                      <Camera size={24} className="mx-auto mb-3 text-gold/70 group-hover:text-gold transition-colors" strokeWidth={1} />
                      <span className="font-cinzel text-[9px] tracking-widest uppercase text-obsidian">Visionary</span>
                   </div>
                   <div className="text-center group">
                      <Film size={24} className="mx-auto mb-3 text-gold/70 group-hover:text-gold transition-colors" strokeWidth={1} />
                      <span className="font-cinzel text-[9px] tracking-widest uppercase text-obsidian">Cinematic</span>
                   </div>
                   <div className="text-center group">
                      <Heart size={24} className="mx-auto mb-3 text-gold/70 group-hover:text-gold transition-colors" strokeWidth={1} />
                      <span className="font-cinzel text-[9px] tracking-widest uppercase text-obsidian">Timeless</span>
                   </div>
                </div>

                {/* Signature Quote */}
                <div className="text-center py-10 bg-black/5 px-8 relative">
                   <span className="font-serif text-6xl text-gold/20 absolute top-4 left-4">“</span>
                   <p className="font-cinzel text-xl md:text-2xl text-obsidian italic relative z-10">
                     "Every frame is a promise kept forever."
                   </p>
                </div>
             </div>
          </div>
       </section>
       
       {/* 3. BEHIND THE SCENES VIDEOS */}
       {about.videos && about.videos.length > 0 && (
        <section className="container mx-auto px-6 md:px-20 mb-32 pt-20 border-t border-black/5 reveal-block">
          <div className="text-center mb-16">
            <span className="text-gold font-cinzel text-[10px] tracking-[0.5em] uppercase block mb-4">Behind The Scenes</span>
            <h3 className="font-cinzel text-3xl md:text-4xl text-obsidian">The Creative Process</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <p className="text-white text-xs font-cinzel tracking-widest uppercase">Watch BTS {index + 1}</p>
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
