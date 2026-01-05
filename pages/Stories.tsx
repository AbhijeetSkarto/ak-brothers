
import React from 'react';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { useContent } from '../context/ContentContext.tsx';

const Stories: React.FC = () => {
  const { content } = useContent();
  
  const storyData: MediaItem[] = content.stories.map((img, i) => ({
    id: `story-${i}`,
    type: 'image',
    thumbnail: img,
    likes: `${(3 + i * 0.4).toFixed(1)}k`,
    comments: (40 + i * 10).toString(),
    caption: 'The Complete Wedding Journal'
  }));

  return (
    <div className="pt-24 min-h-screen bg-cream">
      <InstagramGrid 
        items={storyData} 
        title="Wedding Journals" 
        subtitle="Chronicles of Love" 
      />
    </div>
  );
};

export default Stories;
