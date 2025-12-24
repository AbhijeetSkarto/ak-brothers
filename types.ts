
export interface StoryCard {
  id: string;
  title: string;
  location: string;
  image: string;
  category: string;
}

export interface FilmItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  type: 'youtube' | 'drive';
}

export interface UploadZone {
  id: string;
  label: string;
  aspectRatio: string;
  currentFile?: string;
  type: 'image' | 'video';
}
