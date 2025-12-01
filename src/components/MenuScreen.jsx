// src/components/MenuScreen.jsx
import React, { useState } from 'react';
import { Dumbbell, BookOpen, Flame, ChevronRight, Lock, Crown, Filter } from 'lucide-react';
import { MODES } from '../constants/modes.jsx'; 

export default function MenuScreen({ 
  onStart, onDict, streak, userId, 
  isPro, onUpgrade, onWatchAd, selectedLevels, setSelectedLevels 
}) {
  const [showPaywall, setShowPaywall] = useState(false);

  // 定義哪些模式需要付費 (Potential, Volitional, Mix)
  const PRO_MODES = ['potential', 'volitional', 'mix'];
  const ALL_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

  // 處理點擊模式
  const handleModeClick = (mode) => {
    // 如果是 Pro 模式且用戶不是 Pro，則顯示付費牆
    if (PRO_MODES.includes(mode.id) && !isPro) {
      setShowPaywall(true);
    } else {
      onStart(mode);
    }
  };

  // 處理等級篩選切換
  const toggleLevel = (level) => {
    // N5 免費，其他等級如果不是 Pro 則跳出付費牆
    if (level !== 'N5' && !isPro) {
        setShowPaywall(true);
        return;
    }

    if (selectedLevels.includes(level)) {
      // 至少保留一個選項，不能全部取消
      if (selectedLevels.length > 1) {
        setSelectedLevels(prev => prev.filter(l => l !== level));
      }
    } else {
      setSelectedLevels(prev => [...prev, level]);
    }
  };

  return (
    <div className="p-6 flex flex-col h-screen relative">
      {/* Header */}
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
        </div>
      </header>

      {/* 新增：等級篩選器 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-slate-400"/>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                單字程度 (N5免費)
            </p>
        </div>
        <div className="flex gap-2">
            {ALL_LEVELS.map(level => {
                const isActive = selectedLevels.includes(level);
                const isLocked = level !== 'N5' && !isPro;
                return (
                    <button
                        key={level}
                        onClick={() => toggleLevel(level)}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all flex items-center justify-center gap-1
                            ${isActive 
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20' 
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}
                        `}
                    >
                        {level}
                        {isLocked && <Lock size={12} className="text-slate-500" />}
                    </button>
                )
            })}
        </div>
      </div>

      {/* 模式列表 */}
      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar space-y-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">選擇訓練模式</p>
        
        {MODES.map((mode) => {
          const isLocked = PRO_MODES.includes(mode.id) && !isPro;
          return (
            <button
              key={mode.id}
              onClick={() => handleModeClick(mode)}
              className="w-full group relative overflow-hidden rounded-2xl p-1 transition-all hover:scale-[1.02] active:scale-98 text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${mode.color} ${isLocked ? 'opacity-5 grayscale' : 'opacity-20 group-hover:opacity-30'} transition-all`}></div>
              <div className={`relative bg-slate-800/80 backdrop-blur-sm p-5 rounded-xl border ${isLocked ? 'border-slate-800' : 'border-slate-700/50 group-hover:border-slate-500'} transition-colors`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-xl font-bold flex items-center gap-2 ${isLocked ? 'text-slate-500' : 'text-white'}`}>
                    {mode.label}
                    {/* 如果鎖住顯示鎖頭，否則顯示原本 icon */}
                    {isLocked ? <Lock size={20} className="text-slate-600"/> : mode.icon}
                  </h3>
                  {isLocked ? (
                      <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 flex items-center gap-1">
                          PRO <Crown size={12}/>
                      </span>
                  ) : (
                      <ChevronRight className="text-slate-500 group-hover:text-white transition-colors" />
                  )}
                </div>
                <p className="text-sm text-slate-500 font-medium">{mode.desc}</p>
              </div>
            </button>
          );
        })}
        
        {/* Streak 區塊 */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700 text-center">
          <p className="text-slate-400 text-sm mb-1">連續訓練天數 (Streak)</p>
          <div className="text-3xl font-black text-white flex justify-center items-center gap-2">
            <Flame className={`text-orange-500 ${streak > 0 ? 'fill-orange-500' : 'fill-slate-700'}`} /> 
            {streak} {streak > 1 ? 'Days' : 'Day'}
          </div>
          <p className="text-xs text-slate-600 mt-2">UserID: {userId ? userId.slice(0, 8) + '...' : 'Guest'}</p>
        </div>
      </div>

      {/* Paywall Modal (付費牆) */}
      {showPaywall && (
          <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 border-t sm:border border-slate-700 shadow-2xl">
                  <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
                          <Crown size={32} className="text-yellow-500 fill-yellow-500" />
                      </div>
                  </div>
                  <h2 className="text-2xl font-black text-white text-center mb-2">解鎖 PRO 功能</h2>
                  <ul className="text-slate-400 text-sm space-y-2 mb-6 px-4 list-disc pl-8">
                      <li>開放「意向形」與「可能形」特訓</li>
                      <li>解鎖 N4 ~ N1 進階單字庫</li>
                      <li>混合模式高強度特訓</li>
                      <li>支持開發者持續更新</li>
                  </ul>
                  
                  <div className="space-y-3">
                      <button 
                        onClick={() => { onUpgrade(); setShowPaywall(false); }}
                        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-yellow-500/20 active:scale-95 transition-transform"
                      >
                          升級 PRO 版 (USD $4.99)
                      </button>
                      <button 
                        onClick={() => { onWatchAd(); setShowPaywall(false); }}
                        className="w-full py-3 bg-slate-800 border border-slate-700 text-slate-300 font-bold rounded-xl hover:bg-slate-750 active:scale-95 transition-transform"
                      >
                          看廣告試用一次
                      </button>
                      <button 
                        onClick={() => setShowPaywall(false)}
                        className="w-full py-2 text-slate-500 text-sm font-medium hover:text-white"
                      >
                          下次再說
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}