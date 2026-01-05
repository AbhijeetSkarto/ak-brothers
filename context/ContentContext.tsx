
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GALLERY_DATABASE, BRAND } from '../constants.tsx';

// Define the shape of our content
export type VisualEffect = 'natural' | 'noir' | 'vintage' | 'vivid' | 'matte';
export type HomeLayout = 'classic' | 'framed' | 'editorial';

interface SiteContent {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  globalEffect: VisualEffect;
  homeLayout: HomeLayout;
  
  // Security
  adminCredentials: {
    username: string;
    pass: string; // 'pass' to avoid confusion with internal props
  };

  // Galleries
  portraits: string[];
  stories: string[];
  preWeddings: string[];
  photobooks: string[];
  special: string[]; // New Collection
  
  // Complex Data
  films: { title: string; url: string; thumbnail: string }[];
  
  // Text Pages
  about: {
    title: string;
    subtitle: string;
    description: string;
    images: string[];
    videos: string[];
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
  };
}

interface ContentContextType {
  content: SiteContent;
  updateHero: (data: Partial<SiteContent>) => void;
  updateGlobalEffect: (effect: VisualEffect) => void;
  updateHomeLayout: (layout: HomeLayout) => void;
  updateCollection: (key: 'portraits' | 'stories' | 'preWeddings' | 'photobooks' | 'special', images: string[]) => void;
  updateFilms: (films: SiteContent['films']) => void;
  updateAbout: (data: Partial<SiteContent['about']>) => void;
  updateContact: (data: Partial<SiteContent['contact']>) => void;
  updateCredentials: (username: string, pass: string) => void;
  uploadImage: (file: File) => Promise<string>;
  resetContent: () => void;
  saveContent: () => void; // Manual save trigger
  hasUnsavedChanges: boolean; // Tracking state
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY = 'ak_brothers_content_v4';

const INITIAL_CONTENT: SiteContent = {
  heroImage: BRAND.heroBg,
  heroTitle: 'AK BROTHERS',
  heroSubtitle: 'PHOTOGRAPHY',
  globalEffect: 'natural',
  homeLayout: 'classic',
  
  adminCredentials: {
    username: 'admin',
    pass: 'akbrothers'
  },

  portraits: [...GALLERY_DATABASE.portraits],
  stories: [...GALLERY_DATABASE.stories],
  preWeddings: [...GALLERY_DATABASE.preWeddings],
  photobooks: [...GALLERY_DATABASE.photobooks],
  special: [], // Initialize new collection
  
  films: GALLERY_DATABASE.films.map((f, i) => ({
    ...f,
    thumbnail: GALLERY_DATABASE.stories[i % GALLERY_DATABASE.stories.length]
  })),

  about: {
    title: 'AK BROTHERS',
    subtitle: 'The Creators',
    description: "We are storytellers at heart. At AK Brothers, we don't just capture weddings; we archive history. Our philosophy is rooted in the belief that every couple has a unique rhythm, a visual language that deserves to be spoken through lens and light. Based in Bhopal but traveling globally, our team specializes in high-contrast, emotive cinematography that feels less like a wedding video and more like a cinematic legacy.",
    images: [BRAND.heroBg],
    videos: []
  },

  contact: {
    email: BRAND.email,
    phone: BRAND.phone,
    address: BRAND.address,
    instagram: BRAND.instagram
  }
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Data Migration
        if (parsed.about) {
           if (parsed.about.image && (!parsed.about.images || parsed.about.images.length === 0)) {
               parsed.about.images = [parsed.about.image];
           }
           if (!parsed.about.images) {
               parsed.about.images = [BRAND.heroBg];
           }
           if (!parsed.about.videos) {
               parsed.about.videos = [];
           }
        }
        if (!parsed.special) {
          parsed.special = [];
        }

        // Ensure new fields exist if loading old data
        if (!parsed.adminCredentials) parsed.adminCredentials = INITIAL_CONTENT.adminCredentials;
        
        setContent(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error("Failed to load backend data", error);
    }
  }, []);

  // Manual Save Function
  const saveContent = async () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      setTimeout(() => setSaveStatus('saved'), 500);
      setTimeout(() => setSaveStatus('idle'), 2000);
      setHasUnsavedChanges(false);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  // Helper to mark changes
  const markChanged = () => setHasUnsavedChanges(true);

  const updateHero = (data: Partial<SiteContent>) => { setContent(prev => ({ ...prev, ...data })); markChanged(); };
  const updateGlobalEffect = (effect: VisualEffect) => { setContent(prev => ({ ...prev, globalEffect: effect })); markChanged(); };
  const updateHomeLayout = (layout: HomeLayout) => { setContent(prev => ({ ...prev, homeLayout: layout })); markChanged(); };
  
  const updateCollection = (key: 'portraits' | 'stories' | 'preWeddings' | 'photobooks' | 'special', images: string[]) => {
    setContent(prev => ({ ...prev, [key]: images }));
    markChanged();
  };

  const updateFilms = (films: SiteContent['films']) => {
    setContent(prev => ({ ...prev, films }));
    markChanged();
  };

  const updateAbout = (data: Partial<SiteContent['about']>) => {
    setContent(prev => ({ ...prev, about: { ...prev.about, ...data } }));
    markChanged();
  };

  const updateContact = (data: Partial<SiteContent['contact']>) => {
    setContent(prev => ({ ...prev, contact: { ...prev.contact, ...data } }));
    markChanged();
  };

  const updateCredentials = (username: string, pass: string) => {
    setContent(prev => ({ ...prev, adminCredentials: { username, pass } }));
    markChanged();
  };

  const resetContent = () => {
    if (window.confirm("Are you sure you want to reset all content (including passwords) to default?")) {
      setContent(INITIAL_CONTENT);
      localStorage.removeItem(STORAGE_KEY);
      setHasUnsavedChanges(false);
    }
  };

  const uploadImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        alert("For demo, please use images under 2MB.");
        reject(new Error("File too large"));
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateHero, 
      updateGlobalEffect, 
      updateHomeLayout,
      updateCollection, 
      updateFilms,
      updateAbout, 
      updateContact,
      updateCredentials,
      uploadImage, 
      resetContent, 
      saveContent,
      hasUnsavedChanges,
      saveStatus 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};
