
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { useContent } from '../context/ContentContext.tsx';

interface DynamicCategoryProps {
  title: string;
  subtitle: string;
  collectionId?: 'special'; 
}

const DynamicCategory: React.FC<DynamicCategoryProps> = ({ title, subtitle, collectionId = 'special' }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', { y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  // Fetch from context or fallback to empty array
  const rawImages = content[collectionId] || [];

  const items: MediaItem[] = rawImages.map((img, i) => ({
    id: `${collectionId}-${i}`,
    type: 'image',
    thumbnail: img,
    likes: `${(Math.random() * 5 + 1).toFixed(1)}k`,
    comments: Math.floor(Math.random() * 100 + 20).toString(),
    caption: `Premium ${title}`
  }));

  return (
    <div className="pt-28 md:pt-40 min-h-screen bg-cream">
      <section className="px-4 md:px-10 lg:px-20 mb-12 md:mb-20">
        <div className="container mx-auto" ref={headerRef}>
          <div className="overflow-hidden mb-8">
            <h2 className="font-cinzel text-5xl md:text-8xl text-obsidian tracking-tighter reveal-text text-center md:text-left">
              {title} <span className="text-gold italic">Art</span>
            </h2>
          </div>
        </div>
      </section>
      
      {items.length > 0 ? (
        <InstagramGrid items={items} title={`${title} Gallery`} subtitle={subtitle} />
      ) : (
        <div className="container mx-auto px-6 text-center py-20 opacity-50">
           <p className="font-cinzel text-lg">Gallery coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default DynamicCategory;
