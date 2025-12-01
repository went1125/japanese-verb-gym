// src/components/MenuScreen.jsx
import React from 'react';
import { Dumbbell, BookOpen, Flame, ChevronRight } from 'lucide-react';
// 修正：顯式引用 .jsx 擴展名，確保本地 bundler 準確解析
import { MODES } from '../constants/modes.jsx'; 

export default function MenuScreen({ onStart, onDict, streak, userId }) {
  return (
    <div className="p-6 flex flex-col h-screen">
      <header className="mb-8 mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter italic flex items-center gap-2">
            <Dumbbell className="text-indigo-500 fill-indigo-500" />
            VERB GYM
          </h1>
          <p className="text-slate-500 text-sm font-medium pl-1">Daily Conjugation Workout</p>
        </div>
        <div className='flex items-center gap-2'>
            <button onClick={onDict} className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
              <BookOpen size={20} />
            </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar space-y-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">選擇訓練模式</p>
        
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onStart(mode)}
            className="w-full group relative overflow-hidden rounded-2xl p-1 transition-all hover:scale-[1.02] active:scale-98 text-left"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${mode.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            <div className="relative bg-slate-800/80 backdrop-blur-sm p-5 rounded-xl border border-slate-700/50 group-hover:border-slate-500 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {mode.label}
                  {mode.icon}
                </h3>
                <ChevronRight className="text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-sm text-slate-400 font-medium">{mode.desc}</p>
            </div>
          </button>
        ))}
        
        <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700 text-center">
          <p className="text-slate-400 text-sm mb-1">連續訓練天數 (Streak)</p>
          <div className="text-3xl font-black text-white flex justify-center items-center gap-2">
            <Flame className={`text-orange-500 ${streak > 0 ? 'fill-orange-500' : 'fill-slate-700'}`} /> 
            {streak} {streak > 1 ? 'Days' : 'Day'}
          </div>
          <p className="text-xs text-slate-600 mt-2">UserID: {userId ? userId.slice(0, 8) + '...' : 'Guest'}</p>
        </div>
      </div>
    </div>
  );
}