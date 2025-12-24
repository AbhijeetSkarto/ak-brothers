
import React from 'react';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { GALLERY_DATABASE } from '../constants.tsx';

const Stories: React.FC = () => {
  const storyData: MediaItem[] = GALLERY_DATABASE.stories.map((img, i) => ({
    id: `story-${i}`,
    type: 'image',
    thumbnail: img,
    likes: `${(3 + i * 0.4).toFixed(1)}k`,
    comments: (40 + i * 10).toString(),
    caption: 'The Complete Wedding Journal'
  }));

  return (
    <div className="pt-24 min-h-screen bg-obsidian">
      <InstagramGrid 
        items={storyData} 
        title="Wedding Journals" 
        subtitle="Chronicles of Love" 
      />
    </div>
  );
};

export default Stories;
