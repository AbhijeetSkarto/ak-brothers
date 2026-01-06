
import React, { useState } from 'react';
import { LayoutDashboard, Image as ImageIcon, Video, Settings, User, Phone, Upload, LogOut, RefreshCw, CheckCircle, Trash2, LayoutTemplate, Square, Columns, Palette, Shield, Save, Plus, AlertTriangle, CloudOff, Loader } from 'lucide-react';
import { useContent, VisualEffect } from '../context/ContentContext.tsx';
import { THEME_EFFECTS, GALLERY_DATABASE } from '../constants.tsx';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { 
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
  } = useContent();
  
  const [activeTab, setActiveTab] = useState<'hero' | 'portfolio' | 'films' | 'about' | 'contact' | 'theme' | 'security'>('theme');
  const [isUploading, setIsUploading] = useState(false);
  
  // Film Form State
  const [newFilmTitle, setNewFilmTitle] = useState('');
  const [newFilmUrl, setNewFilmUrl] = useState('');
  const [newFilmThumbnail, setNewFilmThumbnail] = useState('');

  // About Video Form State
  const [newAboutVideo, setNewAboutVideo] = useState('');

  // Password Reset State
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [credMessage, setCredMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === content.adminCredentials.username && password === content.adminCredentials.pass) {
      setIsAuthenticated(true);
      setError('');
      // Pre-fill change password fields
      setNewUsername(content.adminCredentials.username);
    } else {
      setError('Invalid credentials');
    }
  };

  const handleChangeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setCredMessage("Passwords do not match");
      return;
    }
    if (newPassword.length < 4) {
      setCredMessage("Password too weak (min 4 chars)");
      return;
    }
    updateCredentials(newUsername, newPassword);
    setCredMessage("Credentials updated successfully!");
    setTimeout(() => setCredMessage(''), 3000);
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        updateHero({ heroImage: url });
      } catch(e) { console.error(e); }
      setIsUploading(false);
    }
  };

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        updateAbout({ images: [url, ...(content.about.images || [])] });
      } catch(e) { console.error(e); }
      setIsUploading(false);
    }
  };

  const removeAboutImage = (index: number) => {
    const newImages = content.about.images.filter((_, i) => i !== index);
    updateAbout({ images: newImages });
  };

  const addAboutVideo = () => {
    if (newAboutVideo) {
       updateAbout({ videos: [...(content.about.videos || []), newAboutVideo] });
       setNewAboutVideo('');
    }
  };

  const removeAboutVideo = (index: number) => {
    const newVideos = content.about.videos.filter((_, i) => i !== index);
    updateAbout({ videos: newVideos });
  };

  // Bulk Upload logic
  const handleGridUpload = async (e: React.ChangeEvent<HTMLInputElement>, collection: 'portraits' | 'stories' | 'preWeddings' | 'photobooks' | 'special') => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      try {
        const files = Array.from(e.target.files) as File[];
        // Note: In a real app, you might want to limit concurrent uploads
        const uploadPromises = files.map(file => uploadImage(file).catch(err => {
           console.error(`Failed to upload ${file.name}`, err);
           return null;
        }));
        
        const results = await Promise.all(uploadPromises);
        const validUrls = results.filter((url): url is string => url !== null);

        if (validUrls.length > 0) {
          updateCollection(collection, [...validUrls, ...content[collection]]);
        }
      } catch(e) { console.error(e); }
      setIsUploading(false);
      e.target.value = ''; // Reset input to allow re-uploading same files
    }
  };

  const handleFilmThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        const updatedFilms = [...content.films];
        updatedFilms[index] = { ...updatedFilms[index], thumbnail: url };
        updateFilms(updatedFilms);
      } catch(e) { console.error(e); }
      setIsUploading(false);
    }
  };

  const handleNewFilmThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        setNewFilmThumbnail(url);
      } catch(e) { console.error(e); }
      setIsUploading(false);
    }
  };

  const removeImage = (collection: 'portraits' | 'stories' | 'preWeddings' | 'photobooks' | 'special', index: number) => {
    const newImages = content[collection].filter((_, i) => i !== index);
    updateCollection(collection, newImages);
  };

  const addFilm = () => {
    if (newFilmTitle && newFilmUrl) {
      // Logic: Use uploaded thumbnail, else fallback to first story image, else placeholder
      const defaultThumb = (content.stories && content.stories.length > 0) 
        ? content.stories[0] 
        : 'https://via.placeholder.com/150';

      const thumbToUse = newFilmThumbnail || defaultThumb;

      updateFilms([...content.films, { 
        title: newFilmTitle, 
        url: newFilmUrl, 
        thumbnail: thumbToUse
      }]);
      
      // Reset form
      setNewFilmTitle('');
      setNewFilmUrl('');
      setNewFilmThumbnail('');
    }
  };

  const removeFilm = (index: number) => {
    updateFilms(content.films.filter((_, i) => i !== index));
  };

  const updateFilmDetails = (index: number, field: 'title' | 'url', value: string) => {
    const updatedFilms = [...content.films];
    updatedFilms[index] = { ...updatedFilms[index], [field]: value };
    updateFilms(updatedFilms);
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white border border-black/5 p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
          <div className="text-center mb-10">
            <span className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase block mb-2">Private Access</span>
            <h2 className="font-cinzel text-3xl text-obsidian">Studio Admin</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-charcoal/60 mb-2">Username</label>
              <input type="text" className="w-full bg-cream/50 border-b border-black/10 p-3 text-sm focus:outline-none focus:border-gold" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-charcoal/60 mb-2">Password</label>
              <input type="password" className="w-full bg-cream/50 border-b border-black/10 p-3 text-sm focus:outline-none focus:border-gold" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button type="submit" className="w-full bg-obsidian text-white py-4 font-cinzel text-[10px] uppercase tracking-[0.3em] hover:bg-gold transition-colors">Authenticate</button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-cream pt-24 pb-24 relative">
      
      {/* Uploading Overlay */}
      {isUploading && (
        <div className="fixed inset-0 z-[100] bg-cream/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-black/10 border-t-gold rounded-full animate-spin mb-6"></div>
            <p className="font-cinzel text-obsidian tracking-[0.2em] uppercase text-sm animate-pulse">Uploading Media...</p>
        </div>
      )}

      {/* Save Button */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
        {saveStatus === 'offline-demo' && (
           <div className="bg-gray-800 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg opacity-80">
              <CloudOff size={14} /> <span className="text-[10px] uppercase tracking-widest">Offline Demo Mode</span>
           </div>
        )}
        {hasUnsavedChanges ? (
          <button 
            onClick={saveContent}
            className="bg-gold text-obsidian px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-cinzel text-xs uppercase tracking-widest hover:scale-105 transition-transform animate-bounce"
          >
            <Save size={18} /> Publish Changes
          </button>
        ) : (
           saveStatus === 'saved' && (
             <div className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
                <CheckCircle size={14} /> <span className="text-[10px] uppercase tracking-widest">Published Live</span>
             </div>
           )
        )}
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-black/5 pb-8 gap-6">
          <div>
             <h1 className="font-cinzel text-4xl text-obsidian uppercase mb-2">Content Manager</h1>
             <p className="text-charcoal/50 text-xs tracking-widest">Full Control CMS for AK BROTHERS.</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={resetContent} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/60 hover:text-red-600"><RefreshCw size={14} /> Reset Data</button>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-500 hover:text-red-700"><LogOut size={16} /> Logout</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <nav className="space-y-2 lg:col-span-1">
             {[
               { id: 'theme', icon: Palette, label: 'Theme & Style' },
               { id: 'hero', icon: LayoutDashboard, label: 'Hero Home' },
               { id: 'portfolio', icon: ImageIcon, label: 'Photos' },
               { id: 'films', icon: Video, label: 'Films' },
               { id: 'about', icon: User, label: 'About Us' },
               { id: 'contact', icon: Phone, label: 'Contact Info' },
               { id: 'security', icon: Shield, label: 'Security' },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`w-full flex items-center gap-4 px-6 py-4 transition-all text-[11px] uppercase tracking-widest font-cinzel ${activeTab === tab.id ? 'bg-gold text-white shadow-lg' : 'bg-white hover:bg-black/5 text-charcoal'}`}
               >
                 <tab.icon size={16} /> {tab.label}
               </button>
             ))}
          </nav>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-12">
            
            {/* --- HERO SECTION --- */}
            {activeTab === 'hero' && (
               <div className="space-y-8">
                  <div className="bg-white p-8 border border-black/5 shadow-sm">
                     <h3 className="font-cinzel text-lg mb-6">Hero Texts</h3>
                     <div className="space-y-4">
                        <div>
                           <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Main Title</label>
                           <input type="text" className="w-full p-3 border border-black/10 bg-cream/20 font-cinzel" value={content.heroTitle} onChange={(e) => updateHero({ heroTitle: e.target.value })} />
                        </div>
                        <div>
                           <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Subtitle</label>
                           <input type="text" className="w-full p-3 border border-black/10 bg-cream/20 font-cinzel" value={content.heroSubtitle} onChange={(e) => updateHero({ heroSubtitle: e.target.value })} />
                        </div>
                     </div>
                  </div>

                  <div className="bg-white p-8 border border-black/5 shadow-sm">
                     <h3 className="font-cinzel text-lg mb-6">Main Background</h3>
                     <div className="aspect-video bg-black/10 mb-6 relative group overflow-hidden">
                        <img src={content.heroImage} alt="Hero" className={`w-full h-full object-cover ${THEME_EFFECTS[content.globalEffect]}`} />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-white text-xs uppercase tracking-widest border border-white px-4 py-2">Preview</span>
                        </div>
                     </div>
                     <label className="bg-obsidian text-white px-6 py-3 text-xs uppercase tracking-widest cursor-pointer hover:bg-gold transition-colors inline-block">
                        Upload New Image
                        <input type="file" className="hidden" onChange={handleHeroUpload} accept="image/*" />
                     </label>
                  </div>
               </div>
            )}

            {/* --- THEME SECTION --- */}
            {activeTab === 'theme' && (
              <div className="space-y-8">
                {/* Visual Effect Selector */}
                <div className="bg-white p-8 border border-black/5 shadow-sm">
                  <h3 className="font-cinzel text-lg mb-2">Visual Grading</h3>
                  <p className="text-charcoal/50 text-xs mb-6">Applies a global color grade to all images.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {(['natural', 'noir', 'vintage', 'vivid', 'matte'] as VisualEffect[]).map((effect) => (
                      <button 
                        key={effect}
                        onClick={() => updateGlobalEffect(effect)}
                        className={`p-4 border ${content.globalEffect === effect ? 'border-gold bg-gold/10' : 'border-black/5 hover:border-gold/50'} text-center transition-all`}
                      >
                         <div className={`w-full h-16 bg-cover bg-center mb-3 ${THEME_EFFECTS[effect]}`} style={{ backgroundImage: `url(${content.heroImage})` }}></div>
                         <span className="text-[10px] uppercase tracking-widest block">{effect}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layout Selector */}
                <div className="bg-white p-8 border border-black/5 shadow-sm">
                   <h3 className="font-cinzel text-lg mb-2">Home Layout</h3>
                   <p className="text-charcoal/50 text-xs mb-6">Choose the structural design of the landing page.</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <button onClick={() => updateHomeLayout('classic')} className={`p-6 border text-left transition-all ${content.homeLayout === 'classic' ? 'border-gold bg-gold/10' : 'border-black/5'}`}>
                         <LayoutTemplate className="mb-4 text-obsidian" size={24} />
                         <span className="font-cinzel text-sm block mb-1">Classic</span>
                         <span className="text-[10px] text-charcoal/60 leading-relaxed block">Full screen cinematic background with centered typography.</span>
                      </button>
                      <button onClick={() => updateHomeLayout('framed')} className={`p-6 border text-left transition-all ${content.homeLayout === 'framed' ? 'border-gold bg-gold/10' : 'border-black/5'}`}>
                         <Square className="mb-4 text-obsidian" size={24} />
                         <span className="font-cinzel text-sm block mb-1">Framed</span>
                         <span className="text-[10px] text-charcoal/60 leading-relaxed block">Boxed image with white borders and high-contrast text overlay.</span>
                      </button>
                      <button onClick={() => updateHomeLayout('editorial')} className={`p-6 border text-left transition-all ${content.homeLayout === 'editorial' ? 'border-gold bg-gold/10' : 'border-black/5'}`}>
                         <Columns className="mb-4 text-obsidian" size={24} />
                         <span className="font-cinzel text-sm block mb-1">Editorial</span>
                         <span className="text-[10px] text-charcoal/60 leading-relaxed block">Split screen layout. Text on one side, image on the other.</span>
                      </button>
                   </div>
                </div>
              </div>
            )}

            {/* --- PORTFOLIO SECTION --- */}
            {activeTab === 'portfolio' && (
               <div className="space-y-12">
                  {[
                    { key: 'portraits', label: 'Portraits' }, 
                    { key: 'stories', label: 'Wedding Stories' },
                    { key: 'preWeddings', label: 'Pre-Weddings' },
                    { key: 'photobooks', label: 'Photobooks' },
                    { key: 'special', label: 'Special Highlights' }
                  ].map((section) => (
                    <div key={section.key} className="bg-white p-8 border border-black/5 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="font-cinzel text-lg">{section.label}</h3>
                           <label className="bg-black/5 hover:bg-gold hover:text-white px-4 py-2 text-[10px] uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-2">
                             <Plus size={14} /> Add Images
                             <input 
                               type="file" 
                               multiple 
                               className="hidden" 
                               onChange={(e) => handleGridUpload(e, section.key as any)} 
                               accept="image/*"
                             />
                           </label>
                        </div>
                        
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                           {content[section.key as 'portraits' | 'stories' | 'preWeddings' | 'photobooks' | 'special']?.map((url, i) => (
                              <div key={i} className="relative group aspect-square bg-gray-100">
                                 <img src={url} className="w-full h-full object-cover" loading="lazy" />
                                 <button 
                                   onClick={() => removeImage(section.key as any, i)}
                                   className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                    <Trash2 size={12} />
                                 </button>
                              </div>
                           ))}
                        </div>
                    </div>
                  ))}
               </div>
            )}

            {/* --- FILMS SECTION --- */}
            {activeTab === 'films' && (
              <div className="space-y-12">
                {/* Add New Film Section */}
                <div className="bg-white p-8 shadow-sm border border-black/5">
                   <h3 className="font-cinzel text-lg mb-6">Add New Cinematography</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <input 
                        type="text" 
                        placeholder="Film Title" 
                        className="p-3 border border-black/10 bg-cream/20 text-sm focus:border-gold outline-none"
                        value={newFilmTitle}
                        onChange={(e) => setNewFilmTitle(e.target.value)}
                      />
                      <input 
                        type="text" 
                        placeholder="YouTube/Drive URL" 
                        className="p-3 border border-black/10 bg-cream/20 text-sm focus:border-gold outline-none"
                        value={newFilmUrl}
                        onChange={(e) => setNewFilmUrl(e.target.value)}
                      />
                   </div>
                   
                   <div className="mb-6">
                      <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Thumbnail Image</label>
                      <div className="flex items-center gap-4">
                         {newFilmThumbnail && <img src={newFilmThumbnail} className="w-20 h-12 object-cover border border-black/10" />}
                         <label className="cursor-pointer bg-black/5 hover:bg-gold hover:text-white px-4 py-2 text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                           <Upload size={14} /> Upload Cover
                           <input type="file" className="hidden" onChange={handleNewFilmThumbnailUpload} accept="image/*" />
                         </label>
                      </div>
                   </div>

                   <button onClick={addFilm} className="bg-obsidian text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-gold transition-colors">
                     Add Film to Gallery
                   </button>
                </div>

                {/* Existing Films List */}
                <div className="space-y-4">
                  {content.films.map((film, i) => (
                    <div key={i} className="bg-white p-4 border border-black/5 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm">
                       {/* Thumbnail Section with Edit Option */}
                       <div className="relative group shrink-0 w-40 aspect-video bg-black/10 overflow-hidden">
                          <img src={film.thumbnail} alt={film.title} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60" />
                          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-white gap-1">
                             <Upload size={18} />
                             <span className="text-[9px] uppercase tracking-widest font-bold">Change</span>
                             <input 
                               type="file" 
                               className="hidden" 
                               accept="image/*" 
                               onChange={(e) => handleFilmThumbnailUpload(e, i)} 
                             />
                          </label>
                       </div>
                       
                       <div className="flex-grow w-full space-y-2">
                          <input 
                             type="text" 
                             value={film.title} 
                             onChange={(e) => updateFilmDetails(i, 'title', e.target.value)}
                             className="w-full p-2 border-b border-black/5 focus:border-gold outline-none font-cinzel text-sm bg-transparent"
                             placeholder="Film Title"
                          />
                          <input 
                             type="text" 
                             value={film.url} 
                             onChange={(e) => updateFilmDetails(i, 'url', e.target.value)}
                             className="w-full p-2 border-b border-black/5 focus:border-gold outline-none text-xs text-charcoal/60 font-mono bg-transparent"
                             placeholder="Film URL"
                          />
                       </div>

                       <button onClick={() => removeFilm(i)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors">
                         <Trash2 size={18} />
                       </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- ABOUT SECTION --- */}
            {activeTab === 'about' && (
               <div className="space-y-8">
                  <div className="bg-white p-8 border border-black/5 shadow-sm">
                     <h3 className="font-cinzel text-lg mb-6">About Page Texts</h3>
                     <div className="space-y-4">
                        <input 
                          type="text" 
                          className="w-full p-3 border border-black/10 bg-cream/20 font-cinzel text-sm" 
                          value={content.about.title} 
                          onChange={(e) => updateAbout({ title: e.target.value })} 
                          placeholder="Main Title"
                        />
                        <input 
                          type="text" 
                          className="w-full p-3 border border-black/10 bg-cream/20 font-cinzel text-sm" 
                          value={content.about.subtitle} 
                          onChange={(e) => updateAbout({ subtitle: e.target.value })} 
                          placeholder="Subtitle"
                        />
                        <textarea 
                          rows={10}
                          className="w-full p-3 border border-black/10 bg-cream/20 text-sm leading-relaxed"
                          value={content.about.description} 
                          onChange={(e) => updateAbout({ description: e.target.value })} 
                          placeholder="Description (Supports line breaks)"
                        />
                        <p className="text-[10px] text-charcoal/40">Tip: Use ALL CAPS for subheadings. Use "✔️" or "✨" for bullet points.</p>
                     </div>
                  </div>

                  <div className="bg-white p-8 border border-black/5 shadow-sm">
                     <h3 className="font-cinzel text-lg mb-6">Founder Images</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {content.about.images.map((img, i) => (
                           <div key={i} className="relative group aspect-[4/5] bg-gray-100">
                              <img src={img} className="w-full h-full object-cover" />
                              <button onClick={() => removeAboutImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"><Trash2 size={12} /></button>
                           </div>
                        ))}
                     </div>
                     <label className="bg-black/5 hover:bg-gold hover:text-white px-6 py-3 text-xs uppercase tracking-widest cursor-pointer inline-block transition-colors">
                        Upload Image
                        <input type="file" className="hidden" onChange={handleAboutImageUpload} accept="image/*" />
                     </label>
                  </div>

                  <div className="bg-white p-8 border border-black/5 shadow-sm">
                     <h3 className="font-cinzel text-lg mb-6">Behind The Scenes Videos</h3>
                     <div className="flex gap-4 mb-6">
                        <input 
                           type="text" 
                           className="flex-grow p-3 border border-black/10 bg-cream/20 text-sm" 
                           placeholder="Video URL"
                           value={newAboutVideo}
                           onChange={(e) => setNewAboutVideo(e.target.value)}
                        />
                        <button onClick={addAboutVideo} className="bg-obsidian text-white px-6 text-xs uppercase tracking-widest hover:bg-gold">Add</button>
                     </div>
                     <div className="space-y-2">
                        {content.about.videos?.map((vid, i) => (
                           <div key={i} className="flex justify-between items-center bg-cream/30 p-3 border border-black/5">
                              <span className="text-xs truncate max-w-xs">{vid}</span>
                              <button onClick={() => removeAboutVideo(i)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* --- CONTACT SECTION --- */}
            {activeTab === 'contact' && (
               <div className="bg-white p-8 border border-black/5 shadow-sm space-y-6">
                   <h3 className="font-cinzel text-lg mb-6">Contact Information</h3>
                   
                   <div>
                      <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Phone Number</label>
                      <input type="text" className="w-full p-3 border border-black/10 bg-cream/20 text-sm" value={content.contact.phone} onChange={(e) => updateContact({ phone: e.target.value })} />
                   </div>
                   <div>
                      <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Email Address</label>
                      <input type="text" className="w-full p-3 border border-black/10 bg-cream/20 text-sm" value={content.contact.email} onChange={(e) => updateContact({ email: e.target.value })} />
                   </div>
                   <div>
                      <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Physical Address</label>
                      <textarea rows={3} className="w-full p-3 border border-black/10 bg-cream/20 text-sm" value={content.contact.address} onChange={(e) => updateContact({ address: e.target.value })} />
                   </div>
                   <div>
                      <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Instagram Link</label>
                      <input type="text" className="w-full p-3 border border-black/10 bg-cream/20 text-sm" value={content.contact.instagram} onChange={(e) => updateContact({ instagram: e.target.value })} />
                   </div>
               </div>
            )}

            {/* --- SECURITY SECTION --- */}
            {activeTab === 'security' && (
               <div className="bg-white p-8 border border-black/5 shadow-sm max-w-lg">
                  <h3 className="font-cinzel text-lg mb-6 flex items-center gap-3"><Shield size={20} className="text-gold"/> Admin Credentials</h3>
                  <form onSubmit={handleChangeCredentials} className="space-y-4">
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Username</label>
                        <input type="text" className="w-full p-3 border border-black/10 bg-cream/20 text-sm" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                     </div>
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">New Password</label>
                        <input type="password" className="w-full p-3 border border-black/10 bg-cream/20 text-sm" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                     </div>
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Confirm Password</label>
                        <input type="password" className="w-full p-3 border border-black/10 bg-cream/20 text-sm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                     </div>
                     
                     {credMessage && <p className={`text-xs text-center ${credMessage.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{credMessage}</p>}
                     
                     <button type="submit" className="w-full bg-obsidian text-white py-3 font-cinzel text-xs uppercase tracking-widest hover:bg-gold transition-colors">Update Credentials</button>
                  </form>
               </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
