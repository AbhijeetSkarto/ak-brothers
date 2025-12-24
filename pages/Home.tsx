
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND, GALLERY_DATABASE } from '../constants';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid';
import { Camera, Film, BookOpen, Star, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const FEATURED: MediaItem[] = GALLERY_DATABASE.stories.slice(0, 6).map((img, i) => ({
    id: `f-${i}`,
    type: 'image',
    thumbnail: img,
    likes: `${(4 + Math.random() * 5).toFixed(1)}k`,
    comments: Math.floor(Math.random() * 200 + 50).toString(),
    caption: 'Official AK BROTHERS Story'
  }));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the subtitle
      gsap.from('.hero-sub', { 
        opacity: 0, 
        y: 20, 
        duration: 1, 
        delay: 0.2, 
        ease: 'power3.out' 
      });

      // Letter by letter animation for the main title
      gsap.from('.hero-letter', {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.05,
        duration: 1.2,
        ease: 'expo.out',
        delay: 0.4
      });

      // Entrance for the buttons
      gsap.from('.hero-btns', { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        delay: 1.4, 
        ease: 'power3.out' 
      });

      // Scroll reveal for other sections
      gsap.utils.toArray('.reveal').forEach((el: any) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1.2,
          scrollTrigger: { 
            trigger: el, 
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const renderLetters = (text: string, customClass: string = "") => {
    return text.split("").map((char, i) => (
      <span key={i} className={`hero-letter inline-block ${customClass}`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="bg-obsidian">
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 grayscale-[0.2] scale-105" 
          style={{ backgroundImage: `url(${BRAND.heroBg})` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        
        <div className="relative z-10 text-center px-6 perspective-1000">
          <div className="overflow-hidden mb-6">
            <span className="hero-sub text-gold font-cinzel text-[10px] tracking-[1.2em] uppercase block">
              Cinematic Legacies
            </span>
          </div>
          
          <h1 className="font-cinzel text-5xl md:text-9xl text-white mb-12 tracking-tighter flex flex-wrap justify-center items-center">
            <div className="flex">
              {renderLetters("AK")}
              <span className="inline-block">&nbsp;</span>
              <span className="text-gold italic flex">
                {renderLetters("BROTHERS")}
              </span>
            </div>
          </h1>

          <div className="hero-btns flex flex-wrap gap-6 justify-center">
            <Link to="/stories" className="border border-gold/40 px-12 py-5 text-gold font-cinzel text-[10px] tracking-[0.4em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500">
              View Stories
            </Link>
            <Link to="/contact" className="bg-gold px-12 py-5 text-obsidian font-cinzel text-[10px] tracking-[0.4em] uppercase hover:bg-white transition-all duration-500">
              Inquiry
            </Link>
          </div>
        </div>

        {/* Hero Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-pulse" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-6 reveal">
        <div className="max-w-4xl mx-auto text-center">
           <Star className="text-gold/20 mx-auto mb-10" size={32} />
           <h2 className="font-cinzel text-3xl md:text-5xl text-silver mb-10 leading-tight">
             Capturing moments that <span className="text-gold">echo</span> through generations.
           </h2>
           <p className="text-platinum/40 text-xs md:text-sm font-light tracking-[0.3em] leading-loose uppercase max-w-2xl mx-auto">
             Bhopal's premier wedding cinematography studio. We specialize in luxury storytelling with a focus on high-contrast visuals and raw emotions.
           </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-charcoal/20 border-y border-white/5 reveal">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-20">
          <div className="flex flex-col items-center text-center group">
            <div className="mb-8 p-6 border border-gold/10 rounded-full group-hover:border-gold/40 transition-all duration-500">
              <Camera className="text-gold/60 group-hover:text-gold transition-colors" size={32} strokeWidth={1} />
            </div>
            <h3 className="font-cinzel text-gold text-xs tracking-[0.4em] uppercase mb-4">The Stills</h3>
            <p className="text-platinum/40 text-[13px] leading-relaxed font-light">Fine art portraiture and high-end wedding coverage.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="mb-8 p-6 border border-gold/10 rounded-full group-hover:border-gold/40 transition-all duration-500">
              <Film className="text-gold/60 group-hover:text-gold transition-colors" size={32} strokeWidth={1} />
            </div>
            <h3 className="font-cinzel text-gold text-xs tracking-[0.4em] uppercase mb-4">The Cinema</h3>
            <p className="text-platinum/40 text-[13px] leading-relaxed font-light">4K Cinematic wedding trailers and full documentaries.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="mb-8 p-6 border border-gold/10 rounded-full group-hover:border-gold/40 transition-all duration-500">
              <BookOpen className="text-gold/60 group-hover:text-gold transition-colors" size={32} strokeWidth={1} />
            </div>
            <h3 className="font-cinzel text-gold text-xs tracking-[0.4em] uppercase mb-4">The Book</h3>
            <p className="text-platinum/40 text-[13px] leading-relaxed font-light">Archival grade photobooks printed on premium silk papers.</p>
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <div className="reveal">
        <InstagramGrid 
          items={FEATURED} 
          title="Signature Feed" 
          subtitle="Curated Highlights" 
        />
      </div>

      {/* Call to Action */}
      <section className="py-56 text-center relative overflow-hidden reveal">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <span className="text-gold font-cinzel text-[10px] tracking-[0.8em] uppercase mb-8 block opacity-60">Ready to begin?</span>
        <h2 className="relative z-10 font-cinzel text-4xl md:text-7xl text-white mb-16 tracking-tighter">Your Story is Next</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/contact" className="relative z-10 inline-block bg-gold px-20 py-7 text-obsidian font-cinzel text-[11px] tracking-[0.5em] uppercase hover:bg-white transition-all duration-500 shadow-xl">
            Book Consultation
          </Link>
          <a href={BRAND.instagram} target="_blank" className="relative z-10 flex items-center gap-3 text-silver font-cinzel text-[10px] tracking-[0.4em] uppercase hover:text-gold transition-colors py-4">
            <Instagram size={18} /> Follow Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
