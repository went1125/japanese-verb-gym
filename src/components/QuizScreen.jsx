import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Timer, Trophy, Check, X, ArrowRight, Volume2 } from 'lucide-react';
import { VERB_DATA } from '../data/verbs.js';
import { MODES } from '../constants/modes.jsx';

// --- 語音引擎 (與 DictionaryScreen 共用邏輯) ---
const stripFurigana = (text) => {
  if (!text) return '';
  return text.replace(/\[[^\]]+\]/g, '');
};

const speak = (text) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // 停止上一句

  const cleanText = stripFurigana(text);
  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  // iOS Safari 語音修正邏輯
  let voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find(v => v.lang === 'ja-JP') || voices.find(v => v.lang.includes('ja'));
  if (jaVoice) utterance.voice = jaVoice;

  utterance.lang = 'ja-JP'; 
  utterance.rate = 0.9;     
  window.speechSynthesis.speak(utterance);
};

// --- 振假名顯示組件 ---
const FuriganaText = ({ text }) => {
  if (!text) return null;
  const regex = /([\u4e00-\u9faf\u3005]+)\[([^\]]+)\]/g;
  let match;
  let lastIndex = 0;
  let result = [];
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>);
    }
    result.push(
      <ruby key={`ruby-${match.index}`} className="mx-0.5 font-medium group">
        {match[1]}
        <rt className="text-[0.6em] text-indigo-300 font-normal select-none opacity-80">
          {match[2]}
        </rt>
      </ruby>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    result.push(<span key={`end-${lastIndex}`}>{text.substring(lastIndex)}</span>);
  }
  return <span>{result}</span>;
};

// --- 核心演算法：平假名五段變換表 ---
// 用於將動詞結尾 (u段) 轉換為其他段，製造混淆選項
const HIRAGANA_CHART = {
  'u': { a: 'わ', i: 'い', u: 'う', e: 'え', o: 'お', te: 'って', ta: 'った' },
  'ku': { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ', te: 'いて', ta: 'いた' },
  'gu': { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご', te: 'いで', ta: 'いだ' },
  'su': { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ', te: 'して', ta: 'した' },
  'tsu': { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と', te: 'って', ta: 'った' },
  'nu': { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の', te: 'んで', ta: 'んだ' },
  'bu': { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ', te: 'んで', ta: 'んだ' },
  'mu': { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も', te: 'んで', ta: 'んだ' },
  'ru': { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ', te: 'って', ta: 'った' }, // 五段的 ru
};

export default function QuizScreen({ mode, onFinish, onExit, favorites, toggleFavorite, selectedLevels }) {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  
  // 用於第一次載入語音 (解決 iOS 首次靜音問題)
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const currentQ = questions[qIndex] || {}; 

  // --- 1. 高難度干擾項生成器 (核心邏輯) ---
  const generateHardDistractors = useCallback((verb, targetKey) => {
    const correctWord = verb.forms[targetKey].word;
    const dictWord = verb.forms.dictionary.word;
    const fakeSet = new Set();

    // 取得動詞結尾 (最後一個字)
    const lastChar = dictWord.slice(-1);
    const stem = dictWord.slice(0, -1);

    // 判斷動詞類型
    const isIchidan = verb.group.includes('Ru-Verb') || verb.group.includes('二類');
    const isGodan = verb.group.includes('U-Verb') || verb.group.includes('一類');
    const isIrregular = verb.group.includes('Irregular') || verb.group.includes('不規則');

    // ----------------------------------------------------
    // A. 針對 [ます形] (Masu) 的混淆
    // ----------------------------------------------------
    if (targetKey === 'masu') {
        const suffix = 'ます';
        if (isGodan) {
            // 五段正確: i段 + masu (例: ikimasu)
            // 混淆: a段, u段, e段, o段 + masu (例: ikamasu, ikumasu...)
            const row = HIRAGANA_CHART[lastChar] || HIRAGANA_CHART['u']; // fallback
            fakeSet.add(stem + row.a + suffix);
            fakeSet.add(stem + row.u + suffix);
            fakeSet.add(stem + row.e + suffix);
            fakeSet.add(stem + row.o + suffix);
        } else if (isIchidan) {
            // 一段正確: 去ru + masu (例: tabemasu)
            // 混淆: 保留ru (taberumasu), 變godan變法 (tabimasu)
            fakeSet.add(stem + 'る' + suffix); // taberumasu
            fakeSet.add(stem + 'り' + suffix); // tabimasu (偽裝成五段)
        }
    }

    // ----------------------------------------------------
    // B. 針對 [ない形] (Nai) 的混淆
    // ----------------------------------------------------
    else if (targetKey === 'nai') {
        const suffix = 'ない';
        if (isGodan) {
            // 五段正確: a段 + nai (例: ikanai)
            // 混淆: i段, u段, e段 + nai
            const row = HIRAGANA_CHART[lastChar] || HIRAGANA_CHART['u'];
            fakeSet.add(stem + row.i + suffix); // ikinai
            fakeSet.add(stem + row.u + suffix); // ikunai
            fakeSet.add(stem + row.e + suffix); // ikenai (雖然可能是可能形否定，但在初級混淆很有效)
        } else if (isIchidan) {
            // 一段正確: 去ru + nai (例: tabenai)
            // 混淆: taberunai, tabaranai
            fakeSet.add(stem + 'る' + suffix); 
            fakeSet.add(stem + 'ら' + suffix); // 偽裝成五段
        }
    }

    // ----------------------------------------------------
    // C. 針對 [て形/た形] (Te/Ta) 的音便混淆
    // ----------------------------------------------------
    else if (targetKey === 'te' || targetKey === 'ta') {
        // 這邊我們要混淆「促音便」、「撥音便」、「イ音便」
        // 例如: 正確是 yonde -> 混淆: yotte, yoite, yoshite
        const endSuffix = targetKey === 'te' ? 'て' : 'た';
        const deSuffix = targetKey === 'te' ? 'で' : 'だ';

        const fakeEndings = [
            stem + 'っ' + endSuffix, // tte/tta
            stem + 'ん' + deSuffix,  // nde/nda
            stem + 'い' + endSuffix, // ite/ita
            stem + 'し' + endSuffix, // shite/shita
            dictWord + endSuffix     // 字典形直接加 (iku-te)
        ];

        fakeEndings.forEach(f => {
            if (f !== correctWord) fakeSet.add(f);
        });
    }

    // ----------------------------------------------------
    // D. 針對 [可能形/意向形] 的混淆
    // ----------------------------------------------------
    else if (targetKey === 'potential' || targetKey === 'volitional') {
        if (isGodan) {
            const row = HIRAGANA_CHART[lastChar] || HIRAGANA_CHART['u'];
            // 混淆段位
            if (targetKey === 'potential') { // 正確 e段+ru
                fakeSet.add(stem + row.a + 'れる'); // 偽裝成被動/一段 (ikareru)
                fakeSet.add(stem + row.i + 'える'); // (ikieru)
            } else { // volitional 正確 o段+u
                fakeSet.add(stem + row.a + 'よう'); // (ikayou)
                fakeSet.add(stem + row.e + 'よう'); // (ikeyou)
            }
        } else if (isIchidan) {
             if (targetKey === 'potential') {
                 fakeSet.add(stem + 'れる'); // 拉拔詞 (tabereru - 少ra)
                 fakeSet.add(stem + 'areru'); 
             }
        }
    }

    // 不規則動詞 (Irregular) 直接手動加一些常見錯誤
    if (isIrregular) {
        if (dictWord === '来る') {
            fakeSet.add('来ない'); fakeSet.add('来ます'); // 混入其他形
            fakeSet.add('きる'); fakeSet.add('こる'); // 亂改讀音的感覺
        }
        if (dictWord === 'する') {
            fakeSet.add('しる'); fakeSet.add('すります');
            fakeSet.add('すて'); fakeSet.add('さる');
        }
    }

    // --- 填充策略 (如果混淆項不夠) ---
    // 還是不夠的話，拿其他動詞的「正確變化形」來補，或者直接拿原形加後綴
    while (fakeSet.size < 3) {
        const randomVerb = VERB_DATA[Math.floor(Math.random() * VERB_DATA.length)];
        // 確保不要拿正確答案
        if (randomVerb.id !== verb.id) {
             // 拿別的動詞的同一形 (跨單字干擾)
             if (randomVerb.forms[targetKey]) {
                 fakeSet.add(randomVerb.forms[targetKey].word);
             }
        } else {
             // 拿同一動詞的其他形 (本單字干擾)
             const forms = Object.values(verb.forms).map(f => f.word);
             const randomForm = forms[Math.floor(Math.random() * forms.length)];
             if (randomForm !== correctWord) fakeSet.add(randomForm);
        }
        
        // 萬一還是不夠 (極端情況)，加個亂碼防止無窮迴圈
        if (fakeSet.size < 3) fakeSet.add(dictWord + " (誤)");
    }

    // 轉回陣列並取前 3 個，過濾掉不小心產生成正確答案的
    return Array.from(fakeSet).filter(w => w !== correctWord).slice(0, 3);

  }, []);

  // --- 2. 初始化題目 ---
  useEffect(() => {
    const qCount = 5; 
    const generated = [];
    const allTargetKeys = MODES.filter(m => m.id !== 'mix').map(m => m.id);

    const activeLevels = (selectedLevels && selectedLevels.length > 0) ? selectedLevels : ['N5'];
    const levelFilteredVerbs = VERB_DATA.filter(v => activeLevels.includes(v.level));
    const pool = levelFilteredVerbs.length > 0 ? levelFilteredVerbs : VERB_DATA;

    for (let i = 0; i < qCount; i++) {
      const verb = pool[Math.floor(Math.random() * pool.length)];
      let targetKey = mode.id;

      if (mode.id === 'mix') {
        targetKey = allTargetKeys[Math.floor(Math.random() * allTargetKeys.length)];
      }

      if (!verb.forms[targetKey]) continue; 

      const correct = verb.forms[targetKey].word;
      // 使用新的高難度混淆生成器
      const distractors = generateHardDistractors(verb, targetKey);
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
  }, [mode, generateHardDistractors, selectedLevels]);

  // --- 3. 計時器邏輯 ---
  useEffect(() => {
    if (showResult || !questions.length || !currentQ || !mode) return; 
    
    if (timeLeft <= 0) {
      handleAnswer(null); 
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, questions.length, qIndex, currentQ, mode]); 

  // --- 4. 作答處理 (新增自動語音) ---
  const handleAnswer = (option) => {
    if (selectedOption !== null) return; 
    setSelectedOption(option);
    setShowResult(true);

    const isCorrect = option === currentQ.correct;
    if (isCorrect) {
      setScore(prev => prev + 10 + Math.ceil(timeLeft * 2));
    }

    // **優化 2: 作答後自動播放例句語音**
    const sentence = currentQ.verb.forms[currentQ.targetKey].sentence;
    speak(sentence);
  };

  // --- 5. 下一題/結算處理 ---
  const handleNextQuestion = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimeLeft(10); 
      // 停止語音，避免上一題的聲音干擾下一題思考
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } else {
      onFinish(score);
    }
  };

  if (questions.length === 0) return (
    <div className="flex items-center justify-center h-full text-slate-400">
      <p className="animate-pulse">正在準備高難度特訓...</p>
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
                
                {/* 例句區塊 (新增語音按鈕) */}
                <div className="bg-slate-900/80 rounded-xl p-4 border-l-4 border-indigo-500 mb-6">
                  <div className="flex justify-between items-start gap-2">
                      <div className="text-lg text-white font-medium mb-1 leading-relaxed">
                        <FuriganaText text={targetFormInfo.sentence} />
                      </div>
                      <button 
                        onClick={() => speak(targetFormInfo.sentence)}
                        className="p-2 bg-slate-700 hover:bg-indigo-600 rounded-full text-white transition-colors shadow-md shrink-0"
                        title="重聽發音"
                      >
                        <Volume2 size={20} />
                      </button>
                  </div>
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