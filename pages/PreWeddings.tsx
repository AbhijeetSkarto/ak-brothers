
import React from 'react';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { useContent } from '../context/ContentContext.tsx';

const PreWeddings: React.FC = () => {
  const { content } = useContent();

  const preWedItems: MediaItem[] = content.preWeddings.map((img, i) => ({
    id: `pw-${i}`,
    type: 'image',
    thumbnail: img,
    likes: '1.2k',
    comments: '22',
    caption: 'Pre-Wedding'
  }));

  return (
    <div className="pt-24 min-h-screen bg-cream">
      <InstagramGrid 
        items={preWedItems} 
        title="Pre-Weddings" 
        subtitle="Before The Vows" 
      />
    </div>
  );
};

export default PreWeddings;
