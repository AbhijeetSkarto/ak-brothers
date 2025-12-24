
import React from 'react';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';

const PRE_WED_DATA: MediaItem[] = [
  { id: 'p1', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800', likes: '1.2k', comments: '22', caption: 'Golden Hour' },
  { id: 'p2', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800', likes: '950', comments: '14', caption: 'Urban Romance' },
  { id: 'p3', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800', likes: '2.4k', comments: '56', caption: 'Classic Love' },
  { id: 'p4', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', likes: '3.1k', comments: '90', caption: 'Nature Vows' },
  { id: 'p5', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800', likes: '5.2k', comments: '180', caption: 'Teaser' },
  { id: 'p6', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800', likes: '1.8k', comments: '34', caption: 'Sunset Gaze' },
];

const PreWeddings: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-obsidian">
      <InstagramGrid 
        items={PRE_WED_DATA} 
        title="Pre-Weddings" 
        subtitle="Before The Vows" 
      />
    </div>
  );
};

export default PreWeddings;
