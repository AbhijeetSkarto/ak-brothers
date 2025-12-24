
import React from 'react';
import InstagramGrid, { MediaItem } from '../components/InstagramGrid.tsx';
import { GALLERY_DATABASE } from '../constants.tsx';

const Films: React.FC = () => {
  const filmItems: MediaItem[] = GALLERY_DATABASE.films.map((film, i) => ({
    id: `film-${i}`,
    type: 'video',
    thumbnail: GALLERY_DATABASE.stories[i % GALLERY_DATABASE.stories.length],
    likes: '12.4k',
    comments: '450',
    caption: film.title,
    videoUrl: film.url
  }));

  return (
    <div className="pt-40 min-h-screen bg-obsidian">
      <section className="px-6 md:px-20 mb-32 text-center">
        <span className="text-gold font-cinzel text-[10px] tracking-[1em] uppercase mb-6 block opacity-60">Motion Pictures</span>
        <h2 className="font-cinzel text-6xl md:text-[12rem] text-silver tracking-tighter leading-none mb-10">THE FILMS</h2>
        <p className="text-platinum/40 text-xs tracking-[0.4em] uppercase max-w-xl mx-auto leading-loose">
          A collection of cinematic wedding trailers and highlights that capture the rhythm of your celebration.
        </p>
      </section>

      <InstagramGrid 
        items={filmItems} 
        title="Cinematography" 
        subtitle="Moving Narratives" 
      />
    </div>
  );
};

export default Films;
