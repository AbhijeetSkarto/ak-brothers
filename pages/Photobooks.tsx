
import React from 'react';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';

const PHOTOBOOK_DATA: MediaItem[] = [
  { id: 'pb1', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800', likes: '3.2k', comments: '12', caption: 'Luxury Album' },
  { id: 'pb2', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800', likes: '1.4k', comments: '22', caption: 'Handcrafted Print' },
  { id: 'pb3', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800', likes: '2.2k', comments: '34', caption: 'Legacy Book' },
  { id: 'pb4', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', likes: '5.6k', comments: '120', caption: 'Couture Album' },
  { id: 'pb5', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800', likes: '890', comments: '5', caption: 'Fine Art Print' },
  { id: 'pb6', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800', likes: '1.2k', comments: '20', caption: 'Heritage Volume' },
];

const Photobooks: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-obsidian">
      <InstagramGrid 
        items={PHOTOBOOK_DATA} 
        title="Luxury Prints" 
        subtitle="The Handcrafted Albums" 
      />
    </div>
  );
};

export default Photobooks;
