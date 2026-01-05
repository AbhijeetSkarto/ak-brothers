
import React from 'react';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { useContent } from '../context/ContentContext.tsx';

const Photobooks: React.FC = () => {
  const { content } = useContent();

  const bookItems: MediaItem[] = content.photobooks.map((img, i) => ({
    id: `pb-${i}`,
    type: 'image',
    thumbnail: img,
    likes: '2.4k',
    comments: '55',
    caption: 'Luxury Album'
  }));

  return (
    <div className="pt-24 min-h-screen bg-cream">
      <InstagramGrid 
        items={bookItems} 
        title="Luxury Prints" 
        subtitle="The Handcrafted Albums" 
      />
    </div>
  );
};

export default Photobooks;
