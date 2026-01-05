
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND, THEME_EFFECTS } from '../constants.tsx';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { Star } from 'lucide-react';
import { useContent } from '../context/ContentContext.tsx';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();

  const FEATURED: MediaItem[] = content.stories.slice(0, 6).map((img, i) => ({
    id: `f-${i}`,
    type: 'image',
    thumbnail: img,
    likes: `${(4 + Math.random() * 5).toFixed(1)}k`,
    comments: Math.floor(Math.random() * 200 + 50).toString(),
    caption: 'Official AK BROTHERS Story'
  }));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Adjusted animation for the new inline layout
      gsap.from('.hero-word-1 .hero-letter', { opacity: 0, y: 100, rotateX: -90, stagger: 0.05, duration: 1.2, ease: 'expo.out', delay: 0.2 });
      gsap.from('.hero-word-2 .hero-letter', { opacity: 0, y: 100, rotateX: -90, stagger: 0.05, duration: 1.2, ease: 'expo.out', delay: 0.8 }); 
      
      gsap.from('.hero-btns', { opacity: 0, y: 30, duration: 1, delay: 1.5, ease: 'power3.out' });
      gsap.utils.toArray('.reveal').forEach((el: any) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1.2,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [content]); // Re-run if layout changes

  const renderLetters = (text: string, customClass: string = "") => {
    return text.split("").map((char, i) => (
      <span key={i} className={`hero-letter inline-block ${customClass}`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const getHeroEffect = () => {
    return THEME_EFFECTS[content.globalEffect] || '';
  };

  const renderHeroContent = () => {
    if (content.homeLayout === 'editorial') {
        // Editorial: Split Screen
        return (
          <div className="relative h-screen flex flex-col md:flex-row bg-cream">
             <div className="md:w-1/2 flex items-center justify-center p-12 order-2 md:order-1 z-10">
                <div className="text-left">
                   <h1 className="flex flex-col gap-4 mb-8 leading-none">
                     <div className="hero-word-1 font-cinzel text-5xl md:text-7xl text-obsidian tracking-tighter flex">
                       {renderLetters(content.heroTitle)}
                     </div>
                     <div className="hero-word-2 font-cinzel text-5xl md:text-7xl text-gold italic tracking-tight flex">
                       {renderLetters(content.heroSubtitle, "italic")}
                     </div>
                   </h1>
                   <div className="hero-btns flex gap-6">
                     <Link to="/stories" className="border border-obsidian px-8 py-3 text-obsidian font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-obsidian hover:text-white transition-all">
                       Stories
                     </Link>
                     <Link to="/contact" className="bg-gold px-8 py-3 text-white font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-obsidian transition-all">
                       Inquire
                     </Link>
                   </div>
                </div>
             </div>
             <div className="md:w-1/2 h-1/2 md:h-full relative overflow-hidden order-1 md:order-2">
                <div className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${getHeroEffect()}`} style={{ backgroundImage: `url(${content.heroImage})` }} />
             </div>
          </div>
        );
    }
    
    if (content.homeLayout === 'framed') {
        // Framed: Boxed image with overlapping text
        return (
          <section className="relative h-screen flex items-center justify-center bg-cream p-6 md:p-12">
            <div className={`absolute inset-6 md:inset-12 bg-cover bg-center shadow-2xl ${getHeroEffect()}`} style={{ backgroundImage: `url(${content.heroImage})` }}>
              <div className="absolute inset-0 bg-black/30" />
            </div>
            
            <div className="relative z-10 text-center w-full max-w-[1400px]">
              <h1 className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 gap-y-2 mb-12 leading-none mix-blend-overlay">
                <div className="hero-word-1 font-cinzel text-5xl md:text-8xl xl:text-9xl text-white/90 tracking-tighter flex drop-shadow-xl">
                  {renderLetters(content.heroTitle)}
                </div>
                <div className="hero-word-2 font-cinzel text-5xl md:text-8xl xl:text-9xl text-white/80 italic tracking-tight flex drop-shadow-xl">
                  {renderLetters(content.heroSubtitle, "italic")}
                </div>
              </h1>
              <div className="hero-btns flex justify-center">
                 <Link to="/contact" className="bg-white text-obsidian px-12 py-4 font-cinzel text-[11px] tracking-[0.4em] uppercase hover:bg-gold hover:text-white transition-all shadow-xl">
                   Enter Studio
                 </Link>
              </div>
            </div>
          </section>
        );
    }

    // Default: Classic
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 bg-cover bg-center opacity-90 scale-105 transition-all duration-700 ${getHeroEffect()}`} style={{ backgroundImage: `url(${content.heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-obsidian/40 to-black/30" />
        
        <div className="relative z-10 text-center px-4 w-full max-w-[1400px] mx-auto">
          <h1 className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 gap-y-2 mb-12 leading-none">
            <div className="hero-word-1 font-cinzel text-4xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-tighter flex drop-shadow-2xl">
              {renderLetters(content.heroTitle)}
            </div>
            <div className="hero-word-2 font-cinzel text-4xl md:text-7xl lg:text-8xl xl:text-9xl text-gold italic tracking-tight flex drop-shadow-2xl">
              {renderLetters(content.heroSubtitle, "italic")}
            </div>
          </h1>

          <div className="hero-btns flex flex-wrap gap-8 justify-center items-center">
            <Link to="/stories" className="border border-white/40 px-10 py-4 text-white font-cinzel text-[11px] tracking-[0.3em] uppercase hover:bg-white hover:text-obsidian transition-all duration-500 min-w-[200px] backdrop-blur-sm">
              View Stories
            </Link>
            <Link to="/contact" className="bg-gold border border-gold px-10 py-4 text-obsidian font-cinzel text-[11px] tracking-[0.3em] uppercase hover:bg-transparent hover:text-gold transition-all duration-500 min-w-[200px]">
              Inquiry
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-pulse" />
        </div>
      </section>
    );
  };

  return (
    <div ref={containerRef} className="bg-cream">
      {renderHeroContent()}

      <section className="py-40 px-6 reveal text-center bg-cream">
        <div className="max-w-4xl mx-auto">
           <Star className="text-gold mx-auto mb-10" size={24} />
           <h2 className="font-cinzel text-3xl md:text-6xl text-obsidian mb-10 leading-tight">Capturing moments that <span className="text-gold italic">echo</span> through generations.</h2>
           <p className="text-charcoal/60 text-xs md:text-sm font-medium tracking-[0.3em] leading-loose uppercase max-w-2xl mx-auto">Bhopal's premier wedding photography office.<br/>Specializing in high-contrast luxury storytelling.</p>
        </div>
      </section>

      <div className="reveal">
        <InstagramGrid items={FEATURED} title="Signature Feed" subtitle="Curated Highlights" />
      </div>

      <section className="py-56 text-center relative overflow-hidden reveal bg-cream">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
        <h2 className="relative z-10 font-cinzel text-4xl md:text-7xl text-obsidian mb-16 tracking-tighter">Your Story is Next</h2>
        <Link to="/contact" className="relative z-10 inline-block bg-gold px-20 py-7 text-white font-cinzel text-[11px] tracking-[0.5em] uppercase hover:bg-obsidian hover:text-gold transition-all duration-500 shadow-xl">Book Consultation</Link>
      </section>
    </div>
  );
};

export default Home;
