import React, { useState, useEffect, useRef, useCallback } from 'react';
// --- 關鍵：Firebase/Firestore 數據持久化所需引用 ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// 修正：將 doc() 引用為具體函數，避免路徑拼接錯誤
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore'; 

import { 
  Dumbbell, 
  Timer, 
  Flame, 
  ChevronRight, 
  BookOpen, 
  RotateCcw, 
  Trophy, 
  Check, 
  X,
  Star, // 用於收藏
  Zap // 強調速度
} from 'lucide-react';

// --- I. Firebase 初始化與數據服務 ---

const initializeFirebase = () => {
    // Canvas 環境變數
    //const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    //const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    const firebaseConfig = {
      apiKey: "AIzaSyD5ZhblmlvQcO9uzaC0nrkQoPS4eRas8Zk",
      authDomain: "verbgym.firebaseapp.com",
      projectId: "verbgym",
      storageBucket: "verbgym.firebasestorage.app",
      messagingSenderId: "897172726802",
      appId: "1:897172726802:web:bcde1db0c2cc9b3ac0a4cb",
      measurementId: "G-CMY1S6H376"
    };

    // appId 可以直接設定一個字串
    const appId = "verb-gym-mvp";
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
    
    if (!firebaseConfig.apiKey) {
        console.error("Firebase config is missing. Cannot initialize Firestore.");
        return { db: null, auth: null, appId };
    }

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    
    const signIn = async () => {
        try {
            if (initialAuthToken) {
                await signInWithCustomToken(auth, initialAuthToken);
            } else {
                await signInAnonymously(auth);
            }
            console.log("Firebase Auth successful.");
        } catch (error) {
            console.error("Firebase Auth failed:", error);
        }
    };
    
    signIn();
    
    return { db, auth, appId };
};

// --- II. 資料庫 (核心資產) ---
// 專家建議：為了 MVP，我們精選 5 個最常用動詞，為每個變化型態都配上「情境例句」。

const VERB_DATA = [
  {
    id: 'eat',
    kanji: '食べる',
    hiragana: 'たべる',
    meaning: '吃',
    group: 'Ru-Verb (二類)',
    forms: {
      dictionary: { word: '食べる', sentence: '毎日、朝ごはんを食べる。', trans: '每天都吃早餐。' },
      masu: { word: '食べます', sentence: '魚をよく食べます。', trans: '我常吃魚。' },
      te: { word: '食べて', sentence: '野菜も食べてください。', trans: '請也吃點蔬菜。' },
      nai: { word: '食べない', sentence: '納豆は食べない。', trans: '我不吃納豆。' },
      ta: { word: '食べた', sentence: 'もう昼ごはんを食べた。', trans: '已經吃過午餐了。' },
      potential: { word: '食べられる', sentence: '刺身が食べられる？', trans: '你敢吃生魚片嗎？' }
    }
  },
  {
    id: 'drink',
    kanji: '飲む',
    hiragana: 'のむ',
    meaning: '喝',
    group: 'U-Verb (一類)',
    forms: {
      dictionary: { word: '飲む', sentence: 'お酒を飲むのが好き。', trans: '喜歡喝酒。' },
      masu: { word: '飲みます', sentence: 'コーヒーを飲みます。', trans: '我要喝咖啡。' },
      te: { word: '飲んで', sentence: '薬を飲んで寝る。', trans: '吃藥睡覺。' },
      nai: { word: '飲まない', sentence: '今日は飲まない。', trans: '今天不喝。' },
      ta: { word: '飲んだ', sentence: '昨日、たくさん飲んだ。', trans: '昨天喝了很多。' },
      potential: { word: '飲める', sentence: 'この水は飲める。', trans: '這水可以喝。' }
    }
  },
  {
    id: 'go',
    kanji: '行く',
    hiragana: 'いく',
    meaning: '去',
    group: 'U-Verb (一類)',
    forms: {
      dictionary: { word: '行く', sentence: '明日、東京へ行く。', trans: '明天要去東京。' },
      masu: { word: '行きます', sentence: '学校へ行きます。', trans: '要去學校。' },
      te: { word: '行って', sentence: 'まっすぐ行ってください。', trans: '請直走。' },
      nai: { word: '行かない', sentence: 'パーティーに行かない。', trans: '不去派對。' },
      ta: { word: '行った', sentence: '日本に行ったことがある。', trans: '去過日本。' },
      potential: { word: '行ける', sentence: '自転車で行ける。', trans: '騎腳踏車能到。' }
    }
  },
  {
    id: 'come',
    kanji: '来る',
    hiragana: 'くる',
    meaning: '來',
    group: 'Irregular (不規則)',
    forms: {
      dictionary: { word: '来る', sentence: '彼が来るのを待つ。', trans: '等他來。' },
      masu: { word: '来ます', sentence: '明日、来ますか？', trans: '明天會來嗎？' },
      te: { word: '来て', sentence: 'こっちに来て！', trans: '過來這裡！' },
      nai: { word: '来ない', sentence: 'バスが全然来ない。', trans: '公車一直不來。' },
      ta: { word: '来た', sentence: 'やっと来た！', trans: '終於來了！' },
      potential: { word: '来られる', sentence: '明日は来られる。', trans: '明天能來。' }
    }
  },
  {
    id: 'do',
    kanji: 'する',
    hiragana: 'する',
    meaning: '做',
    group: 'Irregular (不規則)',
    forms: {
      dictionary: { word: 'する', sentence: '宿題をする。', trans: '做作業。' },
      masu: { word: 'します', sentence: 'テニスをします。', trans: '打網球。' },
      te: { word: 'して', sentence: '勉強して遊ぶ。', trans: '讀完書再玩。' },
      nai: { word: 'しない', sentence: '無理はしない。', trans: '不勉強自己。' },
      ta: { word: 'した', sentence: '掃除をした。', trans: '打掃了。' },
      potential: { word: 'できる', sentence: '日本語ができる。', trans: '會說日文。' }
    }
  }
];

const MODES = [
  { id: 'masu', label: 'ます形 (丁寧)', color: 'from-blue-500 to-cyan-400', desc: 'Warm-up: 最基礎的禮貌體' },
  { id: 'te', label: 'て形 (連接)', color: 'from-orange-500 to-amber-400', desc: 'Cardio: 接續句子的核心' },
  { id: 'nai', label: 'ない形 (否定)', color: 'from-red-500 to-rose-400', desc: 'Strength: 拒絕與否定' },
  { id: 'ta', label: 'た形 (過去)', color: 'from-emerald-500 to-teal-400', desc: 'Endurance: 過去發生的事' },
  { id: 'mix', label: '混合特訓 (All)', color: 'from-violet-600 to-purple-500', desc: 'HIIT: 高強度混合挑戰', icon: <Zap size={20} className="text-white"/> }
];

// --- III. 主應用程式 (App Component) ---

export default function App() {
  const [screen, setScreen] = useState('menu'); // menu, quiz, summary, dictionary
  const [selectedMode, setSelectedMode] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  // --- Firestore 狀態 ---
  const [firebaseServices, setFirebaseServices] = useState({ db: null, auth: null, appId: null });
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [favorites, setFavorites] = useState({}); // { verbId: boolean }
  const [streak, setStreak] = useState(0); // 連續訓練天數
  
  // 修正 Firestore 路徑常量
  const USER_DATA_COLLECTION = 'user_config';
  const CONFIG_DOCUMENT_ID = 'data';

  // 1. Firebase 初始化與認證
  useEffect(() => {
    const { db, auth, appId } = initializeFirebase();
    if (auth) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                setIsAuthReady(true);
            } else {
                setIsAuthReady(true);
            }
        });
        setFirebaseServices({ db, auth, appId });
        return () => unsubscribe();
    } else {
        setIsAuthReady(true);
    }
  }, []);

  // 2. Firestore 數據監聽 (Favorites & Streak)
  useEffect(() => {
      if (!firebaseServices.db || !userId) return;

      // 修正路徑：確保為偶數個段位 (Collection/Document/...)
      const favRef = doc(
        firebaseServices.db, 
        'artifacts', firebaseServices.appId, 
        'users', userId, 
        USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID // 6 segments
      );

      const unsubFav = onSnapshot(favRef, (docSnap) => {
          if (docSnap.exists()) {
              setFavorites(docSnap.data().verbs || {});
              setStreak(docSnap.data().streak || 0); // Streak 數據一起儲存
          } else {
              setFavorites({});
              setStreak(0);
          }
      }, (error) => {
          console.error("Error listening to user data:", error);
      });

      return () => unsubFav();
  }, [firebaseServices.db, userId, firebaseServices.appId]);
  
  // 3. 收藏切換邏輯 (Firestore 寫入)
  const toggleFavorite = useCallback(async (verbId) => {
      if (!firebaseServices.db || !userId) return;
      
      const newFavorites = { ...favorites };
      if (newFavorites[verbId]) {
          delete newFavorites[verbId]; // 移除
      } else {
          newFavorites[verbId] = true; // 加入
      }

      // 修正路徑：確保為偶數個段位 (Collection/Document/...)
      const favRef = doc(
        firebaseServices.db, 
        'artifacts', firebaseServices.appId, 
        'users', userId, 
        USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID
      );

      try {
          // 只更新 verbs 字段，保留 streak 字段
          await setDoc(favRef, { verbs: newFavorites }, { merge: true });
          setFavorites(newFavorites);
      } catch (error) {
          console.error("Failed to update favorite:", error);
      }
  }, [firebaseServices.db, userId, firebaseServices.appId, favorites]);

  // 4. 更新 Streak 邏輯 (MVP: 每次成功完成測驗後更新)
  const updateStreak = useCallback(async (newStreak) => {
    if (!firebaseServices.db || !userId) return;
    
    // 修正路徑：確保為偶數個段位 (Collection/Document/...)
    const favRef = doc(
      firebaseServices.db, 
      'artifacts', firebaseServices.appId, 
      'users', userId, 
      USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID
    );
    
    try {
        await setDoc(favRef, { streak: newStreak }, { merge: true });
        setStreak(newStreak);
    } catch (error) {
        console.error("Failed to update streak:", error);
    }
  }, [firebaseServices.db, userId, firebaseServices.appId]);

  const renderScreen = () => {
    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-950">
                <p className="text-white text-lg">數據載入中...</p>
            </div>
        );
    }

    switch(screen) {
      case 'menu': return <MenuScreen 
        onStart={(mode) => { setSelectedMode(mode); setScreen('quiz'); }} 
        onDict={() => setScreen('dictionary')}
        streak={streak} 
        userId={userId}
      />;
      case 'quiz': return <QuizScreen 
        mode={selectedMode} 
        onFinish={(score) => { setFinalScore(score); setScreen('summary'); updateStreak(streak + 1); }} 
        onExit={() => setScreen('menu')}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />;
      case 'summary': return <SummaryScreen 
        score={finalScore} 
        mode={selectedMode} 
        onHome={() => setScreen('menu')} 
        onRetry={() => setScreen('quiz')} 
      />;
      case 'dictionary': return <DictionaryScreen 
        onBack={() => setScreen('menu')} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
      />;
      default: return <MenuScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-slate-900 border-x border-slate-800">
        {renderScreen()}
      </div>
    </div>
  );
}

// --- 畫面 1: 主選單 (Menu) ---
function MenuScreen({ onStart, onDict, streak, userId }) {
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
                  {/* 修正 React 渲染：確保 mode.icon 是有效的 React 元素 */}
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
          <p className="text-xs text-slate-600 mt-2">UserID: {userId || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

// --- 畫面 2: 測驗 (Quiz) - 核心功能 ---
function QuizScreen({ mode, onFinish, onExit, favorites, toggleFavorite }) {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 每一題 10 秒
  const currentQ = questions[qIndex];

  // 生成精準干擾項 (Expert Level Logic)
  const generateDistractors = useCallback((verb, targetKey) => {
    const distractors = new Set();
    const correctWord = verb.forms[targetKey].word;

    // 1. 同動詞的其他變化形 (最容易混淆)
    const sameVerbOtherForms = Object.keys(verb.forms)
        .filter(k => k !== targetKey && k !== 'dictionary')
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(k => verb.forms[k].word);

    sameVerbOtherForms.forEach(f => distractors.add(f));

    // 2. 隨機不同動詞的相同變化形 (跨動詞類型干擾)
    const otherVerbs = VERB_DATA.filter(v => v.id !== verb.id);
    if (otherVerbs.length > 0) {
        const otherVerb = otherVerbs[Math.floor(Math.random() * otherVerbs.length)];
        const otherForm = otherVerb.forms[targetKey]?.word;
        if (otherForm) distractors.add(otherForm);
    }

    // 3. 填充，確保有 3 個錯誤答案
    while (distractors.size < 3) {
        distractors.add('誤答選項 ' + (distractors.size + 1));
    }
    
    // 過濾掉可能重複的正確答案
    const finalDistractors = Array.from(distractors).filter(d => d !== correctWord).slice(0, 3);
    return finalDistractors;
  }, []);

  // 初始化題目
  useEffect(() => {
    const qCount = 5; // 一輪 5 題
    const generated = [];
    
    for (let i = 0; i < qCount; i++) {
      const verb = VERB_DATA[Math.floor(Math.random() * VERB_DATA.length)];
      let targetKey = mode.id;

      if (mode.id === 'mix') {
        const keys = Object.keys(verb.forms).filter(k => k !== 'dictionary');
        targetKey = keys[Math.floor(Math.random() * keys.length)];
      }

      // 檢查動詞是否有該形態
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
  }, [mode, generateDistractors]); // 依賴 mode 和 generateDistractors

  // 計時器邏輯
  useEffect(() => {
    if (showResult || !questions.length || !currentQ) return;
    
    if (timeLeft <= 0) {
      handleAnswer(null); // 超時
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, questions, qIndex]);

  const handleAnswer = (option) => {
    if (selectedOption !== null) return; 
    setSelectedOption(option);
    setShowResult(true);

    const isCorrect = option === currentQ.correct;
    if (isCorrect) {
      setScore(prev => prev + 10 + Math.ceil(timeLeft * 2)); // 剩餘時間加分，強調速度
    }

    // 延遲進入下一題或結算
    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowResult(false);
        setTimeLeft(10);
      } else {
        onFinish(score + (isCorrect ? 10 : 0));
      }
    }, 2500); // 2.5秒給使用者看例句
  };

  if (questions.length === 0) return <div className="p-10 text-center">Loading Questions...</div>;

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
            {/* 收藏按鈕 (位於題目上方) */}
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

          {/* 結果反饋區 (遮罩) */}
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
                
                {/* 這是最關鍵的部分：顯示例句 (Contextual Learning) */}
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

// --- 畫面 3: 結算 (Summary) ---
function SummaryScreen({ score, mode, onHome, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center animate-in slide-in-from-bottom duration-500">
      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-500/40">
        <Trophy size={48} className="text-white" />
      </div>
      
      <h2 className="text-4xl font-black text-white mb-2">訓練完成！</h2>
      <p className="text-slate-400 mb-8">模式：{mode.label}</p>

      <div className="bg-slate-800 w-full rounded-2xl p-8 mb-8 border border-slate-700">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">總得分 (Total Score)</p>
        <p className="text-7xl font-black text-white">{score}</p>
      </div>
      
      {/* Paywall 提醒區：高黏著度與被動收入的關鍵 */}
      <div className="bg-indigo-900/40 border border-indigo-700 w-full rounded-xl p-4 mb-8">
        <p className="text-sm font-semibold text-indigo-300 flex items-center gap-2 justify-center">
            <Zap size={18} className='text-indigo-400 fill-indigo-400'/>
            PRO 升級提醒
        </p>
        <p className="text-xs text-indigo-200 mt-1">
            訂閱即可解鎖「錯題特訓菜單」，專門強化您這次訓練中的所有錯誤動詞！
        </p>
      </div>

      <div className="flex gap-4 w-full">
        <button onClick={onHome} className="flex-1 py-4 rounded-xl font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 transition-colors">
          回主選單
        </button>
        <button onClick={onRetry} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95 flex items-center justify-center gap-2">
          <RotateCcw size={18} />
          再訓練一次
        </button>
      </div>
    </div>
  );
}

// --- 畫面 4: 字典 (Dictionary) ---
function DictionaryScreen({ onBack, favorites, toggleFavorite }) {
  const [filter, setFilter] = useState('');

  const filteredData = VERB_DATA.filter(v => 
    v.kanji.includes(filter) || v.meaning.includes(filter) || v.hiragana.includes(filter)
  );

  return (
    <div className="flex flex-col h-screen bg-slate-950">
      <div className="p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
           <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white"><ChevronRight className="rotate-180"/></button>
           <h2 className="text-xl font-bold text-white">動詞字典 (Verb Dictionary)</h2>
        </div>
        <input 
          type="text" 
          placeholder="搜尋動詞 (漢字/平假名/意思)..." 
          className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {filteredData.map(verb => (
          <div key={verb.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-3xl font-bold text-white">{verb.kanji}</h3>
                <p className="text-slate-500 text-lg">{verb.hiragana} • {verb.meaning}</p>
              </div>
              <div className='flex flex-col items-end gap-1'>
                 <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
                   {verb.group}
                 </span>
                 {/* 收藏按鈕 */}
                 <button 
                    onClick={() => toggleFavorite(verb.id)}
                    className={`mt-2 p-1 rounded-full transition-colors ${favorites[verb.id] ? 'text-red-500' : 'text-slate-500 hover:text-white'}`}
                >
                    <Star size={20} fill={favorites[verb.id] ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className='text-xs font-bold text-slate-500 uppercase mt-4'>變化形與例句 (Conjugations)</p>
              {Object.keys(verb.forms).filter(k => k !== 'dictionary').map(key => (
                  <FormRow key={key} label={MODES.find(m => m.id === key)?.label || key.toUpperCase()} data={verb.forms[key]} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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