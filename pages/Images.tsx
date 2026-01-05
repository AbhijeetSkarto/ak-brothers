
import React from 'react';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { useContent } from '../context/ContentContext.tsx';

const Images: React.FC = () => {
  const { content } = useContent();
  const imageData: MediaItem[] = content.portraits.map((img, i) => ({
    id: `img-${i}`,
    type: 'image',
    thumbnail: img,
    likes: '2.8k',
    comments: '56',
    caption: 'Handcrafted Heritage Portrait'
  }));

  return (
    <div className="pt-40 min-h-screen bg-cream">
      <section className="px-4 md:px-10 lg:px-20 mb-20 text-center">
        <span className="text-gold font-cinzel text-[11px] tracking-[1em] uppercase mb-6 block opacity-80">Visual Stills</span>
        <h2 className="font-cinzel text-7xl md:text-[10rem] text-obsidian tracking-tighter leading-none">PORTRAITS</h2>
      </section>
      
      <InstagramGrid 
        items={imageData} 
        title="The Stills Gallery" 
        subtitle="Eternity Captured" 
      />
    </div>
  );
};

export default Images;
