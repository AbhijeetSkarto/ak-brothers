
import React, { useState } from 'react';
import { LayoutDashboard, Image as ImageIcon, Video, Settings, User, Phone, Upload, LogOut, RefreshCw, CheckCircle, Trash2, LayoutTemplate, Square, Columns, Palette, Shield, Save, Plus, AlertTriangle } from 'lucide-react';
import { useContent, VisualEffect } from '../context/ContentContext.tsx';
import { THEME_EFFECTS } from '../constants.tsx';

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

  const handleGridUpload = async (e: React.ChangeEvent<HTMLInputElement>, collection: 'portraits' | 'stories' | 'preWeddings' | 'photobooks' | 'special') => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        updateCollection(collection, [url, ...content[collection]]);
      } catch(e) { console.error(e); }
      setIsUploading(false);
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

  const removeImage = (collection: 'portraits' | 'stories' | 'preWeddings' | 'photobooks' | 'special', index: number) => {
    const newImages = content[collection].filter((_, i) => i !== index);
    updateCollection(collection, newImages);
  };

  const addFilm = () => {
    if (newFilmTitle && newFilmUrl) {
      updateFilms([...content.films, { 
        title: newFilmTitle, 
        url: newFilmUrl, 
        thumbnail: content.stories[0] || 'https://via.placeholder.com/150' 
      }]);
      setNewFilmTitle('');
      setNewFilmUrl('');
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
    <div className="min-h-screen bg-cream pt-24 pb-24">
      
      {/* Save Button */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
        {hasUnsavedChanges ? (
          <button 
            onClick={saveContent}
            className="bg-gold text-obsidian px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-cinzel text-xs uppercase tracking-widest hover:scale-105 transition-transform animate-bounce"
          >
            <Save size={18} /> Save Changes
          </button>
        ) : (
           saveStatus === 'saved' && (
             <div className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
                <CheckCircle size={14} /> <span className="text-[10px] uppercase tracking-widest">All Saved</span>
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
             ].map((item) => (
               <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full text-left px-6 py-4 flex items-center gap-3 text-xs uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-gold text-white shadow-lg' : 'bg-white hover:bg-black/5'}`}>
                 <item.icon size={16} /> {item.label}
               </button>
             ))}
          </nav>

          {/* Editors */}
          <div className="lg:col-span-3 bg-white border border-black/5 p-10 min-h-[600px] shadow-sm relative">
            
            {activeTab === 'theme' && (
              <div className="space-y-16">
                 <div>
                    <h3 className="font-cinzel text-xl text-obsidian border-b border-black/5 pb-4 mb-8">Layout Templates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <button 
                        onClick={() => updateHomeLayout('classic')}
                        className={`border p-6 text-left transition-all ${content.homeLayout === 'classic' ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-black/10 hover:border-gold/50'}`}
                      >
                        <LayoutTemplate size={32} className="mb-4 text-obsidian" />
                        <h4 className="font-cinzel text-lg uppercase mb-2">Classic</h4>
                        <p className="text-xs text-charcoal/60">Full screen background image with centered typography overlay.</p>
                      </button>

                      <button 
                        onClick={() => updateHomeLayout('framed')}
                        className={`border p-6 text-left transition-all ${content.homeLayout === 'framed' ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-black/10 hover:border-gold/50'}`}
                      >
                        <Square size={32} className="mb-4 text-obsidian" />
                        <h4 className="font-cinzel text-lg uppercase mb-2">Framed</h4>
                        <p className="text-xs text-charcoal/60">Inset background with a gallery frame border. Text overlaps the image.</p>
                      </button>

                      <button 
                        onClick={() => updateHomeLayout('editorial')}
                        className={`border p-6 text-left transition-all ${content.homeLayout === 'editorial' ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-black/10 hover:border-gold/50'}`}
                      >
                        <Columns size={32} className="mb-4 text-obsidian" />
                        <h4 className="font-cinzel text-lg uppercase mb-2">Editorial</h4>
                        <p className="text-xs text-charcoal/60">Split screen layout. Typography on the left, full-height image on the right.</p>
                      </button>
                    </div>
                 </div>

                 <div>
                    <h3 className="font-cinzel text-xl text-obsidian border-b border-black/5 pb-4 mb-8">Visual Effects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(Object.keys(THEME_EFFECTS) as VisualEffect[]).map((effect) => (
                        <button key={effect} onClick={() => updateGlobalEffect(effect)} className={`relative group border p-4 text-left transition-all ${content.globalEffect === effect ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-black/10 hover:border-gold/50'}`}>
                            <div className={`aspect-video w-full mb-4 bg-gray-200 overflow-hidden`}>
                              <img src={content.heroImage} alt="Preview" className={`w-full h-full object-cover ${THEME_EFFECTS[effect]}`} />
                            </div>
                            <h4 className="font-cinzel text-sm uppercase text-obsidian">{effect}</h4>
                        </button>
                      ))}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-10">
                 <h3 className="font-cinzel text-xl text-obsidian border-b border-black/5 pb-4">Home Page / Hero</h3>
                 <div className="grid md:grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <label className="text-xs uppercase tracking-widest text-charcoal/60 block">Background</label>
                      <div className="relative aspect-video bg-black/5 overflow-hidden border border-black/10 group">
                        <img src={content.heroImage} className="w-full h-full object-cover" alt="Hero" />
                        <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                          <Upload size={24} className="mb-2"/> <span className="text-[10px]">Change</span>
                          <input type="file" className="hidden" accept="image/*" onChange={handleHeroUpload} />
                        </label>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <input value={content.heroTitle} onChange={(e) => updateHero({ heroTitle: e.target.value })} className="w-full border-b p-2 font-cinzel text-xl" placeholder="Title" />
                      <input value={content.heroSubtitle} onChange={(e) => updateHero({ heroSubtitle: e.target.value })} className="w-full border-b p-2 font-cinzel text-lg text-gold" placeholder="Subtitle" />
                   </div>
                 </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-12">
                 <h3 className="font-cinzel text-xl text-obsidian border-b border-black/5 pb-4">Manage Galleries</h3>
                 {[
                   { id: 'stories', label: 'Wedding Stories' },
                   { id: 'portraits', label: 'Portraits' },
                   { id: 'preWeddings', label: 'Pre-Weddings' },
                   { id: 'photobooks', label: 'Photobooks' },
                   { id: 'special', label: 'Special Highlights' }
                 ].map((section) => (
                   <div key={section.id}>
                     <div className="flex justify-between items-center mb-6">
                       <h4 className="text-xs uppercase tracking-widest text-gold">{section.label}</h4>
                       <label className="cursor-pointer bg-obsidian text-white px-4 py-2 text-[10px] uppercase hover:bg-gold flex items-center gap-2">
                          <Upload size={12} /> Add
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleGridUpload(e, section.id as any)} />
                       </label>
                     </div>
                     <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                        {(content as any)[section.id]?.map((img: string, i: number) => (
                          <div key={i} className="relative aspect-[3/4] group bg-gray-100">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                            <button onClick={() => removeImage(section.id as any, i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100"><Trash2 size={10} /></button>
                          </div>
                        ))}
                     </div>
                   </div>
                 ))}
              </div>
            )}

            {activeTab === 'films' && (
              <div className="space-y-10">
                 <h3 className="font-cinzel text-xl text-obsidian border-b border-black/5 pb-4">Cinematography</h3>
                 
                 {/* Add New Film Section */}
                 <div className="flex flex-col md:flex-row gap-4 items-end bg-gray-50 p-6 border border-black/5 mb-8">
                   <div className="flex-grow w-full">
                     <label className="text-[10px] uppercase text-charcoal/60">New Film Title</label>
                     <input value={newFilmTitle} onChange={e => setNewFilmTitle(e.target.value)} className="w-full bg-transparent border-b border-black/10 p-2 text-sm focus:border-gold outline-none" placeholder="e.g. The Royal Wedding" />
                   </div>
                   <div className="flex-grow w-full">
                     <label className="text-[10px] uppercase text-charcoal/60">YouTube / Drive URL</label>
                     <input value={newFilmUrl} onChange={e => setNewFilmUrl(e.target.value)} className="w-full bg-transparent border-b border-black/10 p-2 text-sm focus:border-gold outline-none" placeholder="https://..." />
                   </div>
                   <button onClick={addFilm} className="w-full md:w-auto bg-gold text-white px-6 py-2 text-xs uppercase hover:bg-obsidian transition-colors">Add</button>
                 </div>

                 {/* Edit Existing Films */}
                 <div className="space-y-6">
                   {content.films.map((film, i) => (
                     <div key={i} className="flex flex-col md:flex-row gap-6 p-6 border border-black/5 bg-white shadow-sm hover:shadow-md transition-all">
                        {/* Thumbnail Preview & Upload */}
                       <div className="relative w-full md:w-32 aspect-video bg-gray-200 overflow-hidden shrink-0 group">
                          <img src={film.thumbnail} className="w-full h-full object-cover" alt="Film thumbnail" />
                          <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                            <Upload size={16} className="mb-1"/>
                            <span className="text-[8px] uppercase tracking-widest">Change</span>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFilmThumbnailUpload(e, i)} />
                          </label>
                       </div>
                       
                       {/* Edit Inputs */}
                       <div className="flex-grow space-y-4">
                         <div>
                            <label className="text-[9px] uppercase tracking-widest text-charcoal/40 mb-1 block">Title</label>
                            <input 
                              value={film.title} 
                              onChange={(e) => updateFilmDetails(i, 'title', e.target.value)} 
                              className="w-full font-cinzel text-lg border-b border-transparent hover:border-black/10 focus:border-gold outline-none bg-transparent transition-colors p-1"
                            />
                         </div>
                         <div>
                            <label className="text-[9px] uppercase tracking-widest text-charcoal/40 mb-1 block">Video URL</label>
                            <input 
                              value={film.url} 
                              onChange={(e) => updateFilmDetails(i, 'url', e.target.value)} 
                              className="w-full font-manrope text-xs text-charcoal/70 border-b border-transparent hover:border-black/10 focus:border-gold outline-none bg-transparent transition-colors p-1"
                            />
                         </div>
                       </div>

                       {/* Actions */}
                       <div className="flex items-start">
                         <button onClick={() => removeFilm(i)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all" title="Remove Film">
                           <Trash2 size={18} />
                         </button>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-12">
                 <h3 className="font-cinzel text-xl text-obsidian border-b border-black/5 pb-4">About Section</h3>
                 
                 <div className="grid md:grid-cols-2 gap-12">
                    {/* Text Details */}
                    <div className="space-y-6 md:col-span-1">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-charcoal/60">Title</label>
                        <input value={content.about.title} onChange={(e) => updateAbout({ title: e.target.value })} className="w-full border-b p-2 font-cinzel text-xl" />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-charcoal/60">Subtitle</label>
                        <input value={content.about.subtitle} onChange={(e) => updateAbout({ subtitle: e.target.value })} className="w-full border-b p-2 font-cinzel text-sm text-gold" />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-charcoal/60">Description</label>
                        <textarea value={content.about.description} onChange={(e) => updateAbout({ description: e.target.value })} rows={10} className="w-full border p-2 text-sm leading-relaxed" />
                      </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="space-y-4 md:col-span-1">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs uppercase tracking-widest text-charcoal/60">Photos</label>
                        <label className="cursor-pointer bg-obsidian text-white px-3 py-1 text-[9px] uppercase hover:bg-gold flex items-center gap-2">
                          <Plus size={10} /> Add
                          <input type="file" className="hidden" accept="image/*" onChange={handleAboutImageUpload} />
                        </label>
                      </div>
                      <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
                        {(content.about.images || []).map((img, i) => (
                           <div key={i} className="relative aspect-[3/4] group bg-gray-100">
                             <img src={img} className="w-full h-full object-cover" alt="" />
                             <button onClick={() => removeAboutImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100"><Trash2 size={10} /></button>
                           </div>
                        ))}
                      </div>
                    </div>
                 </div>

                 {/* Videos Section */}
                 <div className="border-t border-black/5 pt-10">
                    <h4 className="font-cinzel text-lg text-obsidian mb-6">About Page Videos</h4>
                    
                    <div className="flex gap-4 items-end bg-gray-50 p-6 border border-black/5 mb-6">
                       <div className="flex-grow">
                         <label className="text-[10px] uppercase text-charcoal/60">Video URL (YouTube / Drive)</label>
                         <input value={newAboutVideo} onChange={e => setNewAboutVideo(e.target.value)} className="w-full bg-transparent border-b border-black/10 p-2 text-sm focus:border-gold outline-none" />
                       </div>
                       <button onClick={addAboutVideo} className="bg-gold text-white px-6 py-2 text-xs uppercase hover:bg-obsidian transition-colors">Add</button>
                    </div>

                    <div className="space-y-4">
                      {(content.about.videos || []).map((vid, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-black/5 bg-white">
                          <div className="flex items-center gap-4 overflow-hidden">
                             <Video size={20} className="text-gold shrink-0" />
                             <span className="text-xs truncate max-w-md">{vid}</span>
                          </div>
                          <button onClick={() => removeAboutVideo(i)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                      ))}
                      {(!content.about.videos || content.about.videos.length === 0) && (
                        <p className="text-xs text-charcoal/40 italic text-center py-4">No videos added yet.</p>
                      )}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-10">
                 <h3 className="font-cinzel text-xl text-obsidian border-b border-black/5 pb-4">Contact Info</h3>
                 <div className="grid md:grid-cols-2 gap-8">
                   <div>
                      <label className="text-xs uppercase tracking-widest text-charcoal/60">Phone</label>
                      <input value={content.contact.phone} onChange={(e) => updateContact({ phone: e.target.value })} className="w-full border-b p-2" />
                   </div>
                   <div>
                      <label className="text-xs uppercase tracking-widest text-charcoal/60">Email</label>
                      <input value={content.contact.email} onChange={(e) => updateContact({ email: e.target.value })} className="w-full border-b p-2" />
                   </div>
                   <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-charcoal/60">Address</label>
                      <input value={content.contact.address} onChange={(e) => updateContact({ address: e.target.value })} className="w-full border-b p-2" />
                   </div>
                   <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-charcoal/60">Instagram URL</label>
                      <input value={content.contact.instagram} onChange={(e) => updateContact({ instagram: e.target.value })} className="w-full border-b p-2" />
                   </div>
                 </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-10">
                 <h3 className="font-cinzel text-xl text-obsidian border-b border-black/5 pb-4">Admin Security</h3>
                 <div className="max-w-md space-y-6">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-charcoal/60 block mb-2">New Username</label>
                      <input 
                        type="text" 
                        value={newUsername} 
                        onChange={(e) => setNewUsername(e.target.value)} 
                        className="w-full border border-black/10 p-3 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-charcoal/60 block mb-2">New Password</label>
                      <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        className="w-full border border-black/10 p-3 text-sm focus:border-gold outline-none"
                        placeholder="Min 4 characters"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-charcoal/60 block mb-2">Confirm Password</label>
                      <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="w-full border border-black/10 p-3 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    
                    {credMessage && (
                      <div className={`text-xs p-3 ${credMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {credMessage}
                      </div>
                    )}

                    <button 
                      onClick={handleChangeCredentials} 
                      className="bg-obsidian text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-gold transition-colors flex items-center gap-2"
                    >
                      <Save size={14} /> Update Credentials
                    </button>
                 </div>
              </div>
            )}

            {isUploading && (
               <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                 <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                 <span className="font-cinzel text-xs tracking-widest">Processing...</span>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
