
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(modalRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      gsap.fromTo(contentRef.current, 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.1, ease: 'expo.out' }
      );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Helper to get embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      // Extract file ID
      const match = url.match(/\/file\/d\/([^\/]+)\//) || url.match(/id=([^\&]+)/);
      const fileId = match ? match[1] : url;
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([^\?\&]+)/);
      const videoId = match ? match[1] : '';
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 opacity-0"
    >
      <div 
        className="absolute inset-0 bg-obsidian/95 backdrop-blur-2xl" 
        onClick={onClose}
      />
      
      <div 
        ref={contentRef}
        className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl border border-white/10"
      >
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 text-gold hover:text-white transition-colors p-2"
        >
          <X size={32} />
        </button>
        
        {title && (
          <div className="absolute -top-10 left-0">
            <h3 className="font-cinzel text-xs tracking-[0.4em] text-silver uppercase">{title}</h3>
          </div>
        )}

        <iframe
          src={getEmbedUrl(videoUrl)}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Video Player"
        />
      </div>
    </div>
  );
};

export default VideoModal;
