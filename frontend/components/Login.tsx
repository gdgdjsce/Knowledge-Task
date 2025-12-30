
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<User>({
    fullName: '',
    role: 'Student',
    age: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.age) {
      onLogin(formData);
    }
  };

  const roles = [
    'Student',
    'Working Professional',
    'Teacher',
    'Working House Wife'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel rainbow-border-hover rounded-3xl md:rounded-[3rem] p-6 md:p-10 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-8 md:mb-10">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-xl md:text-2xl mx-auto mb-4 md:mb-6 shadow-xl shadow-indigo-500/40 italic">
            N
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Nova Portal</h1>
          <p className="text-slate-500 text-[10px] md:text-sm font-bold mt-2 tracking-wide uppercase">Identity Verification Required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <input
              required
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl glass-input font-bold placeholder-slate-700 text-sm md:text-base"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Vocation</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl glass-input font-bold appearance-none cursor-pointer text-sm md:text-base"
              >
                {roles.map(r => <option key={r} value={r} className="bg-slate-900">{r}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chronological Age</label>
              <input
                required
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl glass-input font-bold text-sm md:text-base"
                placeholder="Years"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 md:py-5 bg-indigo-500 text-white font-black rounded-xl md:rounded-2xl hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-500/40 uppercase tracking-[0.2em] text-[10px] md:text-xs mt-4 active:scale-95"
          >
            Initialize Protocol
          </button>
        </form>
      </div>
    </div>
  );
};
