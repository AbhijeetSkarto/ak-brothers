
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GALLERY_DATABASE, BRAND } from '../constants.tsx';
import { db, storage } from '../firebase.ts';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    pass: string; 
  };

  // Galleries
  portraits: string[];
  stories: string[];
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
  saveContent: () => void; 
  hasUnsavedChanges: boolean; 
  saveStatus: 'idle' | 'saving' | 'saved' | 'error' | 'offline-demo';
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Initial State (Fallbacks)
const INITIAL_CONTENT: SiteContent = {
  heroImage: BRAND.heroBg,
  heroTitle: 'AK BROTHERS',
  heroSubtitle: 'PHOTOGRAPHY',
  globalEffect: 'natural',
  homeLayout: 'classic',
  adminCredentials: { username: 'admin', pass: 'akbrothers' },
  portraits: [...GALLERY_DATABASE.portraits],
  stories: [...GALLERY_DATABASE.stories],
  preWeddings: [...GALLERY_DATABASE.preWeddings],
  photobooks: [...GALLERY_DATABASE.photobooks],
  special: [], 
  films: GALLERY_DATABASE.films.map((f, i) => ({ ...f, thumbnail: GALLERY_DATABASE.stories[i % GALLERY_DATABASE.stories.length] })),
  about: {
    title: 'AK BROTHERS PHOTOGRAPHY',
    subtitle: 'Crafting Timeless Stories',
    description: `AK Brothers Photography is a premium photography brand founded by Akash, built on a simple belief — every moment deserves to be remembered beautifully.\nWe don’t just take photographs; we create visual stories that live forever.\n\nWith a sharp eye for detail, cinematic lighting, and an artistic approach, AK Brothers Photography specializes in capturing emotions exactly the way they are — real, powerful, and timeless.\n\nOUR PHILOSOPHY\nPhotography is not about poses.\nIt’s about feelings, expressions, and moments you can relive again and again.`,
    images: [BRAND.heroBg],
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
             setContent(prev => ({ ...prev, ...docSnap.data() as SiteContent }));
             return;
          }
        } catch (err) {
          console.error("Firebase Load Error:", err);
        }
      }

      // 2. Fallback to LocalStorage
      try {
        const saved = localStorage.getItem('ak_brothers_content_v5');
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
      localStorage.setItem('ak_brothers_content_v5', JSON.stringify(content));
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
    if (window.confirm("Are you sure you want to reset all content to default?")) {
      setContent(INITIAL_CONTENT);
      localStorage.removeItem('ak_brothers_content_v5');
      setHasUnsavedChanges(true); // Mark as changed so we can save the reset to Firebase
    }
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
