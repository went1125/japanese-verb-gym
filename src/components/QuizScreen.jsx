import React, { useState, useEffect, useCallback } from 'react';
import { Timer, Trophy, Check, X, ArrowRight } from 'lucide-react';
// 本地開發正確路徑
import { VERB_DATA } from '../data/verbs.js';
import { MODES } from '../constants/modes.jsx';

export default function QuizScreen({ mode, onFinish, onExit, favorites, toggleFavorite, selectedLevels }) {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  
  // 安全取得當前題目
  const currentQ = questions[qIndex] || {}; 

  // --- 1. 干擾項生成邏輯 ---
  const generateDistractors = useCallback((verb, targetKey) => {
    const distractors = new Set();
    const correctWord = verb.forms[targetKey].word;

    // 策略 A: 同動詞的其他變化形 (高混淆度)
    const sameVerbOtherForms = Object.keys(verb.forms)
        .filter(k => k !== targetKey && k !== 'dictionary')
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(k => verb.forms[k].word);

    sameVerbOtherForms.forEach(f => distractors.add(f));

    // 策略 B: 隨機其他動詞的相同變化形 (跨單字干擾)
    const otherVerbs = VERB_DATA.filter(v => v.id !== verb.id);
    if (otherVerbs.length > 0) {
        const otherVerb = otherVerbs[Math.floor(Math.random() * otherVerbs.length)];
        const otherForm = otherVerb.forms[targetKey]?.word;
        if (otherForm) distractors.add(otherForm);
    }

    // 策略 C: 填充項 (防止選項不足)
    while (distractors.size < 3) {
        const randomVerb = VERB_DATA[Math.floor(Math.random() * VERB_DATA.length)];
        distractors.add(randomVerb.forms.dictionary.word + ' (原)'); 
    }
    
    // 過濾掉與正確答案相同的選項，並取前 3 個
    const finalDistractors = Array.from(distractors).filter(d => d !== correctWord).slice(0, 3);
    return finalDistractors;
  }, []);

  // --- 2. 初始化題目 ---
  useEffect(() => {
    const qCount = 5; // 每輪題數
    const generated = [];
    const allTargetKeys = MODES.filter(m => m.id !== 'mix').map(m => m.id);

    // --- STEP A: 根據 Level 篩選單字池 ---
    // verb.level 是 "N5", "N4" 等字串
    // 如果 selectedLevels 為空或未定義，預設使用 N5 防呆
    const activeLevels = (selectedLevels && selectedLevels.length > 0) ? selectedLevels : ['N5'];
    
    const levelFilteredVerbs = VERB_DATA.filter(v => activeLevels.includes(v.level));

    // 防呆：如果篩選後沒有單字 (例如該等級資料庫還沒建)，則退回到全部
    const pool = levelFilteredVerbs.length > 0 ? levelFilteredVerbs : VERB_DATA;

    // 簡單的隨機選題 (實際專案可改為從 user preferences 讀取權重)
    for (let i = 0; i < qCount; i++) {
      const verb = pool[Math.floor(Math.random() * pool.length)];
      let targetKey = mode.id;

      if (mode.id === 'mix') {
        targetKey = allTargetKeys[Math.floor(Math.random() * allTargetKeys.length)];
      }

      // 防呆：確保該動詞有這個變化形
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
  }, [mode, generateDistractors, selectedLevels]);

  // --- 3. 計時器邏輯 ---
  useEffect(() => {
    // 如果顯示結果中、沒有題目、或尚未載入完成，則暫停計時
    if (showResult || !questions.length || !currentQ || !mode) return; 
    
    if (timeLeft <= 0) {
      handleAnswer(null); // 超時視為答錯
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, questions.length, qIndex, currentQ, mode]); 

  // --- 4. 作答處理 ---
  const handleAnswer = (option) => {
    if (selectedOption !== null) return; // 防止重複點擊
    setSelectedOption(option);
    setShowResult(true);

    const isCorrect = option === currentQ.correct;
    if (isCorrect) {
      // 分數計算：基礎 10 分 + (剩餘秒數 * 2)
      setScore(prev => prev + 10 + Math.ceil(timeLeft * 2));
    }
  };

  // --- 5. 下一題/結算處理 ---
  const handleNextQuestion = () => {
    if (qIndex < questions.length - 1) {
      // 還有下一題
      setQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimeLeft(10); // 重置時間
    } else {
      // 最後一題，觸發結算
      onFinish(score);
    }
  };

  // 載入中狀態
  if (questions.length === 0) return (
    <div className="flex items-center justify-center h-full text-slate-400">
      <p className="animate-pulse">正在準備 {selectedLevels?.join(', ')} 程度的題目...</p>
    </div>
  );

  const targetFormInfo = currentQ.verb.forms[currentQ.targetKey];

  return (
    <div className="flex flex-col h-screen relative bg-slate-900">
      {/* 頂部進度條 */}
      <div className="h-1 bg-indigo-900 w-full">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${((qIndex + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* 資訊列 */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={onExit} className="text-slate-500 text-sm hover:text-white flex items-center gap-1 transition-colors">
            <X size={16} /> 退出
          </button>
          <div className={`flex items-center gap-1 font-mono font-bold text-lg p-2 rounded-full border ${timeLeft < 4 ? 'text-red-500 border-red-500 animate-pulse bg-red-500/10' : 'text-slate-300 border-slate-700'}`}>
            <Timer size={18} /> {timeLeft}s
          </div>
          <div className="text-indigo-400 font-bold flex items-center gap-1">
            <Trophy size={18} /> {score}
          </div>
        </div>

        {/* 題目區 */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-10">
            <div className="inline-block bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs text-slate-400 mb-4">
              <span className='text-indigo-400 font-bold mr-1'>{currentQ.targetLabel}</span>: 轉為 <span className="text-sm ml-1">{currentQ.targetKey.toUpperCase()}</span>
            </div>
            
            <h2 className="text-6xl font-black text-white mb-2 tracking-tight">{currentQ.verb.kanji}</h2>
            <p className="text-slate-500 text-lg font-medium">{currentQ.verb.hiragana} • {currentQ.verb.meaning}</p>
          </div>

          {/* 結果反饋與例句區 (Popup) */}
          {showResult && (
              <div className="absolute inset-x-4 top-1/4 bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 shadow-2xl z-20 animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-full ${selectedOption === currentQ.correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {selectedOption === currentQ.correct ? <Check size={28} /> : <X size={28} />}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">正確變化</p>
                    <p className="text-3xl font-bold text-white">{currentQ.correct}</p>
                  </div>
                </div>
                
                {/* 例句區塊 */}
                <div className="bg-slate-900/80 rounded-xl p-4 border-l-4 border-indigo-500 mb-6">
                  <p className="text-lg text-white font-medium mb-1">
                    {targetFormInfo.sentence}
                  </p>
                  <p className="text-sm text-slate-400">{targetFormInfo.trans}</p>
                </div>

                {/* 確認/下一題按鈕 */}
                <button 
                  onClick={handleNextQuestion}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  {qIndex < questions.length - 1 ? '下一題' : '查看成績'} <ArrowRight size={20} />
                </button>
              </div>
          )}

          {/* 選項區 */}
          <div className="grid grid-cols-1 gap-3 mb-8">
            {currentQ.options.map((opt, idx) => {
              const isCorrect = opt === currentQ.correct;
              const isSelected = opt === selectedOption;

              // 樣式邏輯：顯示結果時，正確答案亮綠色，錯誤選擇亮紅色
              let btnClass = "bg-slate-800 border-2 border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:bg-slate-750";
              
              if (showResult) {
                if (isCorrect) btnClass = "bg-green-500/10 border-green-500 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                else if (isSelected) btnClass = "bg-red-500/10 border-red-500 text-red-100 opacity-80";
                else btnClass = "bg-slate-800 border-slate-800 text-slate-600 opacity-30 blur-[1px]";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  disabled={showResult}
                  className={`p-4 rounded-xl text-xl font-bold transition-all duration-200 active:scale-95 ${btnClass}`}
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