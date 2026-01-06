
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import VideoModal from '../components/VideoModal.tsx';
import { useContent } from '../context/ContentContext.tsx';
import { THEME_EFFECTS } from '../constants.tsx';

const Films: React.FC = () => {
  const { content } = useContent();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="pt-28 md:pt-40 min-h-screen bg-cream">
      <section className="px-6 md:px-20 mb-12 md:mb-20 text-center">
        <span className="text-gold font-cinzel text-[10px] tracking-[1em] uppercase mb-4 md:mb-6 block opacity-60">Motion Pictures</span>
        <h2 className="font-cinzel text-5xl md:text-[10rem] text-obsidian tracking-tighter leading-none mb-6 md:mb-10">THE FILMS</h2>
        <p className="text-charcoal/60 text-xs tracking-[0.4em] uppercase max-w-xl mx-auto leading-loose">
          A collection of cinematic wedding trailers and highlights that capture the rhythm of your celebration.
        </p>
      </section>

      {/* Cinematic Film Grid */}
      <section className="container mx-auto px-6 md:px-20 mb-20 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {content.films.map((film, index) => (
             <div 
               key={index}
               className="group relative aspect-video bg-black overflow-hidden cursor-pointer shadow-xl border border-white/5"
               onClick={() => setSelectedVideo(film.url)}
             >
               {/* Thumbnail Image */}
               <img 
                 src={film.thumbnail} 
                 alt={film.title}
                 className={`w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ${THEME_EFFECTS[content.globalEffect]}`}
               />
               
               {/* Branding Watermark */}
               <div className="absolute top-6 left-6 z-10 opacity-70">
                 <span className="font-cinzel text-[8px] md:text-[10px] tracking-[0.2em] text-white uppercase">AK Brothers Photography</span>
               </div>

               {/* Center Play Button */}
               <div className="absolute inset-0 flex items-center justify-center z-20">
                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-500 scale-100 group-hover:scale-110">
                    <Play size={32} className="text-white ml-1" fill="currentColor" />
                 </div>
               </div>

               {/* Title Overlay on Hover */}
               <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
                  <h3 className="text-white font-cinzel text-lg md:text-2xl tracking-wide mb-2">{film.title}</h3>
                  <p className="text-gold text-[10px] uppercase tracking-widest">Watch Film</p>
               </div>
             </div>
          ))}
        </div>
      </section>

      <VideoModal 
        isOpen={!!selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
        videoUrl={selectedVideo || ''} 
      />
    </div>
  );
};

export default Films;
