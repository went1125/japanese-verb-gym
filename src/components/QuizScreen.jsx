// src/components/QuizScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Timer, Trophy, Check, X, Star } from 'lucide-react';
import { VERB_DATA } from '../data/verbs';     // Import 資料
import { MODES } from '../constants/modes.jsx';    // Import 設定

export default function QuizScreen({ mode, onFinish, onExit, favorites, toggleFavorite }) {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  
  // 必須確保 questions[qIndex] 存在
  const currentQ = questions[qIndex] || {}; 

  // 生成干擾項邏輯
  const generateDistractors = useCallback((verb, targetKey) => {
    const distractors = new Set();
    const correctWord = verb.forms[targetKey].word;

    // 1. 同動詞的其他變化形
    const sameVerbOtherForms = Object.keys(verb.forms)
        .filter(k => k !== targetKey && k !== 'dictionary')
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(k => verb.forms[k].word);

    sameVerbOtherForms.forEach(f => distractors.add(f));

    // 2. 隨機不同動詞的相同變化形
    const otherVerbs = VERB_DATA.filter(v => v.id !== verb.id);
    if (otherVerbs.length > 0) {
        const otherVerb = otherVerbs[Math.floor(Math.random() * otherVerbs.length)];
        const otherForm = otherVerb.forms[targetKey]?.word;
        if (otherForm) distractors.add(otherForm);
    }

    // 3. 填充
    while (distractors.size < 3) {
        distractors.add('誤答選項 ' + (distractors.size + 1));
    }
    
    const finalDistractors = Array.from(distractors).filter(d => d !== correctWord).slice(0, 3);
    return finalDistractors;
  }, []);

  // 初始化題目
  useEffect(() => {
    const qCount = 5; 
    const generated = [];
    
    for (let i = 0; i < qCount; i++) {
      const verb = VERB_DATA[Math.floor(Math.random() * VERB_DATA.length)];
      let targetKey = mode.id;

      if (mode.id === 'mix') {
        const keys = Object.keys(verb.forms).filter(k => k !== 'dictionary');
        targetKey = keys[Math.floor(Math.random() * keys.length)];
      }

      if (!verb.forms[targetKey]) continue; 

      const correct = verb.forms[targetKey].word;
      const distractors = generateDistractors(verb, targetKey);
      const options = [correct, ...distractors].sort(() => 0.5 - Math.random());

      generated.push({
        verb,
        targetKey,
        targetLabel: MODES.find(m => m.id === targetKey)?.label || targetKey,
        correct,
        options
      });
    }
    setQuestions(generated);
  }, [mode, generateDistractors]);

  // 計時器邏輯
  useEffect(() => {
    if (showResult || !questions.length || !currentQ || !mode) return; // 避免在初始化完成前運行
    
    if (timeLeft <= 0) {
      handleAnswer(null); // 超時
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, questions, qIndex, currentQ]); 

  const handleAnswer = (option) => {
    if (selectedOption !== null) return; 
    setSelectedOption(option);
    setShowResult(true);

    const isCorrect = option === currentQ.correct;
    if (isCorrect) {
      setScore(prev => prev + 10 + Math.ceil(timeLeft * 2));
    }

    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowResult(false);
        setTimeLeft(10);
      } else {
        onFinish(score + (isCorrect ? 10 : 0));
      }
    }, 2500);
  };

  if (questions.length === 0) return <div className="p-10 text-center text-white">正在生成題目...</div>;

  const targetFormInfo = currentQ.verb.forms[currentQ.targetKey];
  const isFavorite = favorites[currentQ.verb.id];

  return (
    <div className="flex flex-col h-screen relative bg-slate-900">
      {/* 頂部進度條 */}
      <div className="h-1 bg-indigo-600/50 w-full">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${((qIndex + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Header Info */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={onExit} className="text-slate-500 text-sm hover:text-white flex items-center gap-1">
            <X size={16} /> 退出
          </button>
          <div className={`flex items-center gap-1 font-mono font-bold text-lg p-2 rounded-full border ${timeLeft < 4 ? 'text-red-500 border-red-500 animate-pulse' : 'text-slate-300 border-slate-700'}`}>
            <Timer size={18} /> {timeLeft}s
          </div>
          <div className="text-indigo-400 font-bold flex items-center gap-1">
            <Trophy size={18} /> {score} pts
          </div>
        </div>

        {/* 題目區 */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-10">
            {/* 收藏按鈕 */}
            <button 
                onClick={() => toggleFavorite(currentQ.verb.id)}
                className={`mb-4 p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                disabled={showResult}
            >
                <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            
            <div className="inline-block bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs text-slate-400 mb-4">
              <span className='text-indigo-400 font-bold mr-1'>{currentQ.targetLabel}</span>: 轉為 <span className="text-sm ml-1">{currentQ.targetKey.toUpperCase()}</span>
            </div>
            
            <h2 className="text-7xl font-black text-white mb-1">{currentQ.verb.kanji}</h2>
            <p className="text-slate-500 text-lg font-medium">{currentQ.verb.hiragana} • {currentQ.verb.meaning}</p>
          </div>

          {/* 結果反饋區 */}
          {showResult && (
              <div className="absolute inset-x-4 top-1/4 bg-slate-800/95 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-2xl z-20 animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-full ${selectedOption === currentQ.correct ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
                    {selectedOption === currentQ.correct ? (
                      <Check size={28} className="text-white" />
                    ) : (
                      <X size={28} className="text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold">正確變化</p>
                    <p className="text-2xl font-bold text-white">{currentQ.correct}</p>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-xl p-4 border-l-4 border-indigo-500">
                  <p className="text-lg text-white font-medium mb-1">
                    {targetFormInfo.sentence}
                  </p>
                  <p className="text-sm text-slate-400">{targetFormInfo.trans}</p>
                </div>
              </div>
          )}

          {/* 選項區 */}
          <div className="grid grid-cols-1 gap-3 mb-8">
            {currentQ.options.map((opt, idx) => {
              const isCorrect = opt === currentQ.correct;
              const isSelected = opt === selectedOption;

              let btnClass = "bg-slate-800 border-2 border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:bg-slate-750";
              
              if (showResult) {
                if (isCorrect) btnClass = "bg-green-500/20 border-green-500 text-green-100 shadow-md shadow-green-500/20";
                else if (isSelected) btnClass = "bg-red-500/20 border-red-500 text-red-100 opacity-50 shadow-md shadow-red-500/20";
                else btnClass = "bg-slate-800 border-slate-800 text-slate-600 opacity-30";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  disabled={showResult}
                  className={`p-4 rounded-xl text-xl font-bold transition-all active:scale-95 ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}