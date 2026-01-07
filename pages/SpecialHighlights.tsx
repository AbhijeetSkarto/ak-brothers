
import React from 'react';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { useContent } from '../context/ContentContext.tsx';

const SpecialHighlights: React.FC = () => {
  const { content } = useContent();

  const specialItems: MediaItem[] = content.special.map((img, i) => ({
    id: `sh-${i}`,
    type: 'image',
    thumbnail: img,
    likes: `${(Math.random() * 5 + 1).toFixed(1)}k`,
    comments: Math.floor(Math.random() * 100 + 20).toString(),
    caption: 'Cinematic Highlight Moment'
  }));

  return (
    <div className="pt-28 md:pt-40 min-h-screen bg-cream">
      <section className="px-4 md:px-10 lg:px-20 mb-12 md:mb-20 text-center">
        <span className="text-gold font-cinzel text-[11px] tracking-[1em] uppercase mb-4 md:mb-6 block opacity-80">Elite Selections</span>
        <h2 className="font-cinzel text-5xl md:text-[10rem] text-obsidian tracking-tighter leading-none">HIGHLIGHTS</h2>
      </section>
      
      {specialItems.length > 0 ? (
        <InstagramGrid 
          items={specialItems} 
          title="Special Highlights" 
          subtitle="The Best Of AK Brothers" 
        />
      ) : (
        <div className="container mx-auto px-6 text-center py-20 opacity-50">
           <p className="font-cinzel text-lg">Our highlights collection is being curated...</p>
        </div>
      )}
    </div>
  );
};

export default SpecialHighlights;
