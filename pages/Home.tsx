
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Star, Camera, ArrowRight, MapPin } from 'lucide-react';
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

  const latestStories = content.stories.filter(s => s.published).slice(0, 3);

  return (
    <div ref={containerRef} className="bg-cream">
      {/* 1. Hero Section - Perfectly Centered Single Action */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 bg-cover bg-center opacity-90 scale-105 transition-all duration-700 ${getHeroEffect()}`} style={{ backgroundImage: `url(${content.heroImage})` }} />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center px-4 w-full max-w-[1800px] mx-auto flex flex-col items-center justify-center h-full pt-20">
          
          <div className="hero-subtitle mb-6 md:mb-8 flex items-center gap-4 md:gap-8 opacity-0">
             <div className="hidden md:block w-12 h-[1px] bg-gold/60"></div>
             <span className="text-gold font-cinzel text-[10px] md:text-sm tracking-[0.5em] uppercase">Cinematic Legacies</span>
             <div className="hidden md:block w-12 h-[1px] bg-gold/60"></div>
          </div>

          <h1 className="flex flex-row flex-nowrap justify-center items-baseline gap-x-[1.5vw] mb-10 md:mb-16 leading-none w-full max-w-full overflow-hidden px-2 text-center">
            <div className="hero-word-1 font-cinzel text-[clamp(1.1rem,5vw,7rem)] text-white tracking-tighter whitespace-nowrap drop-shadow-2xl">
              {renderLetters("AK BROTHERS")}
            </div>
            <div className="hero-word-2 font-cinzel text-[clamp(1.1rem,5vw,7rem)] text-gold italic tracking-tight whitespace-nowrap drop-shadow-2xl">
              {renderLetters("PHOTOGRAPHY", "italic")}
            </div>
          </h1>

          <div className="hero-btns opacity-0 flex justify-center w-full">
            <Link to="/stories" className="w-full max-w-xs border border-gold/60 hover:border-gold text-white bg-transparent px-10 py-5 font-cinzel text-[10px] md:text-xs tracking-[0.5em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-700 shadow-2xl backdrop-blur-sm">
              View Stories
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
      </section>

      {/* 2. About Narrative Section */}
      <section className="py-24 md:py-32 px-6 bg-white border-b border-black/5 reveal">
          <div className="container mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                  <div className="space-y-8">
                      <span className="text-gold font-cinzel text-[10px] tracking-[0.4em] uppercase block">Who We Are</span>
                      <h2 className="font-cinzel text-3xl md:text-5xl text-obsidian leading-tight">
                          Curating Legacies <br/>
                          <span className="italic text-gold">Beyond The Lens.</span>
                      </h2>
                      <div className="text-charcoal/70 text-sm md:text-base font-light tracking-wide leading-loose space-y-6 text-justify">
                          {content.about.description.split('\n\n').map((para, i) => (
                              <p key={i}>{para}</p>
                          ))}
                      </div>
                      <div className="pt-4">
                        <Link to="/about" className="font-cinzel text-[10px] tracking-widest uppercase text-gold border-b border-gold/30 pb-1 hover:border-gold transition-all">
                          Our Full Philosophy
                        </Link>
                      </div>
                  </div>
                  <div className="relative aspect-[4/3] md:aspect-square bg-gray-200 overflow-hidden group shadow-xl">
                       <img src={content.about.images[0]} alt="About AK Brothers" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                       <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none" />
                  </div>
              </div>
          </div>
      </section>

      {/* 3. Featured Stories Section */}
      <section className="py-24 md:py-40 bg-cream reveal overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div className="space-y-4">
                      <span className="text-gold font-cinzel text-[10px] tracking-[0.5em] uppercase block">Wedding Journals</span>
                      <h2 className="font-cinzel text-4xl md:text-6xl text-obsidian uppercase">Featured Stories</h2>
                  </div>
                  <Link to="/stories" className="text-gold font-cinzel text-[11px] tracking-[0.3em] uppercase border-b border-gold/30 pb-1 hover:border-gold transition-all">
                      View All Narratives
                  </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {latestStories.map((story) => (
                      <Link key={story.id} to={`/stories`} className="group block space-y-6">
                          <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative shadow-lg">
                              <img 
                                src={story.coverImage} 
                                alt={story.title} 
                                className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${getHeroEffect()}`} 
                              />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                              <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-3 py-1 rounded-sm">
                                  <MapPin size={12} className="text-gold" />
                                  <span className="text-[9px] font-cinzel tracking-widest uppercase">{story.location}</span>
                              </div>
                          </div>
                          <div className="space-y-3">
                              <h3 className="font-cinzel text-xl text-obsidian group-hover:text-gold transition-colors">{story.title}</h3>
                              <p className="text-charcoal/60 text-xs font-light leading-loose line-clamp-3">
                                  {story.description}
                              </p>
                              <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-widest text-gold font-bold">
                                  Read Journal <ArrowRight size={10} />
                              </span>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      </section>

      {/* 4. Signature Collections */}
      <section className="py-16 md:py-32 bg-white reveal">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
               <div className="text-center mb-12 md:mb-20">
                  <span className="text-gold font-cinzel text-[9px] md:text-[10px] tracking-[0.4em] uppercase block mb-4">Portfolio</span>
                  <h3 className="font-cinzel text-2xl md:text-4xl text-obsidian uppercase">Signature Collections</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/images" className="group relative h-[300px] md:h-[500px] overflow-hidden block">
                       <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: `url(${content.portraits[0]})`}}></div>
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
                          <span className="font-cinzel text-3xl md:text-5xl mb-4 italic drop-shadow-lg">Portraits</span>
                          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] border-b border-white/50 pb-1 group-hover:border-gold group-hover:text-gold transition-all">View Gallery</span>
                       </div>
                  </Link>
                  <Link to="/films" className="group relative h-[300px] md:h-[500px] overflow-hidden block">
                       <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: `url(${content.films[0]?.thumbnail})`}}></div>
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
                          <span className="font-cinzel text-4xl md:text-6xl mb-4 italic drop-shadow-lg">Films</span>
                          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] border-b border-white/50 pb-1 group-hover:border-gold group-hover:text-gold transition-all">Watch Gallery</span>
                       </div>
                  </Link>
               </div>
          </div>
      </section>

      {/* 5. Why Us / Studio Values */}
      <section className="py-20 md:py-32 px-6 bg-cream reveal border-t border-black/5">
          <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12 md:mb-16">
                 <span className="text-gold font-cinzel text-[9px] md:text-[10px] tracking-[0.4em] uppercase block mb-4">The Studio</span>
                 <h3 className="font-cinzel text-2xl md:text-3xl text-obsidian uppercase">The Art of Perfection</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
                  <div className="space-y-4 md:space-y-6 px-4">
                      <span className="text-gold block mb-4 mx-auto w-fit p-4 bg-white rounded-full border border-black/5 shadow-sm"><Film size={24} strokeWidth={1} /></span>
                      <h4 className="font-cinzel text-lg text-obsidian tracking-wide uppercase">Cinematic Storytelling</h4>
                      <p className="text-charcoal/60 text-xs md:text-sm leading-loose font-light">
                        We don't just capture events; we direct emotions. Our approach is deeply rooted in cinema, ensuring your film feels like a timeless movie.
                      </p>
                  </div>
                  <div className="space-y-4 md:space-y-6 px-4">
                      <span className="text-gold block mb-4 mx-auto w-fit p-4 bg-white rounded-full border border-black/5 shadow-sm"><Star size={24} strokeWidth={1} /></span>
                      <h4 className="font-cinzel text-lg text-obsidian tracking-wide uppercase">Premium Legacy</h4>
                      <p className="text-charcoal/60 text-xs md:text-sm leading-loose font-light">
                        With years of experience documenting high-profile weddings, we bring a calm confidence, expertise, and professionalism to your celebration.
                      </p>
                  </div>
                  <div className="space-y-4 md:space-y-6 px-4">
                       <span className="text-gold block mb-4 mx-auto w-fit p-4 bg-white rounded-full border border-black/5 shadow-sm"><Camera size={24} strokeWidth={1} /></span>
                       <h4 className="font-cinzel text-lg text-obsidian tracking-wide uppercase">Fine Art Approach</h4>
                       <p className="text-charcoal/60 text-xs md:text-sm leading-loose font-light">
                         Using world-class equipment and high-end editorial editing, we deliver images that look like they belong in a fashion magazine.
                       </p>
                  </div>
              </div>
          </div>
      </section>
      
      {/* Inquiry section completely removed to ensure production-ready visual balance */}
    </div>
  );
};

export default Home;
