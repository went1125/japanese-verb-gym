// src/components/MenuScreen.jsx
import React from 'react';
import { Dumbbell, BookOpen, ChevronRight, Crown, Filter, Plus, AlertCircle, Zap } from 'lucide-react';
import { MODES } from '../constants/modes.jsx'; 

export default function MenuScreen({ 
  onStart, onDict, onMistakes, // 新增 onMistakes
  isPro, credits, onAddCredit, trainCount,
  selectedLevels, setSelectedLevels 
}) {
  const ALL_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

  const toggleLevel = (level) => {
    if (selectedLevels.includes(level)) {
      if (selectedLevels.length > 1) { setSelectedLevels(prev => prev.filter(l => l !== level)); }
    } else { setSelectedLevels(prev => [...prev, level]); }
  };

  // 計算集點進度 (0~4)
  const progress = trainCount % 5;

  return (
    <div className="p-6 flex flex-col h-screen relative">
      <header className="mb-6 mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter italic flex items-center gap-2">
            <Dumbbell className="text-indigo-500 fill-indigo-500" />
            VERB GYM
          </h1>
          <div className="flex items-center gap-2">
             <p className="text-slate-500 text-sm font-medium pl-1">Daily Workout</p>
             {isPro && <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-0.5 rounded font-bold border border-yellow-500/50">PRO</span>}
          </div>
        </div>
        <div className='flex items-center gap-2'>
            <button onClick={onDict} className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
              <BookOpen size={20} />
            </button>
            {/* 錯題本入口 */}
            <button onClick={onMistakes} className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-red-400">
              <AlertCircle size={20} />
            </button>
        </div>
      </header>

      {/* 體力與集點區塊 */}
      <div className="mb-6 bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <div className="flex items-center justify-between mb-3">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                      訓練體力
                  </p>
                  <div className="flex items-baseline gap-1">
                      {isPro ? (
                          <span className="text-2xl font-black text-yellow-500 flex items-center gap-2"><Crown size={24} className="fill-yellow-500"/> 無限</span>
                      ) : (
                          <span className={`text-3xl font-black ${credits > 0 ? 'text-white' : 'text-red-500'}`}>{credits}</span>
                      )}
                      {!isPro && <span className="text-slate-500 text-sm">/ 次</span>}
                  </div>
              </div>
              {!isPro && (
                  <button onClick={onAddCredit} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 flex items-center gap-1 active:scale-95 transition-transform">
                      <Plus size={16} /> 補充
                  </button>
              )}
          </div>
          
          {/* 集點進度條 (買5送1) */}
          {!isPro && (
              <div className="bg-slate-900/50 rounded-lg p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                      <Zap size={14} className="text-yellow-500 fill-yellow-500"/>
                      集滿 5 次送 1 次
                  </div>
                  <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-6 h-2 rounded-full transition-all ${i < progress ? 'bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]' : 'bg-slate-700'}`}></div>
                      ))}
                  </div>
              </div>
          )}
      </div>

      {/* 等級篩選器 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-slate-400"/>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">單字程度 (複選)</p>
        </div>
        <div className="flex gap-2">
            {ALL_LEVELS.map(level => {
                const isActive = selectedLevels.includes(level);
                return (
                    <button key={level} onClick={() => toggleLevel(level)} className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all flex items-center justify-center gap-1 ${isActive ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                        {level}
                    </button>
                )
            })}
        </div>
      </div>

      {/* 模式列表 */}
      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar space-y-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">開始特訓 (消耗 1 體力)</p>
        {MODES.map((mode) => (
            <button key={mode.id} onClick={() => onStart(mode)} className="w-full group relative overflow-hidden rounded-2xl p-1 transition-all hover:scale-[1.02] active:scale-98 text-left">
              <div className={`absolute inset-0 bg-gradient-to-r ${mode.color} opacity-20 group-hover:opacity-30 transition-all`}></div>
              <div className="relative bg-slate-800/80 backdrop-blur-sm p-5 rounded-xl border border-slate-700/50 group-hover:border-slate-500 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">{mode.label}{mode.icon}</h3>
                  <ChevronRight className="text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <p className="text-sm text-slate-400 font-medium">{mode.desc}</p>
              </div>
            </button>
        ))}
      </div>
    </div>
  );
}