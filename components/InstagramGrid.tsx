
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Heart, MessageCircle, Instagram, Image as ImageIcon, Camera } from 'lucide-react';
import VideoModal from './VideoModal.tsx';
import { BRAND, THEME_EFFECTS } from '../constants.tsx';
import { useContent } from '../context/ContentContext.tsx';

gsap.registerPlugin(ScrollTrigger);

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  thumbnail: string;
  likes: string;
  comments: string;
  caption?: string;
  url?: string;
  videoUrl?: string;
}

interface InstagramGridProps {
  items: MediaItem[];
  title: string;
  subtitle: string;
}

const InstagramGrid: React.FC<InstagramGridProps> = ({ items, title, subtitle }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { content } = useContent(); // Get global effect

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.grid-item', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' }
      });
    }, gridRef);
    return () => ctx.revert();
  }, [items]);

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector('img');
    const overlay = e.currentTarget.querySelector('.overlay-info');
    const iconWrapper = e.currentTarget.querySelector('.icon-wrapper');
    const stats = e.currentTarget.querySelector('.stats-container');
    const caption = e.currentTarget.querySelector('.caption-text');

    if (img) {
      gsap.to(img, { 
        scale: 1.05, 
        duration: 0.8, 
        ease: 'power2.out' 
      });
    }
    if (overlay) {
      gsap.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    }
    if (iconWrapper) {
      gsap.to(iconWrapper, {
        scale: 1.1,
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
    // Staggered reveal for content
    if (stats) gsap.to(stats, { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' });
    if (caption) gsap.to(caption, { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: 'power2.out' });
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector('img');
    const overlay = e.currentTarget.querySelector('.overlay-info');
    const iconWrapper = e.currentTarget.querySelector('.icon-wrapper');
    const stats = e.currentTarget.querySelector('.stats-container');
    const caption = e.currentTarget.querySelector('.caption-text');

    if (img) {
      gsap.to(img, { scale: 1, duration: 0.8, ease: 'power2.out' });
    }
    if (overlay) {
      gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.in' });
    }
    if (iconWrapper) {
      gsap.to(iconWrapper, {
        scale: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        backgroundColor: 'rgba(0,0,0,0.4)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
    if (stats) gsap.to(stats, { y: 20, opacity: 0, duration: 0.3 });
    if (caption) gsap.to(caption, { y: 20, opacity: 0, duration: 0.3 });
  };

  const handleItemClick = (item: MediaItem) => {
    if (item.type === 'video' && item.videoUrl) {
      setSelectedVideo(item.videoUrl);
    } else {
      window.open(BRAND.instagram, '_blank');
    }
  };

  return (
    <section className="py-24 bg-cream border-t border-black/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <Camera size={14} className="text-gold" />
               <span className="text-gold font-cinzel text-[10px] tracking-[0.6em] uppercase block">{subtitle}</span>
            </div>
            <h2 className="font-cinzel text-5xl md:text-7xl text-obsidian tracking-tighter leading-tight">{title}</h2>
          </div>
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-charcoal hover:text-gold transition-all text-[11px] tracking-[0.3em] uppercase font-cinzel border border-black/10 px-8 py-4 hover:bg-gold hover:text-white">
            <Instagram size={18} /> Visit Instagram
          </a>
        </header>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleItemClick(item)} 
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="grid-item relative aspect-[4/5] bg-gray-200 overflow-hidden cursor-pointer shadow-sm"
            >
              <img 
                src={item.thumbnail} 
                alt="AK BROTHERS" 
                className={`w-full h-full object-cover will-change-transform transition-all duration-700 ${THEME_EFFECTS[content.globalEffect]}`} 
                loading="lazy"
                decoding="async"
              />
              
              <div className="absolute top-6 right-6 z-10 text-white/90 pointer-events-none">
                {item.type === 'video' ? (
                  <div className="icon-wrapper w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 transition-colors">
                    <Play size={16} fill="currentColor" />
                  </div>
                ) : (
                  <div className="icon-wrapper p-2 rounded-full">
                     <ImageIcon size={20} className="opacity-80" />
                  </div>
                )}
              </div>

              <div className="overlay-info absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 flex flex-col items-center justify-end p-8 text-center">
                <div className="stats-container translate-y-5 opacity-0 flex gap-8 text-gold font-cinzel text-xs mb-4">
                  <div className="flex items-center gap-2"><Heart size={16} /> <span>{item.likes}</span></div>
                  <div className="flex items-center gap-2"><MessageCircle size={16} /> <span>{item.comments}</span></div>
                </div>
                {item.caption && (
                  <p className="caption-text translate-y-5 opacity-0 text-white text-[10px] uppercase tracking-[0.2em] font-medium leading-relaxed">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} videoUrl={selectedVideo || ''} />
    </section>
  );
};

export default InstagramGrid;
