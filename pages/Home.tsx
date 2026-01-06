
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Star, Camera, ArrowRight } from 'lucide-react';
import { THEME_EFFECTS } from '../constants.tsx';
import { useContent } from '../context/ContentContext.tsx';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 1, delay: 0.2, ease: 'power2.out' });
      gsap.from('.hero-word-1 .hero-letter', { opacity: 0, y: 100, rotateX: -90, stagger: 0.05, duration: 1.2, ease: 'expo.out', delay: 0.4 });
      gsap.from('.hero-word-2 .hero-letter', { opacity: 0, y: 100, rotateX: -90, stagger: 0.05, duration: 1.2, ease: 'expo.out', delay: 0.8 }); 
      gsap.from('.hero-btns', { opacity: 0, y: 30, duration: 1, delay: 1.5, ease: 'power3.out' });
      
      // Reveal Animations for Sections
      gsap.utils.toArray('.reveal').forEach((el: any) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1.2,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [content]);

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
    // Default: Classic Layout as per screenshot pattern
    return (
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 bg-cover bg-center opacity-90 scale-105 transition-all duration-700 ${getHeroEffect()}`} style={{ backgroundImage: `url(${content.heroImage})` }} />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center px-4 w-full max-w-[1800px] mx-auto flex flex-col items-center justify-center h-full pt-20">
          
          {/* Subtitle */}
          <div className="hero-subtitle mb-6 md:mb-8 flex items-center gap-4 md:gap-8 opacity-0">
             {/* Decorative lines/text mimicking the screenshot glitch/style */}
             <div className="hidden md:block w-12 h-[1px] bg-gold/60"></div>
             <span className="text-gold font-cinzel text-[10px] md:text-sm tracking-[0.5em] uppercase">Cinematic Legacies</span>
             <div className="hidden md:block w-12 h-[1px] bg-gold/60"></div>
          </div>

          {/* Main Title - One Line - Optimized Fluid Typography */}
          <h1 className="flex flex-row flex-nowrap justify-center items-baseline gap-x-[1.5vw] mb-10 md:mb-16 leading-none w-full max-w-full overflow-hidden px-2">
            <div className="hero-word-1 font-cinzel text-[clamp(1.1rem,5vw,7rem)] text-white tracking-tighter whitespace-nowrap drop-shadow-2xl">
              {renderLetters("AK BROTHERS")}
            </div>
            <div className="hero-word-2 font-cinzel text-[clamp(1.1rem,5vw,7rem)] text-gold italic tracking-tight whitespace-nowrap drop-shadow-2xl">
              {renderLetters("PHOTOGRAPHY", "italic")}
            </div>
          </h1>

          {/* Buttons */}
          <div className="hero-btns flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-md md:max-w-2xl">
            <Link to="/stories" className="w-full sm:w-1/2 border border-gold/40 hover:border-gold text-white bg-transparent px-8 py-4 font-cinzel text-[10px] md:text-xs tracking-[0.3em] uppercase hover:bg-gold/10 transition-all duration-500">
              View Stories
            </Link>
            <Link to="/contact" className="w-full sm:w-1/2 bg-gold border border-gold px-8 py-4 text-obsidian font-cinzel text-[10px] md:text-xs tracking-[0.3em] uppercase hover:bg-white hover:border-white hover:text-obsidian transition-all duration-500 shadow-xl">
              Inquiry
            </Link>
          </div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
      </section>
    );
  };

  return (
    <div ref={containerRef} className="bg-cream">
      {renderHeroContent()}

      {/* 2. Brand Philosophy */}
      <section className="py-20 md:py-32 px-6 text-center bg-white border-b border-black/5 reveal">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
              <span className="text-gold font-cinzel text-[9px] md:text-[10px] tracking-[0.4em] uppercase block">The Philosophy</span>
              <h2 className="font-cinzel text-2xl md:text-4xl lg:text-5xl text-obsidian leading-tight">
                  Crafting cinematic wedding legacies <br/>
                  <span className="italic text-gold">that echo through generations.</span>
              </h2>
              <p className="text-charcoal/60 text-sm md:text-base font-light tracking-wide leading-loose max-w-2xl mx-auto">
                  Every frame is a piece of art, crafted with emotion and cinematic precision. <br className="hidden md:block"/>
                  We preserve moments so they can be felt forever.
              </p>
              <div className="w-16 h-[1px] bg-gold mx-auto opacity-50 mt-8 md:mt-10" />
          </div>
      </section>

      {/* 3. Signature Work Sections */}
      <section className="py-16 md:py-32 bg-cream reveal">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
               <div className="text-center mb-12 md:mb-20">
                  <span className="text-gold font-cinzel text-[9px] md:text-[10px] tracking-[0.4em] uppercase block mb-4">Portfolio</span>
                  <h3 className="font-cinzel text-2xl md:text-4xl text-obsidian">Signature Collections</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {/* Stories */}
                  <Link to="/stories" className="group relative h-[300px] md:h-[600px] overflow-hidden block">
                       <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: `url(${content.stories[0]})`}}></div>
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
                          <span className="font-cinzel text-3xl md:text-5xl mb-4 italic drop-shadow-lg">Stories</span>
                          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] border-b border-white/50 pb-1 group-hover:border-gold group-hover:text-gold transition-all">View Journals</span>
                       </div>
                  </Link>
                  {/* Portraits */}
                  <Link to="/images" className="group relative h-[300px] md:h-[600px] overflow-hidden block">
                       <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: `url(${content.portraits[0]})`}}></div>
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
                          <span className="font-cinzel text-3xl md:text-5xl mb-4 italic drop-shadow-lg">Portraits</span>
                          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] border-b border-white/50 pb-1 group-hover:border-gold group-hover:text-gold transition-all">View Gallery</span>
                       </div>
                  </Link>
                   {/* Films */}
                  <Link to="/films" className="group relative h-[300px] md:h-[600px] overflow-hidden md:col-span-2 block">
                       <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: `url(${content.films[0]?.thumbnail || content.stories[1]})`}}></div>
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
                          <span className="font-cinzel text-4xl md:text-6xl mb-4 italic drop-shadow-lg">Cinematography</span>
                          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] border-b border-white/50 pb-1 group-hover:border-gold group-hover:text-gold transition-all">Watch Films</span>
                       </div>
                  </Link>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                   {/* Pre-Weddings */}
                  <Link to="/pre-weddings" className="group relative h-[250px] md:h-[300px] overflow-hidden block">
                       <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: `url(${content.preWeddings[0]})`}}></div>
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
                          <span className="font-cinzel text-2xl md:text-3xl mb-2 drop-shadow-md">Pre-Weddings</span>
                          <span className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-widest text-gold mt-2">Explore</span>
                       </div>
                  </Link>
                  {/* Photobooks */}
                  <Link to="/photobooks" className="group relative h-[250px] md:h-[300px] overflow-hidden block">
                       <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: `url(${content.photobooks[0]})`}}></div>
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
                          <span className="font-cinzel text-2xl md:text-3xl mb-2 drop-shadow-md">Photobooks</span>
                          <span className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-widest text-gold mt-2">Explore</span>
                       </div>
                  </Link>
               </div>
          </div>
      </section>

      {/* 4. Why Us */}
      <section className="py-20 md:py-32 px-6 bg-white reveal border-t border-black/5">
          <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12 md:mb-16">
                 <span className="text-gold font-cinzel text-[9px] md:text-[10px] tracking-[0.4em] uppercase block mb-4">Why Us</span>
                 <h3 className="font-cinzel text-2xl md:text-3xl text-obsidian">The Art of Perfection</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
                  <div className="space-y-4 md:space-y-6 px-4">
                      <span className="text-gold block mb-4 mx-auto w-fit p-4 bg-cream rounded-full border border-black/5"><Film size={24} strokeWidth={1} /></span>
                      <h4 className="font-cinzel text-lg text-obsidian tracking-wide">Cinematic Storytelling</h4>
                      <p className="text-charcoal/60 text-xs md:text-sm leading-loose font-light">
                        We don't just capture events; we direct emotions. Our approach is deeply rooted in cinema, ensuring your film feels like a timeless movie.
                      </p>
                  </div>
                  <div className="space-y-4 md:space-y-6 px-4">
                      <span className="text-gold block mb-4 mx-auto w-fit p-4 bg-cream rounded-full border border-black/5"><Star size={24} strokeWidth={1} /></span>
                      <h4 className="font-cinzel text-lg text-obsidian tracking-wide">A Decade of Legacy</h4>
                      <p className="text-charcoal/60 text-xs md:text-sm leading-loose font-light">
                        With years of experience documenting high-profile weddings, we bring a calm confidence, expertise, and professionalism to your celebration.
                      </p>
                  </div>
                  <div className="space-y-4 md:space-y-6 px-4">
                       <span className="text-gold block mb-4 mx-auto w-fit p-4 bg-cream rounded-full border border-black/5"><Camera size={24} strokeWidth={1} /></span>
                       <h4 className="font-cinzel text-lg text-obsidian tracking-wide">Premium Artistry</h4>
                       <p className="text-charcoal/60 text-xs md:text-sm leading-loose font-light">
                         Using world-class equipment and high-end editorial editing, we deliver images that look like they belong in a fashion magazine.
                       </p>
                  </div>
              </div>
          </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 md:py-56 text-center relative overflow-hidden reveal bg-obsidian text-white">
          <div className="absolute inset-0 opacity-30 bg-cover bg-center scale-105" style={{backgroundImage: `url(${content.heroImage})`}}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/60 to-obsidian/90"></div>
          
          <div className="relative z-10 container mx-auto px-6">
               <h2 className="font-cinzel text-3xl md:text-7xl mb-8 md:mb-12 tracking-tight leading-tight">
                 Let’s create something <br/>
                 <span className="text-gold italic">timeless.</span>
               </h2>
               <Link to="/contact" className="group inline-flex items-center gap-4 border border-gold/50 text-gold px-8 py-4 md:px-12 md:py-5 font-cinzel text-[10px] tracking-[0.4em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500">
                  Inquire Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </Link>
          </div>
      </section>
    </div>
  );
};

export default Home;
