
import React, { useState } from 'react';
import { Issue, IssuePriority, IssueStatus } from '../types';

interface IssueFormProps {
  initialData?: Issue;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const IssueForm: React.FC<IssueFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || IssuePriority.MEDIUM,
    status: initialData?.status || IssueStatus.OPEN,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title Required';
    if (!formData.description.trim()) newErrors.description = 'Description Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="glass-panel rainbow-border-hover rounded-3xl md:rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[95vh] animate-in zoom-in-95 slide-in-from-bottom-12 duration-500">
        <div className="px-6 md:px-10 py-6 md:py-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01] sticky top-0 z-10 backdrop-blur-xl">
          <div>
            <span className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.25em]">Registry Node</span>
            <h2 className="text-xl md:text-2xl font-black text-white italic tracking-wide">
              {initialData ? 'Update Record' : 'Deploy Entry'}
            </h2>
          </div>
          <button 
            onClick={onCancel}
            className="p-2 md:p-3 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl md:rounded-2xl transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6 md:space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Headline</label>
              {errors.title && <span className="text-[10px] text-rose-500 font-black uppercase">{errors.title}</span>}
            </div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl glass-input font-bold text-sm md:text-base ${errors.title ? 'border-rose-500/50' : ''}`}
              placeholder="Summary of the initiative..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Technical Description</label>
              {errors.description && <span className="text-[10px] text-rose-500 font-black uppercase">{errors.description}</span>}
            </div>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl glass-input resize-none font-medium text-sm md:text-base ${errors.description ? 'border-rose-500/50' : ''}`}
              placeholder="Provide specific technical details..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as IssuePriority })}
                className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl glass-input text-xs font-black appearance-none cursor-pointer"
              >
                {Object.values(IssuePriority).map(p => (
                  <option key={p} value={p} className="bg-slate-900">{p.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Process State</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as IssueStatus })}
                className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl glass-input text-xs font-black appearance-none cursor-pointer"
              >
                {Object.values(IssueStatus).map(s => (
                  <option key={s} value={s} className="bg-slate-900">{s.replace('-', ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-8 py-3 md:py-4 rounded-xl md:rounded-2xl glass-panel text-slate-500 font-black hover:text-white transition-all uppercase tracking-widest text-[10px]"
            >
              Abort
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-indigo-500 text-white font-black hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-500/40 disabled:opacity-50 uppercase tracking-widest text-[10px] flex items-center justify-center gap-3"
            >
              {isLoading ? 'Syncing...' : (initialData ? 'Update Record' : 'Deploy Issue')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
