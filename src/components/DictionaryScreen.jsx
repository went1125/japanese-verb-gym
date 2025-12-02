// src/components/DictionaryScreen.jsx
import React, { useState } from 'react';
import { ChevronRight, Star, Tag, BookOpen, Layers, Heart, Plus, Filter, Volume2, Lock } from 'lucide-react';
import { VERB_DATA } from '../data/verbs.js'; 

// ... Helpers (FuriganaText, stripFurigana, speak, FormRow) 保持不變，請複製之前的 ...
// 為了節省篇幅，請確保這裡有上一版的 Helpers 程式碼
const stripFurigana = (text) => text ? text.replace(/\[[^\]]+\]/g, '') : '';
const speak = (text) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const cleanText = stripFurigana(text);
  const utterance = new SpeechSynthesisUtterance(cleanText);
  let voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find(v => v.lang === 'ja-JP') || voices.find(v => v.lang.includes('ja'));
  if (jaVoice) utterance.voice = jaVoice;
  utterance.lang = 'ja-JP'; utterance.rate = 0.9; window.speechSynthesis.speak(utterance);
};
const FuriganaText = ({ text }) => {
  if (!text) return null;
  const regex = /([\u4e00-\u9faf\u3005]+)\[([^\]]+)\]/g;
  let match; let lastIndex = 0; let result = [];
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) result.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>);
    result.push(<ruby key={`ruby-${match.index}`} className="mx-0.5 font-medium group">{match[1]}<rt className="text-[0.6em] text-indigo-300 font-normal select-none opacity-80">{match[2]}</rt></ruby>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) result.push(<span key={`end-${lastIndex}`}>{text.substring(lastIndex)}</span>);
  return <span>{result}</span>;
};
function FormRow({ label, data }) {
  return (
    <div className="text-sm bg-slate-900 rounded-lg p-3 border border-slate-800">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-slate-500 w-24 text-xs font-bold uppercase shrink-0">{label}</span>
        <span className="text-indigo-400 font-extrabold text-lg">{data.word}</span>
        <button onClick={(e) => { e.stopPropagation(); speak(data.word); }} className="p-1.5 text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded-full transition-colors"><Volume2 size={16} /></button>
      </div>
      <div className="pl-24 border-l border-slate-700/50">
        <div className="flex items-start justify-between gap-2">
            <div className="text-slate-300 text-base italic leading-relaxed"><FuriganaText text={data.sentence} /></div>
            <button onClick={(e) => { e.stopPropagation(); speak(data.sentence); }} className="mt-0.5 p-1.5 text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded-full transition-colors shrink-0"><Volume2 size={16} /></button>
        </div>
        <p className='text-xs text-slate-500 mt-1 not-italic'>({data.trans})</p>
      </div>
    </div>
  );
}

export default function DictionaryScreen({ 
  onBack, favorites, toggleFavorite, 
  maxFavorites, onWatchAdForSlots, // 移除 isPro, onUpgrade
  selectedLevels, setSelectedLevels 
}) {
  const [filter, setFilter] = useState('');
  const [showForms, setShowForms] = useState({});
  const [activeTab, setActiveTab] = useState('all'); 

  const ALL_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

  const toggleLevel = (level) => {
    if (selectedLevels.includes(level)) {
      if (selectedLevels.length > 1) { setSelectedLevels(prev => prev.filter(l => l !== level)); }
    } else { setSelectedLevels(prev => [...prev, level]); }
  };

  const filteredData = VERB_DATA.filter(v => {
    if (activeTab === 'favorites' && !favorites[v.id]) return false;
    if (selectedLevels && !selectedLevels.includes(v.level)) return false;
    if (!filter) return true;
    return (v.kanji.includes(filter) || v.meaning.includes(filter) || v.hiragana.includes(filter));
  });

  const formLabels = { dictionary: '原形 (辭典)', masu: 'ます形 (禮貌)', te: 'て形 (連接)', nai: 'ない形 (否定)', ta: 'た形 (過去)', potential: '可能形 (Potential)', volitional: '意向形 (意志)' };
  const toggleForms = (id) => setShowForms(prev => ({ ...prev, [id]: !prev[id] }));

  const usedCount = Object.keys(favorites).length;
  const isFull = usedCount >= maxFavorites;

  return (
    <div className="flex flex-col h-full bg-slate-950 relative">
      <div className="p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
           <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"><ChevronRight className="rotate-180" size={24}/></button>
           <h2 className="text-2xl font-black text-white flex items-center gap-2"><BookOpen className='text-indigo-500'/> 動詞辭典</h2>
        </div>

        <div className="flex bg-slate-800 p-1 rounded-xl mb-3">
            <button onClick={() => setActiveTab('all')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>所有單字</button>
            <button onClick={() => setActiveTab('favorites')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'favorites' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Heart size={14} fill={activeTab === 'favorites' ? "currentColor" : "none"}/> 我的收藏</button>
        </div>

        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
            {ALL_LEVELS.map(level => {
                const isActive = selectedLevels.includes(level);
                return (
                    <button key={level} onClick={() => toggleLevel(level)} className={`flex-1 min-w-[3rem] py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1 ${isActive ? 'bg-slate-700 border-slate-500 text-white shadow' : 'bg-slate-800 border-slate-800 text-slate-500 hover:bg-slate-700'}`}>{level}</button>
                )
            })}
        </div>
        
        {/* 收藏空間 (永遠顯示) */}
        {activeTab === 'favorites' && (
            <div className="mb-3 bg-slate-800 rounded-lg p-2 border border-slate-700 flex items-center justify-between">
                <div className="flex-1 mr-3">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-bold uppercase">
                        <span>收藏空間</span>
                        <span className={isFull ? 'text-red-400' : 'text-slate-400'}>{usedCount} / {maxFavorites}</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${Math.min((usedCount / maxFavorites) * 100, 100)}%` }}></div>
                    </div>
                </div>
                <button onClick={onWatchAdForSlots} className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-2 py-1.5 rounded-md flex items-center gap-1">
                    <Plus size={10}/> +5格
                </button>
            </div>
        )}

        <input type="text" placeholder="搜尋單字..." value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"/>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredData.length === 0 ? (
            <div className="text-center p-10 text-slate-500 flex flex-col items-center">
                <BookOpen size={48} className="mb-4 opacity-20"/>
                <p>{activeTab === 'favorites' && usedCount === 0 ? '還沒有收藏任何單字喔！' : `找不到符合 ${selectedLevels.join(', ')} 的單字`}</p>
            </div>
        ) : (
            filteredData.map((verb) => (
                <div key={verb.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <p className="text-4xl font-extrabold text-indigo-400 mb-1">{verb.kanji} <span className="text-xl text-slate-500">({verb.hiragana})</span></p>
                                <button onClick={(e) => { e.stopPropagation(); speak(verb.forms.dictionary.word); }} className="p-2 bg-slate-700 hover:bg-indigo-600 rounded-full text-white transition-colors shadow-md"><Volume2 size={20} /></button>
                            </div>
                            <p className="text-lg font-medium text-white flex items-center gap-2"><Tag size={18} className='text-slate-500'/> {verb.meaning}</p>
                        </div>
                        <button onClick={() => toggleFavorite(verb.id)} className={`p-2 rounded-full transition-colors ${favorites[verb.id] ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-slate-400 hover:text-red-400'}`}><Star size={24} fill={favorites[verb.id] ? 'currentColor' : 'none'} /></button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4 border-t border-b border-slate-700 py-2">
                        <span className="flex items-center gap-1 font-semibold"><Layers size={14}/> {verb.group}</span>
                        <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-mono text-xs">{verb.level}</span>
                    </div>
                    <button onClick={() => toggleForms(verb.id)} className="w-full py-2 mb-3 text-sm font-bold rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors flex items-center justify-center gap-2">{showForms[verb.id] ? '隱藏' : '展開'} 完整變化形 & 例句<ChevronRight size={16} className={`transition-transform ${showForms[verb.id] ? 'rotate-90' : ''}`}/></button>
                    {showForms[verb.id] && (
                        <div className="space-y-2 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                            {Object.entries(verb.forms).map(([key, data]) => (<FormRow key={key} label={formLabels[key] || key} data={data} />))}
                        </div>
                    )}
                </div>
            ))
        )}
      </div>
    </div>
  );
}