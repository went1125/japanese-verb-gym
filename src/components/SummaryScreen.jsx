// src/components/SummaryScreen.jsx
import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

export default function SummaryScreen({ score, mode, onHome, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center animate-in slide-in-from-bottom duration-500">
      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-500/40">
        <Trophy size={48} className="text-white" />
      </div>
      
      <h2 className="text-4xl font-black text-white mb-2">訓練完成！</h2>
      <p className="text-slate-400 mb-8">模式：{mode.label}</p>

      <div className="bg-slate-800 w-full rounded-2xl p-8 mb-8 border border-slate-700">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">總得分</p>
        <p className="text-7xl font-black text-white">{score}</p>
      </div>
      
      <div className="flex gap-4 w-full">
        <button onClick={onHome} className="flex-1 py-4 rounded-xl font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 transition-colors">
          回主選單
        </button>
        <button onClick={onRetry} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95 flex items-center justify-center gap-2">
          <RotateCcw size={18} />
          再訓練一次
        </button>
      </div>
    </div>
  );
}