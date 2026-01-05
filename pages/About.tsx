
import React, { useState, useEffect } from 'react';
import { Camera, Heart, Film, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useContent } from '../context/ContentContext.tsx';
import VideoModal from '../components/VideoModal.tsx';

const About: React.FC = () => {
  const { content } = useContent();
  const { about } = content;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Auto-advance slider
  useEffect(() => {
    if (!about.images || about.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % about.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [about.images]);

  const nextImage = () => {
    if (!about.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % about.images.length);
  };

  const prevImage = () => {
    if (!about.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + about.images.length) % about.images.length);
  };

  return (
    <div className="pt-40 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="px-6 md:px-20 mb-32 text-center">
        <span className="text-gold font-cinzel text-[10px] tracking-[1em] uppercase mb-6 block opacity-60">{about.subtitle}</span>
        <h2 className="font-cinzel text-6xl md:text-[8rem] text-obsidian tracking-tighter leading-none mb-10">{about.title}</h2>
        <div className="w-24 h-[1px] bg-gold mx-auto mb-10 opacity-50" />
      </section>

      <section className="container mx-auto px-6 md:px-20 mb-32">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Image Slider */}
          <div className="relative aspect-[3/4] border border-black/5 bg-gray-200 group overflow-hidden">
            {about.images && about.images.length > 0 ? (
               about.images.map((img, index) => (
                 <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                 >
                    <img 
                      src={img} 
                      alt={`AK Brothers Team ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                 </div>
               ))
            ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-charcoal/30">No Image</div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute bottom-10 left-10 z-10">
              <p className="font-cinzel text-gold text-lg tracking-widest drop-shadow-md">EST. 2018</p>
            </div>

            {/* Navigation Arrows */}
            {about.images && about.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20">
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>
          
          {/* Text Content */}
          <div className="space-y-12">
            <p className="text-charcoal text-lg font-light leading-loose tracking-wide whitespace-pre-wrap">
              {about.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-black/10">
              <div className="text-center">
                <Camera size={24} className="text-gold mx-auto mb-4" />
                <h4 className="font-cinzel text-xs text-obsidian tracking-widest uppercase mb-2">Photography</h4>
                <p className="text-charcoal/50 text-[10px] uppercase tracking-wider">Editorial & Candid</p>
              </div>
              <div className="text-center">
                <Film size={24} className="text-gold mx-auto mb-4" />
                <h4 className="font-cinzel text-xs text-obsidian tracking-widest uppercase mb-2">Cinematography</h4>
                <p className="text-charcoal/50 text-[10px] uppercase tracking-wider">4K Cinematic Films</p>
              </div>
              <div className="text-center">
                <Heart size={24} className="text-gold mx-auto mb-4" />
                <h4 className="font-cinzel text-xs text-obsidian tracking-widest uppercase mb-2">Storytelling</h4>
                <p className="text-charcoal/50 text-[10px] uppercase tracking-wider">Emotive Narratives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      {about.videos && about.videos.length > 0 && (
        <section className="container mx-auto px-6 md:px-20 mb-32 border-t border-black/5 pt-20">
          <div className="text-center mb-16">
            <span className="text-gold font-cinzel text-[10px] tracking-[0.5em] uppercase block mb-4">Behind The Scenes</span>
            <h3 className="font-cinzel text-4xl text-obsidian">The Process</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.videos.map((vid, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedVideo(vid)}
                className="relative aspect-video bg-black/5 border border-black/10 group cursor-pointer overflow-hidden"
              >
                 {/* Using the first about image as a faint background if available */}
                 <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-cover bg-center" style={{ backgroundImage: `url(${about.images?.[0]})` }}></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
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
