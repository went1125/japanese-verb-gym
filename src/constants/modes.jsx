// src/constants/modes.jsx
import React from 'react';
import { Check, RotateCcw, X, Timer, Zap, Lightbulb, Users } from 'lucide-react';

// 精確匯出：MODES 設定檔
export const MODES = [
  { 
    id: 'masu', 
    label: 'ます形 (丁寧)', 
    color: 'from-blue-500 to-cyan-400', 
    desc: 'Warm-up: 最基礎的禮貌體',
    icon: <Check size={20} className="text-white"/> 
  },
  { 
    id: 'te', 
    label: 'て形 (連接)', 
    color: 'from-orange-500 to-amber-400', 
    desc: 'Cardio: 接續句子的核心',
    icon: <RotateCcw size={20} className="text-white"/>
  },
  { 
    id: 'nai', 
    label: 'ない形 (否定)', 
    color: 'from-red-500 to-rose-400', 
    desc: 'Strength: 拒絕與否定',
    icon: <X size={20} className="text-white"/>
  },
  { 
    id: 'ta', 
    label: 'た形 (過去)', 
    color: 'from-emerald-500 to-teal-400', 
    desc: 'Endurance: 過去發生的事',
    icon: <Timer size={20} className="text-white"/>
  },
    // --- 付費進階模式 ---
  { 
    id: 'potential', 
    label: '可能形 (能力)', 
    color: 'from-pink-500 to-rose-400', 
    desc: 'Ability: 能做什麼 (Pro)',
    icon: <Lightbulb size={20} className="text-white"/>,
  },
  { 
    id: 'volitional', 
    label: '意向形 (意志)', 
    color: 'from-cyan-500 to-blue-500', 
    desc: 'Intent: 邀請與意志 (Pro)',
    icon: <Users size={20} className="text-white"/>,
  },
  { 
    id: 'mix', 
    label: '混合特訓 (All)', 
    color: 'from-violet-600 to-purple-500', 
    desc: 'HIIT: 高強度混合挑戰', 
    icon: <Zap size={20} className="text-white"/> 
  }
];