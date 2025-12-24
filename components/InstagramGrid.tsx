
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Heart, MessageCircle, Instagram, Image as ImageIcon, Camera } from 'lucide-react';
import VideoModal from './VideoModal.tsx';
import { BRAND } from '../constants.tsx';

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

  const handleItemClick = (item: MediaItem) => {
    if (item.type === 'video' && item.videoUrl) {
      setSelectedVideo(item.videoUrl);
    } else {
      window.open(BRAND.instagram, '_blank');
    }
  };

  return (
    <section className="py-24 bg-obsidian border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <Camera size={14} className="text-gold" />
               <span className="text-gold font-cinzel text-[10px] tracking-[0.6em] uppercase block">{subtitle}</span>
            </div>
            <h2 className="font-cinzel text-5xl md:text-7xl text-silver tracking-tighter leading-tight">{title}</h2>
          </div>
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-platinum hover:text-gold transition-all text-[11px] tracking-[0.3em] uppercase font-cinzel border border-white/10 px-8 py-4 hover:bg-gold hover:text-obsidian">
            <Instagram size={18} /> Visit Instagram
          </a>
        </header>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} onClick={() => handleItemClick(item)} className="grid-item relative aspect-[4/5] bg-charcoal overflow-hidden group cursor-pointer border border-white/5">
              <img src={item.thumbnail} alt="AK BROTHERS" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute top-6 right-6 z-10 text-white/80">
                {item.type === 'video' ? (
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-gold group-hover:text-obsidian transition-colors">
                    <Play size={16} fill="currentColor" />
                  </div>
                ) : <ImageIcon size={20} className="opacity-60 group-hover:opacity-100 transition-opacity" />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end p-8 text-center">
                <div className="flex gap-8 text-gold font-cinzel text-xs mb-4">
                  <div className="flex items-center gap-2"><Heart size={16} /> <span>{item.likes}</span></div>
                  <div className="flex items-center gap-2"><MessageCircle size={16} /> <span>{item.comments}</span></div>
                </div>
                {item.caption && <p className="text-silver text-[9px] uppercase tracking-[0.2em] font-light">{item.caption}</p>}
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
