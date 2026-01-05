
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { PORTFOLIO_IMAGES } from '../constants.tsx';

interface DynamicCategoryProps {
  title: string;
  subtitle: string;
}

const DynamicCategory: React.FC<DynamicCategoryProps> = ({ title, subtitle }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', { y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const featuredData: MediaItem[] = PORTFOLIO_IMAGES.map((img, i) => ({
    id: `cat-${i}`,
    type: 'image',
    thumbnail: img,
    likes: `${(Math.random() * 5 + 1).toFixed(1)}k`,
    comments: Math.floor(Math.random() * 100 + 20).toString(),
    caption: `Premium ${title}`
  }));

  return (
    <div className="pt-40 min-h-screen bg-cream">
      <section className="px-4 md:px-10 lg:px-20 mb-20">
        <div className="container mx-auto" ref={headerRef}>
          <div className="overflow-hidden mb-8">
            <h2 className="font-cinzel text-5xl md:text-8xl text-obsidian tracking-tighter reveal-text">
              {title} <span className="text-gold italic">Art</span>
            </h2>
          </div>
        </div>
      </section>
      <InstagramGrid items={featuredData} title={`${title} Gallery`} subtitle="Visual Symphony" />
    </div>
  );
};

export default DynamicCategory;
