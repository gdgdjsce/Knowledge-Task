
import React from 'react';
import { Issue, IssuePriority, IssueStatus } from '../types';
import { Icons } from '../constants';

interface IssueCardProps {
  issue: Issue;
  onEdit: (issue: Issue) => void;
  onDelete: (id: string) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onEdit, onDelete }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusStyle = (status: IssueStatus) => {
    switch(status) {
      case IssueStatus.OPEN: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case IssueStatus.IN_PROGRESS: return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case IssueStatus.CLOSED: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getPriorityStyle = (priority: IssuePriority) => {
    switch(priority) {
      case IssuePriority.LOW: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case IssuePriority.MEDIUM: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case IssuePriority.HIGH: return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    }
  };

  return (
    <div className="glass-panel rainbow-border-hover rounded-3xl p-6 transition-all group flex flex-col h-full hover:bg-white/[0.06] relative">
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex gap-2">
          <span className={`px-2.5 py-1 text-[9px] font-black rounded-lg border uppercase tracking-widest ${getStatusStyle(issue.status)}`}>
            {issue.status.replace('-', ' ')}
          </span>
          <span className={`px-2.5 py-1 text-[9px] font-black rounded-lg border uppercase tracking-widest ${getPriorityStyle(issue.priority)}`}>
            {issue.priority}
          </span>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(issue);
            }}
            className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all relative z-20"
            title="Edit"
          >
            <Icons.Edit />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(issue.id);
            }}
            className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all relative z-20"
            title="Delete Issue"
          >
            <Icons.Trash />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-indigo-300 transition-colors uppercase tracking-tight">
          {issue.title}
        </h3>
        <p className="text-slate-400 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow font-medium">
          {issue.description}
        </p>

        <div className="flex items-center justify-between text-[10px] font-black text-slate-500 border-t border-white/5 pt-5 mt-auto">
          <div className="flex items-center gap-2">
            <svg className="opacity-70" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span className="uppercase tracking-widest">{formatDate(issue.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
             <img src={`https://i.pravatar.cc/80?u=${issue.id}`} className="w-8 h-8 rounded-xl border border-white/10 bg-slate-800 shadow-xl" alt="Assigned" />
          </div>
        </div>
      </div>
    </div>
  );
};
