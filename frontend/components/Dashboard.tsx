
import React, { useMemo } from 'react';
import { Issue, IssueStatus, IssuePriority } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  issues: Issue[];
}

export const Dashboard: React.FC<DashboardProps> = ({ issues }) => {
  const stats = useMemo(() => {
    const total = issues.length;
    const open = issues.filter(i => i.status === IssueStatus.OPEN).length;
    const closed = issues.filter(i => i.status === IssueStatus.CLOSED).length;
    const high = issues.filter(i => i.priority === IssuePriority.HIGH).length;
    return { total, pending: total - closed, high, closed };
  }, [issues]);

  const statusData = useMemo(() => [
    { name: 'Open', value: issues.filter(i => i.status === IssueStatus.OPEN).length, color: '#3b82f6' },
    { name: 'Progress', value: issues.filter(i => i.status === IssueStatus.IN_PROGRESS).length, color: '#6366f1' },
    { name: 'Closed', value: issues.filter(i => i.status === IssueStatus.CLOSED).length, color: '#475569' },
  ], [issues]);

  const priorityData = useMemo(() => [
    { name: 'Low', value: issues.filter(i => i.priority === IssuePriority.LOW).length, color: '#10b981' },
    { name: 'Mid', value: issues.filter(i => i.priority === IssuePriority.MEDIUM).length, color: '#f59e0b' },
    { name: 'High', value: issues.filter(i => i.priority === IssuePriority.HIGH).length, color: '#f43f5e' },
  ], [issues]);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500 px-1 md:px-0">
      <header className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight italic uppercase">Command Overview</h1>
        <p className="text-slate-500 mt-1 font-bold text-sm tracking-wide">Global operational metrics for Nova fleet.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Registry', value: stats.total, color: 'text-white' },
          { label: 'Operational Pending', value: stats.pending, color: 'text-indigo-400' },
          { label: 'High Priority', value: stats.high, color: 'text-rose-400' },
          { label: 'Sync Complete', value: stats.closed, color: 'text-emerald-400' },
        ].map((item, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl md:rounded-[2rem] border border-white/5 shadow-2xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{item.label}</p>
            <p className={`text-3xl md:text-4xl font-black mt-2 md:mt-3 ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 pb-12">
        <div className="glass-panel p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-2xl min-h-[400px] md:h-[450px]">
          <h3 className="text-base md:text-lg font-black text-white mb-6 md:mb-8 uppercase tracking-widest italic">Process Distribution</h3>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 800}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 800}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{backgroundColor: '#020617', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 800}}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-2xl min-h-[400px] md:h-[450px] flex flex-col">
          <h3 className="text-base md:text-lg font-black text-white mb-6 md:mb-8 uppercase tracking-widest italic">Priority Mapping</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  md:innerRadius={80}
                  outerRadius={90}
                  md:outerRadius={110}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.7} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{backgroundColor: '#020617', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 800}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
            {priorityData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
