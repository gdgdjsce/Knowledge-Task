
import React, { useState } from 'react';
import { Icons } from '../constants';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'issues';
  onTabChange: (tab: 'dashboard' | 'issues') => void;
  user: User | null;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleTabClick = (tab: 'dashboard' | 'issues') => {
    onTabChange(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen text-slate-100 p-2 md:p-4">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Side Bar */}
      <aside 
        id="side-bar" 
        className={`w-64 glass-panel rainbow-border-hover rounded-3xl flex flex-col fixed h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)] z-50 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-[110%] lg:translate-x-0'
        }`}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 italic">
                N
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase italic">Nova</span>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => handleTabClick('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <Icons.Layout />
              Dashboard
            </button>
            <button
              onClick={() => handleTabClick('issues')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'issues' 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
              All Issues
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 md:p-8 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
<div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border border-white/20 bg-slate-800 flex items-center justify-center text-white font-black">
  {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'G'}
</div>

              <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 border-2 md:border-4 border-[#020617] rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.fullName || 'Guest User'}</p>
              <p className="text-[9px] text-slate-500 font-black truncate uppercase tracking-tighter">{user?.role || 'Restricted Access'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 lg:ml-72 flex flex-col w-full min-w-0">
        {/* Nav Bar */}
        <header id="nav-bar" className="glass-panel rainbow-border-hover mb-4 md:mb-8 px-4 md:px-8 py-3 md:py-4 rounded-3xl flex items-center justify-between z-30 sticky top-2 md:top-4">
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 bg-indigo-500/10 rounded-lg text-indigo-400"
            >
              {/* Fix: Changed duplicate x1 attributes to x2 for line elements */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <div className="hidden sm:flex p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
               {activeTab === 'dashboard' ? <Icons.Layout /> : <Icons.Filter />}
            </div>
            <h2 className="text-lg md:text-xl font-black text-white capitalize italic tracking-wide truncate">{activeTab}</h2>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden xs:flex flex-col items-end">
               <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Protocol Sync</span>
               <span className="text-emerald-400 text-[10px] font-black">STABLE</span>
            </div>
            <button className="p-2 md:p-2.5 rounded-xl glass-panel hover:bg-white/10 text-slate-400 hover:text-white transition-all">
              {/* Fix: Removed non-standard md:width and md:height attributes that caused JSX parsing errors */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
          </div>
        </header>

        <main className="flex-1 pb-12 w-full px-1 md:px-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
