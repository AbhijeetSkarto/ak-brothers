
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext.tsx';
import { THEME_EFFECTS } from '../constants.tsx';

gsap.registerPlugin(ScrollTrigger);

const Stories: React.FC = () => {
  const { content } = useContent();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.header-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Story Cards Animation
      const storyCards = gsap.utils.toArray('.story-card');
      storyCards.forEach((card: any, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [content.stories]);

  return (
    <div ref={containerRef} className="pt-32 md:pt-48 pb-24 bg-cream min-h-screen">
      
      {/* Editorial Header */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 mb-20 md:mb-32 text-center md:text-left">
        <div className="overflow-hidden mb-4">
           <span className="header-reveal block text-gold font-cinzel text-[10px] md:text-xs tracking-[0.6em] uppercase">
             {content.storiesSettings?.subheading || 'Curated Narratives'}
           </span>
        </div>
        <div className="overflow-hidden">
          <h1 className="header-reveal font-cinzel text-5xl md:text-8xl lg:text-[7rem] text-obsidian tracking-tighter leading-none uppercase">
            {content.storiesSettings?.heading || 'Wedding Stories'}
          </h1>
        </div>
        <div className="w-full h-[1px] bg-black/5 mt-10 md:mt-16 header-reveal opacity-0" />
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="space-y-20 md:space-y-32">
          {content.stories.filter(s => s.published).map((story, index) => (
            <div key={story.id} className="story-card group grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              
              {/* Image Side - Alternating Layout */}
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative aspect-[3/4] md:aspect-[4/3] bg-gray-200 overflow-hidden shadow-xl cursor-pointer">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <img 
                    src={story.coverImage} 
                    alt={story.title}
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${THEME_EFFECTS[content.globalEffect]}`}
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-cinzel text-obsidian">
                       {story.couple || 'Wedding Story'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className={`lg:col-span-5 space-y-6 md:space-y-8 ${index % 2 === 1 ? 'lg:order-1 lg:text-right flex flex-col items-end' : 'lg:order-2 lg:text-left'}`}>
                <div>
                   <div className="flex items-center gap-2 text-gold mb-4 opacity-80 text-xs tracking-widest uppercase font-cinzel">
                      <MapPin size={14} /> {story.location}
                   </div>
                   <h2 className="font-cinzel text-3xl md:text-5xl text-obsidian leading-tight mb-6">
                     {story.title}
                   </h2>
                   <div className={`w-16 h-[1px] bg-gold mb-6 ${index % 2 === 1 ? 'ml-auto' : ''}`} />
                </div>
                
                <p className="text-charcoal/70 font-light text-sm md:text-base leading-loose max-w-md tracking-wide">
                  {story.description}
                </p>

                <div className="pt-4">
                  <button className="flex items-center gap-3 text-obsidian border-b border-black/20 pb-1 hover:border-gold hover:text-gold transition-all text-xs tracking-[0.3em] uppercase font-cinzel group-hover:pl-2">
                     Read More <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {content.stories.filter(s => s.published).length === 0 && (
          <div className="text-center py-20 opacity-50">
             <p className="font-cinzel text-lg">No stories published yet.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Stories;
