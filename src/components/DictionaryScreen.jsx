// src/components/DictionaryScreen.jsx
import React, { useState } from 'react';
import { ChevronRight, Star, Tag, BookOpen, Layers } from 'lucide-react';
import { VERB_DATA } from '../data/verbs.js'; // 修正: 顯式引用 .js
import { MODES } from '../constants/modes.jsx'; // 修正: 顯式引用 .jsx

// 輔助組件 (內部使用)
function FormRow({ label, data }) {
  return (
    <div className="text-sm bg-slate-900 rounded-lg p-3 border border-slate-800">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-slate-500 w-24 text-xs font-bold uppercase shrink-0">{label}</span>
        <span className="text-indigo-400 font-extrabold text-lg">{data.word}</span>
      </div>
      <div className="pl-24 text-slate-400 text-sm italic border-l border-slate-700/50">
        "{data.sentence}"
        <p className='text-xs text-slate-600 mt-1'>({data.trans})</p>
      </div>
    </div>
  );
}

export default function DictionaryScreen({ onBack, favorites, toggleFavorite }) {
  const [filter, setFilter] = useState('');
  const [showForms, setShowForms] = useState({});

  const filteredData = VERB_DATA.filter(v => 
    v.kanji.includes(filter) || v.meaning.includes(filter) || v.hiragana.includes(filter) || (favorites[v.id] && filter.toLowerCase() === '收藏')
  );

  const formLabels = {
    dictionary: '原形 (辭典)',
    masu: 'ます形 (禮貌)',
    te: 'て形 (連接)',
    nai: 'ない形 (否定)',
    ta: 'た形 (過去)',
    potential: '可能形 (Potential)'
  };

  const toggleForms = (id) => {
    setShowForms(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950">
      <div className="p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
           <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
             <ChevronRight className="rotate-180" size={24}/>
           </button>
           <h2 className="text-2xl font-black text-white flex items-center gap-2">
             <BookOpen className='text-indigo-500'/> 動詞辭典
           </h2>
        </div>
        
        {/* 搜尋欄 */}
        <input
          type="text"
          placeholder="搜尋漢字、平假名或中文意思... (輸入'收藏'查看我的最愛)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredData.length === 0 ? (
            <div className="text-center p-10 text-slate-500">
                <p>找不到結果。</p>
            </div>
        ) : (
            filteredData.map((verb) => (
                <div key={verb.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="text-4xl font-extrabold text-indigo-400 mb-1">{verb.kanji} <span className="text-xl text-slate-500">({verb.hiragana})</span></p>
                            <p className="text-lg font-medium text-white flex items-center gap-2">
                                <Tag size={18} className='text-slate-500'/> {verb.meaning}
                            </p>
                        </div>
                        <button 
                            onClick={() => toggleFavorite(verb.id)}
                            className={`p-2 rounded-full transition-colors ${favorites[verb.id] ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-slate-400 hover:text-red-400'}`}
                        >
                            <Star size={24} fill={favorites[verb.id] ? 'currentColor' : 'none'} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4 border-t border-b border-slate-700 py-2">
                        <span className="flex items-center gap-1 font-semibold">
                            <Layers size={14}/> {verb.group}
                        </span>
                        <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-mono text-xs">
                            {verb.level}
                        </span>
                    </div>

                    <button 
                      onClick={() => toggleForms(verb.id)}
                      className="w-full py-2 mb-3 text-sm font-bold rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors flex items-center justify-center gap-2"
                    >
                      {showForms[verb.id] ? '隱藏' : '展開'} 完整變化形
                      <ChevronRight size={16} className={`transition-transform ${showForms[verb.id] ? 'rotate-90' : ''}`}/>
                    </button>

                    {showForms[verb.id] && (
                        <div className="space-y-2 mt-3">
                            {Object.entries(verb.forms).map(([key, data]) => (
                                <FormRow key={key} label={formLabels[key] || key} data={data} />
                            ))}
                        </div>
                    )}
                </div>
            ))
        )}
      </div>
    </div>
  );
}