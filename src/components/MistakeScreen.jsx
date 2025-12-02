// src/components/MistakeScreen.jsx
import React from 'react';
import { ChevronRight, Trash2, Dumbbell, AlertCircle } from 'lucide-react';
import { VERB_DATA } from '../data/verbs.js';

export default function MistakeScreen({ onBack, mistakes, toggleMistake, onStartTraining }) {
  // 過濾出錯題列表中的動詞
  const mistakeVerbs = VERB_DATA.filter(v => mistakes[v.id]);

  return (
    <div className="flex flex-col h-screen bg-slate-950">
      <div className="p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
           <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
             <ChevronRight className="rotate-180" size={24}/>
           </button>
           <h2 className="text-2xl font-black text-white flex items-center gap-2">
             <AlertCircle className='text-red-500'/> 錯題本
           </h2>
        </div>
        
        {mistakeVerbs.length > 0 ? (
            <button 
                onClick={onStartTraining}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                <Dumbbell size={20}/> 針對錯題特訓 (消耗 1 體力)
            </button>
        ) : (
            <div className="w-full py-3 bg-slate-800 text-slate-500 font-bold rounded-xl text-center border border-slate-700">
                目前沒有錯題
            </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mistakeVerbs.length === 0 ? (
            <div className="text-center p-10 text-slate-500">
                <p>太棒了！目前沒有需要複習的單字。</p>
                <p className="text-xs mt-2">在測驗中答錯時可加入此列表。</p>
            </div>
        ) : (
            mistakeVerbs.map((verb) => (
                <div key={verb.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-white">{verb.kanji}</span>
                            <span className="text-sm text-slate-400">({verb.hiragana})</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{verb.meaning}</p>
                    </div>
                    <button 
                        onClick={() => toggleMistake(verb.id)}
                        className="p-3 bg-slate-700/50 text-slate-400 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
                        title="移出錯題本"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ))
        )}
      </div>
    </div>
  );
}