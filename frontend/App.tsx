
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { IssueCard } from './components/IssueCard';
import { IssueForm } from './components/IssueForm';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { issueService } from './services/issueService';
import { Issue, AppState, IssueStatus, IssuePriority, IssueFilters, User } from './types';
import { Icons } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [state, setState] = useState<AppState>({
    issues: [],
    loading: true,
    error: null,
    filters: {
      search: '',
    },
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'issues'>('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | undefined>();
  const [formLoading, setFormLoading] = useState(false);

  const fetchIssues = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const issues = await issueService.getIssues(state.filters);
      setState(prev => ({ ...prev, issues, loading: false }));
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message, loading: false }));
    }
  }, [state.filters]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchIssues();
    }
  }, [state.filters, fetchIssues, isAuthenticated]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoggingIn(true);
    // Simulate high-tech loading sequence
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsAuthenticated(true);
    }, 2500);
  };

  const handleCreate = async (data: any) => {
    setFormLoading(true);
    try {
      await issueService.createIssue(data);
      setShowForm(false);
      await fetchIssues();
    } catch (err: any) {
      alert(`Deployment failed: ${err.message}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingIssue) return;
    setFormLoading(true);
    try {
      await issueService.updateIssue(editingIssue.id, data);
      setEditingIssue(undefined);
      await fetchIssues();
    } catch (err: any) {
      alert(`Sync failed: ${err.message}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('CRITICAL ACTION: Purge this record permanently?')) {
      setState(prev => ({ ...prev, loading: true }));
      try {
        await issueService.deleteIssue(id);
        setState(prev => ({
          ...prev,
          issues: prev.issues.filter(issue => issue.id !== id),
          loading: false
        }));
        await fetchIssues();
      } catch (err: any) {
        alert(`Purge failed: ${err.message}`);
        setState(prev => ({ ...prev, loading: false }));
      }
    }
  };

  const handleFilterChange = (key: keyof IssueFilters, value: any) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, [key]: value || undefined }
    }));
  };

  if (!isAuthenticated && !isLoggingIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (isLoggingIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="glass-panel p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-center shadow-2xl w-full max-w-sm border-white/5 relative overflow-hidden">
          {/* High Tech Spinner/Animation */}
          <div className="w-16 h-16 md:w-24 md:h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-8 relative">
            <div className="absolute inset-1.5 md:inset-2 border-4 border-emerald-500/20 border-b-emerald-500 rounded-full animate-[spin_1s_linear_infinite_reverse]"></div>
          </div>
          
          <h2 className="text-lg md:text-xl font-black text-white italic tracking-[0.2em] uppercase mb-4 animate-pulse">Initializing System</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">Decrypting Identity: {user?.fullName}</p>
          
          {/* Progress Bar */}
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 animate-[loading-bar_2s_ease-in-out_infinite]"></div>
          </div>
          
          <style>{`
            @keyframes loading-bar {
              0% { width: 0%; transform: translateX(-100%); }
              50% { width: 70%; transform: translateX(50%); }
              100% { width: 100%; transform: translateX(200%); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const renderIssuesList = () => {
    return (
      <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500 px-1 md:px-0">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-indigo-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Operational Manifest</span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mt-1 italic uppercase">Issue Registry</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-3 px-6 md:px-10 py-3 md:py-4 bg-indigo-500 text-white font-black rounded-2xl md:rounded-3xl hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-500/30 active:scale-95 uppercase text-[10px] md:text-xs tracking-widest"
          >
            <Icons.Plus />
            New Entry
          </button>
        </header>

        {/* Filters Bar */}
        <div className="glass-panel p-4 md:p-6 rounded-2xl md:rounded-[2rem] flex flex-col sm:flex-row gap-4 md:gap-6 shadow-2xl">
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Query Registry..."
              value={state.filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 text-sm font-bold text-white placeholder-slate-700 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 sm:flex gap-3 md:gap-4">
            <select
              value={state.filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] md:text-[10px] font-black text-slate-400 outline-none focus:ring-4 focus:ring-indigo-500/10 uppercase tracking-widest appearance-none cursor-pointer hover:bg-white/10"
            >
              <option value="" className="bg-slate-900">Status</option>
              {Object.values(IssueStatus).map(s => (
                <option key={s} value={s} className="bg-slate-900">{s.toUpperCase()}</option>
              ))}
            </select>

            <select
              value={state.filters.priority || ''}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="px-3 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] md:text-[10px] font-black text-slate-400 outline-none focus:ring-4 focus:ring-indigo-500/10 uppercase tracking-widest appearance-none cursor-pointer hover:bg-white/10"
            >
              <option value="" className="bg-slate-900">Priority</option>
              {Object.values(IssuePriority).map(p => (
                <option key={p} value={p} className="bg-slate-900">{p.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 opacity-30">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-60 md:h-72 glass-panel rounded-2xl md:rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : state.error ? (
          <div className="glass-panel border-rose-500/30 p-8 md:p-16 rounded-2xl md:rounded-[3rem] text-center shadow-2xl">
            <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mb-6 md:mb-8">
              <Icons.Alert />
            </div>
            <h3 className="text-xl md:text-3xl font-black text-white uppercase italic">Sync Fault</h3>
            <p className="text-slate-500 mt-2 mb-8 md:mb-10 font-bold text-sm">{state.error}</p>
            <button 
              onClick={fetchIssues}
              className="w-full sm:w-auto px-10 py-4 bg-rose-500 text-white rounded-2xl hover:bg-rose-600 font-black transition-all uppercase text-xs tracking-widest"
            >
              Force Reconnect
            </button>
          </div>
        ) : state.issues.length === 0 ? (
          <div className="glass-panel p-12 md:p-32 rounded-2xl md:rounded-[3rem] text-center shadow-2xl border-white/5">
            <div className="mx-auto w-16 h-16 md:w-24 md:h-24 bg-white/5 text-slate-700 rounded-full flex items-center justify-center mb-6 md:mb-10">
              <Icons.Filter />
            </div>
            <h3 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tighter">No Matches</h3>
            <p className="text-slate-500 mt-4 max-w-sm mx-auto font-bold text-sm">
              Operational parameters yielded zero results from the current data slice.
            </p>
            <button 
              onClick={() => setState(prev => ({ ...prev, filters: { search: '' } }))}
              className="mt-10 text-indigo-400 font-black hover:text-indigo-300 transition-colors uppercase tracking-[0.2em] text-[10px]"
            >
              Reset Protocol
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 pb-24">
            {state.issues.map(issue => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                onEdit={setEditingIssue}
                onDelete={(id) => handleDelete(id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} user={user}>
      {activeTab === 'dashboard' ? (
        <Dashboard issues={state.issues} />
      ) : (
        renderIssuesList()
      )}

      {(showForm || editingIssue) && (
        <IssueForm 
          initialData={editingIssue}
          onSubmit={editingIssue ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingIssue(undefined);
          }}
          isLoading={formLoading}
        />
      )}
    </Layout>
  );
};

export default App;
