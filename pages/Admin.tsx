
import React, { useState } from 'react';
import { LayoutDashboard, Image as ImageIcon, Video, Folder, Settings, Bell, Search, Filter, Plus } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="pt-24 min-h-screen bg-obsidian flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 border-r border-white/5 flex flex-col pt-10">
        <div className="px-6 mb-12 hidden md:block">
           <h2 className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase">Management</h2>
        </div>
        <nav className="flex-grow space-y-2">
           {[
             { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
             { id: 'photos', icon: <ImageIcon size={20} />, label: 'Photo Library' },
             { id: 'videos', icon: <Video size={20} />, label: 'Video Vault' },
             { id: 'folders', icon: <Folder size={20} />, label: 'Collections' },
             { id: 'settings', icon: <Settings size={20} />, label: 'Site Config' }
           ].map((item) => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`w-full flex items-center gap-4 px-6 py-4 transition-all
                 ${activeTab === item.id ? 'text-gold bg-gold/5 border-r-2 border-gold' : 'text-platinum hover:text-gold hover:bg-white/5'}`}
             >
               {item.icon}
               <span className="hidden md:block text-sm font-light uppercase tracking-widest">{item.label}</span>
             </button>
           ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="font-cinzel text-3xl text-silver uppercase mb-2">Admin Dashboard</h1>
            <p className="text-platinum/50 text-xs tracking-widest font-light">Welcome back, AK Brothers Team.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gold text-obsidian px-6 py-2 text-[10px] tracking-widest uppercase font-cinzel hover:bg-white transition-all flex items-center gap-2">
              <Plus size={14} /> New Story
            </button>
            <div className="w-10 h-10 bg-charcoal flex items-center justify-center text-platinum hover:text-gold cursor-pointer border border-white/5">
               <Bell size={18} />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Stories', value: '124', change: '+5 this month' },
            { label: 'Storage Used', value: '1.2 TB', change: '85% of 2TB' },
            { label: 'Website Visits', value: '42.5k', change: '+12% vs last month' },
            { label: 'Inquiries', value: '89', change: '12 pending' }
          ].map((stat, i) => (
            <div key={i} className="bg-charcoal p-8 border border-white/5 hover:border-gold/30 transition-all group">
              <p className="text-[10px] tracking-widest text-platinum uppercase mb-2">{stat.label}</p>
              <h3 className="text-3xl font-cinzel text-silver mb-2 group-hover:text-gold transition-colors">{stat.value}</h3>
              <p className="text-[10px] text-gold/60 font-light italic">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Activity Table */}
        <div className="bg-charcoal border border-white/5">
           <div className="p-8 border-b border-white/5 flex justify-between items-center">
             <h3 className="font-cinzel text-sm text-silver tracking-widest uppercase">Recent Uploads</h3>
             <div className="flex gap-4">
                <Search size={16} className="text-platinum cursor-pointer" />
                <Filter size={16} className="text-platinum cursor-pointer" />
             </div>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-xs uppercase tracking-widest text-platinum font-light">
               <thead>
                 <tr className="border-b border-white/5">
                   <th className="p-8 text-gold font-normal">Title</th>
                   <th className="p-8 text-gold font-normal">Category</th>
                   <th className="p-8 text-gold font-normal">Date</th>
                   <th className="p-8 text-gold font-normal">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {[
                   { title: 'The Royal Affair', cat: 'Royal Wedding', date: 'Oct 24, 2023', status: 'Published' },
                   { title: 'Sunset Beach Vows', cat: 'Destination', date: 'Oct 22, 2023', status: 'Draft' },
                   { title: 'Winter Charm', cat: 'Traditional', date: 'Oct 15, 2023', status: 'Published' },
                   { title: 'City Lights Pre-Wed', cat: 'Portraits', date: 'Oct 10, 2023', status: 'Processing' },
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer">
                     <td className="p-8 text-silver">{row.title}</td>
                     <td className="p-8">{row.cat}</td>
                     <td className="p-8 opacity-50">{row.date}</td>
                     <td className="p-8">
                        <span className={`px-3 py-1 text-[8px] rounded-full border ${row.status === 'Published' ? 'border-green-500/30 text-green-500' : 'border-gold/30 text-gold'}`}>
                          {row.status}
                        </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           <div className="p-8 text-center">
              <button className="text-[10px] text-platinum hover:text-gold transition-colors underline tracking-widest">View All Content</button>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
