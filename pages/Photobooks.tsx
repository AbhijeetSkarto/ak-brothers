
import React from 'react';
import InstagramGrid from '../components/InstagramGrid';

const PHOTOBOOK_DATA = [
  { id: 'pb1', type: 'image', url: '#', thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800', likes: '3.2k', comments: '12' },
  { id: 'pb2', type: 'image', url: '#', thumbnail: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800', likes: '1.4k', comments: '22' },
  { id: 'pb3', type: 'image', url: '#', thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800', likes: '2.2k', comments: '34' },
  { id: 'pb4', type: 'image', url: '#', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', likes: '5.6k', comments: '120' },
  { id: 'pb5', type: 'image', url: '#', thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800', likes: '890', comments: '5' },
  { id: 'pb6', type: 'image', url: '#', thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800', likes: '1.2k', comments: '20' },
];

const Photobooks: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-obsidian">
      <InstagramGrid 
        items={PHOTOBOOK_DATA as any} 
        title="Luxury Prints" 
        subtitle="The Handcrafted Albums" 
      />
    </div>
  );
};

export default Photobooks;
