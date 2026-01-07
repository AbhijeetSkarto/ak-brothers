
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GALLERY_DATABASE, BRAND } from '../constants.tsx';
import { db, storage } from '../firebase.ts';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Define the shape of our content
export type VisualEffect = 'natural' | 'noir' | 'vintage' | 'vivid' | 'matte';
export type HomeLayout = 'classic' | 'framed' | 'editorial';

export interface Story {
  id: string;
  title: string;
  couple: string;
  location: string;
  description: string;
  coverImage: string;
  gallery: string[];
  content: string; // HTML or Rich Text
  published: boolean;
}

interface SiteContent {
  logo: string;
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  globalEffect: VisualEffect;
  homeLayout: HomeLayout;
  
  // Security
  adminCredentials: {
    username: string;
    pass: string; 
  };

  // Galleries
  portraits: string[];
  stories: Story[]; // Updated to complex object
  preWeddings: string[];
  photobooks: string[];
  special: string[]; 
  
  // Complex Data
  films: { title: string; url: string; thumbnail: string }[];
  
  // Text Pages
  about: {
    title: string;
    subtitle: string;
    description: string;
    founderBio: string;
    images: string[];
    videos: string[];
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
  };
  
  // Global Settings for Stories Page
  storiesSettings: {
    heading: string;
    subheading: string;
  };
}

interface ContentContextType {
  content: SiteContent;
  updateLogo: (url: string) => void;
  updateHero: (data: Partial<SiteContent>) => void;
  updateGlobalEffect: (effect: VisualEffect) => void;
  updateHomeLayout: (layout: HomeLayout) => void;
  updateCollection: (key: 'portraits' | 'preWeddings' | 'photobooks' | 'special', images: string[]) => void;
  updateStories: (stories: Story[]) => void;
  updateStoriesSettings: (settings: SiteContent['storiesSettings']) => void;
  updateFilms: (films: SiteContent['films']) => void;
  updateAbout: (data: Partial<SiteContent['about']>) => void;
  updateContact: (data: Partial<SiteContent['contact']>) => void;
  updateCredentials: (username: string, pass: string) => void;
  uploadImage: (file: File) => Promise<string>;
  resetContent: () => void;
  saveContent: () => void; 
  hasUnsavedChanges: boolean; 
  saveStatus: 'idle' | 'saving' | 'saved' | 'error' | 'offline-demo';
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Initial State (Fallbacks)
const INITIAL_CONTENT: SiteContent = {
  logo: BRAND.logo,
  heroImage: BRAND.heroBg,
  heroTitle: 'AK BROTHERS',
  heroSubtitle: 'PHOTOGRAPHY',
  globalEffect: 'natural',
  homeLayout: 'classic',
  adminCredentials: { username: 'admin', pass: 'akbrothers' },
  portraits: [...GALLERY_DATABASE.portraits],
  preWeddings: [...GALLERY_DATABASE.preWeddings],
  photobooks: [...GALLERY_DATABASE.photobooks],
  special: [
    'https://acqlo-fff.s3.ap-south-1.amazonaws.com/user_uploads/f9cfc13f-a90b-45f1-b554-289482e6140a-88.jpg',
    'https://acqlo-fff.s3.ap-south-1.amazonaws.com/user_uploads/eae86dfb-7c55-4691-9b9a-60b1677fb07e-005.jpg',
    'https://acqlo-fff.s3.ap-south-1.amazonaws.com/user_uploads/97978b63-dbed-4fff-a61e-b60f5fd6eb57-69.jpg'
  ], 
  
  // Updated Stories Data with Premium Samples
  stories: [
    {
      id: 'story-1',
      title: 'The Gradual Dawn',
      couple: 'Ananya & Rohan',
      location: 'Udaipur, Rajasthan',
      description: 'A decade of friendship blossoming into a lifetime of promise. Set against the regal silence of the City Palace, their union was not just a wedding, but a testament to patient, enduring love.',
      coverImage: GALLERY_DATABASE.stories[0],
      gallery: [],
      content: '',
      published: true
    },
    {
      id: 'story-2',
      title: 'Gold & Dust',
      couple: 'Zara & Kabir',
      location: 'Jaisalmer, India',
      description: 'Where the desert winds whisper ancient vows. A celebration of raw emotion and golden hour magic, capturing the alchemy of two souls merging under the vast expanse of the Thar sky.',
      coverImage: GALLERY_DATABASE.stories[1],
      gallery: [],
      content: '',
      published: true
    },
    {
      id: 'story-3',
      title: 'Midnight in Milan',
      couple: 'Kiara & Alessandro',
      location: 'Lake Como, Italy',
      description: 'An ethereal union under the Italian stars. High fashion meets timeless romance in a villa that has stood witness to centuries of love stories. A black-tie affair defined by elegance.',
      coverImage: GALLERY_DATABASE.stories[2],
      gallery: [],
      content: '',
      published: true
    },
    {
      id: 'story-4',
      title: 'Storms & Serenity',
      couple: 'Meera & Ishaan',
      location: 'Kerala Backwaters',
      description: 'The drama of the monsoon meeting the tranquility of the backwaters. A poetic narrative of finding calm within the chaos, celebrated with intimate rituals and rain-washed promises.',
      coverImage: GALLERY_DATABASE.stories[3],
      gallery: [],
      content: '',
      published: true
    }
  ],
  storiesSettings: {
    heading: 'WEDDING STORIES',
    subheading: 'CURATED NARRATIVES OF LOVE'
  },
  
  // Fallback films (ensure safe thumbnail access)
  films: GALLERY_DATABASE.films.map((f, i) => ({ 
    ...f, 
    thumbnail: GALLERY_DATABASE.stories[i % GALLERY_DATABASE.stories.length] 
  })),

  about: {
    title: 'AK BROTHERS PHOTOGRAPHY',
    subtitle: 'Crafting Timeless Stories',
    description: `At AK BROTHERS PHOTOGRAPHY, we do not simply capture events; we curate legacies. For over seven years, we have stood at the forefront of luxury wedding cinematography, redefining the art of storytelling for the modern couple.\n\nOur lens seeks the profound emotions hidden in fleeting glances, the silent promises exchanged in a heartbeat, and the grandeur of celebration. We believe that a wedding is not just a day—it is a timeless narrative waiting to be told with cinematic elegance. From intimate pre-wedding editorials to grand destination spectacles, our dedicated team brings a refined, high-fashion aesthetic to every frame, ensuring your memories are preserved as a masterpiece of emotion and artistry.`,
    founderBio: `Akash is the visionary force and creative soul behind AK BROTHERS. Starting his journey with nothing but a camera and a relentless passion for visual storytelling, he has grown into one of the most sought-after names in the industry.\n\nHis approach is defined by a unique blend of directorial precision and candid spontaneity. Akash leads with a quiet confidence, guiding couples through their day while capturing their most authentic selves. His distinct eye for lighting and composition transforms ordinary moments into cinematic poetry. For Akash, photography is more than a profession; it is a lifelong pursuit of perfection, driven by the desire to give every client a legacy they can cherish forever.`,
    images: [BRAND.heroBg, GALLERY_DATABASE.portraits[0], GALLERY_DATABASE.stories[0]],
    videos: []
  },
  contact: { email: BRAND.email, phone: BRAND.phone, address: BRAND.address, instagram: BRAND.instagram }
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error' | 'offline-demo'>('idle');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isFirebaseAvailable, setIsFirebaseAvailable] = useState(false);

  // Check if Firebase keys are present
  useEffect(() => {
    const meta = import.meta as any;
    const env = meta.env || {};
    
    if (env.VITE_API_KEY) {
      setIsFirebaseAvailable(true);
    } else {
      console.warn("Firebase API keys missing. Running in Offline Demo Mode (localStorage).");
      setSaveStatus('offline-demo');
    }
  }, []);

  // LOAD DATA: Fetch from Firebase (or LocalStorage fallback)
  useEffect(() => {
    const loadContent = async () => {
      // 1. Try Firebase first
      if (isFirebaseAvailable && db) {
        try {
          const docRef = doc(db, "content", "main");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
             // Merge with initial to ensure structure integretity
             const loadedData = docSnap.data() as SiteContent;
             // Ensure stories is an array of objects (migration safety for new data structure)
             if (loadedData.stories && Array.isArray(loadedData.stories) && typeof loadedData.stories[0] === 'string') {
                 // Migrate old string array to new object array using initial content
                 loadedData.stories = INITIAL_CONTENT.stories;
             }
             if (!loadedData.storiesSettings) {
                loadedData.storiesSettings = INITIAL_CONTENT.storiesSettings;
             }
             setContent(prev => ({ ...prev, ...loadedData }));
             return;
          }
        } catch (err) {
          console.error("Firebase Load Error:", err);
        }
      }

      // 2. Fallback to LocalStorage (Using v6 for fresh structure)
      try {
        const saved = localStorage.getItem('ak_brothers_content_v6');
        if (saved) {
          const parsed = JSON.parse(saved);
          setContent(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error("LocalStorage Load Error", error);
      }
    };

    loadContent();
  }, [isFirebaseAvailable]);

  // SAVE DATA: Write to Firebase (and LocalStorage)
  const saveContent = async () => {
    setSaveStatus('saving');
    
    // Always save to LocalStorage as backup
    try {
      localStorage.setItem('ak_brothers_content_v6', JSON.stringify(content));
    } catch(e) { console.error("LS Save Fail", e); }

    if (isFirebaseAvailable && db) {
      try {
        await setDoc(doc(db, "content", "main"), content);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error("Firebase Save Error", error);
        setSaveStatus('error');
      }
    } else {
      // Offline mode success
      setTimeout(() => setSaveStatus('saved'), 500);
      setTimeout(() => setSaveStatus('offline-demo'), 2000);
      setHasUnsavedChanges(false);
    }
  };

  // UPLOAD IMAGE: Upload to Firebase Storage
  const uploadImage = async (file: File): Promise<string> => {
    if (!isFirebaseAvailable || !storage) {
      // Fallback: Base64 (Not recommended for prod, but works for demo)
      return new Promise((resolve, reject) => {
        if (file.size > 2 * 1024 * 1024) {
          alert("Demo Mode: Image must be under 2MB");
          reject(new Error("File too large"));
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    }

    try {
      const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Upload failed", error);
      throw error;
    }
  };

  // Helper to mark changes
  const markChanged = () => setHasUnsavedChanges(true);

  const updateLogo = (url: string) => { setContent(prev => ({ ...prev, logo: url })); markChanged(); };
  const updateHero = (data: Partial<SiteContent>) => { setContent(prev => ({ ...prev, ...data })); markChanged(); };
  const updateGlobalEffect = (effect: VisualEffect) => { setContent(prev => ({ ...prev, globalEffect: effect })); markChanged(); };
  const updateHomeLayout = (layout: HomeLayout) => { setContent(prev => ({ ...prev, homeLayout: layout })); markChanged(); };
  
  const updateCollection = (key: 'portraits' | 'preWeddings' | 'photobooks' | 'special', images: string[]) => {
    setContent(prev => ({ ...prev, [key]: images }));
    markChanged();
  };

  const updateStories = (stories: Story[]) => {
    setContent(prev => ({ ...prev, stories }));
    markChanged();
  };
  
  const updateStoriesSettings = (settings: SiteContent['storiesSettings']) => {
    setContent(prev => ({ ...prev, storiesSettings: settings }));
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
    if (window.confirm("Are you sure you want to reset all content to default?")) {
      setContent(INITIAL_CONTENT);
      localStorage.removeItem('ak_brothers_content_v6');
      setHasUnsavedChanges(true); // Mark as changed so we can save the reset to Firebase
    }
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateLogo,
      updateHero, 
      updateGlobalEffect, 
      updateHomeLayout,
      updateCollection, 
      updateStories,
      updateStoriesSettings,
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
