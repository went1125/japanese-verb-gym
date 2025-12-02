// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Crown, Video, Zap, BatteryCharging } from 'lucide-react';

import MenuScreen from './components/MenuScreen';
import QuizScreen from './components/QuizScreen';
import SummaryScreen from './components/SummaryScreen';
import DictionaryScreen from './components/DictionaryScreen';
import MistakeScreen from './components/MistakeScreen';
import { initializeFirebase } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// 核心修正：引入 deleteField
import { doc, setDoc, onSnapshot, deleteField } from 'firebase/firestore'; 

// 模擬廣告組件
const MockAdOverlay = ({ onReward, onClose }) => {
  const [timer, setTimer] = useState(5);
  const [canClose, setCanClose] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); setCanClose(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
        <div className="absolute top-4 right-4">
            {canClose ? (
                <button onClick={() => { onReward(); onClose(); }} className="bg-white text-black font-bold px-4 py-2 rounded-full active:scale-95 transition-transform">
                    關閉並領取獎勵 X
                </button>
            ) : (
                <div className="text-slate-400 font-mono border border-slate-700 px-3 py-1 rounded-full">獎勵發放於 {timer}s</div>
            )}
        </div>
        <div className="text-center space-y-4">
            <Video size={64} className="mx-auto text-yellow-400 animate-bounce" />
            <h2 className="text-2xl font-bold">廣告播放中...</h2>
            <p className="text-slate-400 text-sm">模擬廣告</p>
        </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState('menu'); 
  const [selectedMode, setSelectedMode] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  // 商業與篩選
  const [isPro, setIsPro] = useState(false); 
  const [selectedLevels, setSelectedLevels] = useState(['N5']); 
  
  // 體力與集點系統
  const [credits, setCredits] = useState(3); 
  const [points, setPoints] = useState(0); 
  
  // UI 狀態
  const [showAdOverlay, setShowAdOverlay] = useState(false); 
  const [showCreditModal, setShowCreditModal] = useState(false); 
  const [maxFavorites, setMaxFavorites] = useState(10); 
  const [showLimitModal, setShowLimitModal] = useState(false); 

  // Firestore
  const [firebaseServices, setFirebaseServices] = useState({ db: null, auth: null, appId: null });
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [favorites, setFavorites] = useState({}); 
  const [mistakes, setMistakes] = useState({}); 
  
  const USER_DATA_COLLECTION = 'user_config';
  const CONFIG_DOCUMENT_ID = 'data';

  // 1. Init
  useEffect(() => {
    const { db, auth, appId } = initializeFirebase();
    if (auth) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) { setUserId(user.uid); setIsAuthReady(true); } else { setIsAuthReady(true); }
        });
        setFirebaseServices({ db, auth, appId });
        return () => unsubscribe();
    } else { setIsAuthReady(true); }
  }, []);

  // 2. Sync Data
  useEffect(() => {
      if (!firebaseServices.db || !userId) return;
      const userRef = doc(firebaseServices.db, 'artifacts', firebaseServices.appId, 'users', userId, USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID);
      const unsub = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
              const data = docSnap.data();
              setFavorites(data.verbs || {});
              setMistakes(data.mistakes || {});
              if (data.isPro) setIsPro(true);
              setCredits(data.credits !== undefined ? data.credits : 3);
              setPoints(data.points || 0); 
              if (data.maxFavorites) setMaxFavorites(data.maxFavorites);
          } else {
              setFavorites({}); setMistakes({}); setCredits(3); setPoints(0); setIsPro(false); setMaxFavorites(10);
          }
      }, (error) => console.error("Error listening to user data:", error));
      return () => unsub();
  }, [firebaseServices.db, userId, firebaseServices.appId]);
  
  // 3. Helper: Update User Data
  const updateUserData = useCallback(async (newData) => {
    if (!firebaseServices.db || !userId) return;
    const userRef = doc(firebaseServices.db, 'artifacts', firebaseServices.appId, 'users', userId, USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID);
    try { await setDoc(userRef, newData, { merge: true }); } catch (error) { console.error("Failed to update data:", error); }
  }, [firebaseServices.db, userId, firebaseServices.appId]);

  // 4. 收藏切換 (核心修正：使用 deleteField 並只傳送單一異動)
  const toggleFavorite = (verbId) => {
      const isAdding = !favorites[verbId];
      if (isAdding && !isPro && Object.keys(favorites).length >= maxFavorites) {
          setShowLimitModal(true); return; 
      }
      
      // 只傳送要修改的那一個 key，刪除時使用 deleteField()
      updateUserData({ 
          verbs: {
              [verbId]: isAdding ? true : deleteField()
          }
      });
  };

  // 5. 錯題切換 (核心修正：使用 deleteField 並只傳送單一異動)
  const toggleMistake = (verbId) => {
      const isAdding = !mistakes[verbId];
      
      updateUserData({ 
          mistakes: {
              [verbId]: isAdding ? true : deleteField()
          }
      });
  };

  const handleStartQuiz = (mode) => {
      if (isPro) {
          setSelectedMode(mode); setScreen('quiz'); return;
      }
      if (credits > 0) {
          updateUserData({ credits: credits - 1 }); // 入場扣體力
          setSelectedMode(mode); setScreen('quiz');
      } else {
          setShowCreditModal(true);
      }
  };

  // 訓練完成：只加積分
  const handleQuizFinish = (score) => {
      setFinalScore(score);
      setScreen('summary');
      updateUserData({ points: points + 1 });
  };

  // 手動兌換積分
  const handleRedeemPoints = () => {
      if (points >= 5) {
          updateUserData({ 
              points: points - 5, 
              credits: credits + 1 
          });
          alert("兌換成功！體力 +1");
      } else {
          alert("積分不足 5 點");
      }
  };

  const handleAdReward = () => {
      updateUserData({ credits: credits + 1 });
      alert(`獲得 1 次訓練機會！`);
  };

  const handleWatchAdForSlots = () => {
      updateUserData({ maxFavorites: maxFavorites + 5 });
      setShowLimitModal(false);
      alert("收藏空間已擴充 +5！");
  };

  const handleUpgrade = () => {
      updateUserData({ isPro: true });
      alert("升級成功！");
      setShowCreditModal(false); setShowLimitModal(false);
  };

  const renderScreen = () => {
    if (!isAuthReady) return <div className="flex items-center justify-center h-screen bg-slate-950 text-white animate-pulse">連線中...</div>;

    switch(screen) {
      case 'menu': return <MenuScreen 
        onStart={handleStartQuiz} 
        onDict={() => setScreen('dictionary')}
        onMistakes={() => setScreen('mistakes')} 
        userId={userId} isPro={isPro} 
        credits={credits} points={points} 
        onAddCredit={() => setShowCreditModal(true)} 
        onRedeem={handleRedeemPoints} 
        selectedLevels={selectedLevels} setSelectedLevels={setSelectedLevels}
      />;
      case 'mistakes': return <MistakeScreen 
        onBack={() => setScreen('menu')}
        mistakes={mistakes} toggleMistake={toggleMistake}
        onStartTraining={() => handleStartQuiz({ id: 'mistake_review', label: '錯題特訓', desc: '針對弱點強化' })}
      />;
      case 'quiz': return <QuizScreen 
        mode={selectedMode} onFinish={handleQuizFinish} onExit={() => setScreen('menu')}
        favorites={favorites} toggleFavorite={toggleFavorite}
        mistakes={mistakes} toggleMistake={toggleMistake}
        selectedLevels={selectedLevels}
      />;
      case 'summary': return <SummaryScreen 
        score={finalScore} mode={selectedMode} onHome={() => setScreen('menu')} onRetry={() => handleStartQuiz(selectedMode)} 
      />;
      case 'dictionary': return <DictionaryScreen 
        onBack={() => setScreen('menu')} favorites={favorites} toggleFavorite={toggleFavorite} 
        isPro={isPro} maxFavorites={maxFavorites} onWatchAdForSlots={() => { setShowLimitModal(false); setShowAdOverlay(true); }}
        selectedLevels={selectedLevels} setSelectedLevels={setSelectedLevels} onUpgrade={handleUpgrade}
      />;
      default: return <MenuScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-slate-900 border-x border-slate-800">
        {renderScreen()}
        {showAdOverlay && <MockAdOverlay onReward={() => { if (showLimitModal) handleWatchAdForSlots(); else handleAdReward(); }} onClose={() => setShowAdOverlay(false)} />}
        {showCreditModal && (
            <div className="absolute inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 border-t sm:border border-slate-700 shadow-2xl">
                  <div className="flex justify-center mb-4"><div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center"><BatteryCharging size={32} className="text-red-500" /></div></div>
                  <h2 className="text-2xl font-black text-white text-center mb-2">訓練次數不足</h2>
                  <div className="space-y-3 mt-6">
                      <button onClick={() => { setShowCreditModal(false); setShowAdOverlay(true); }} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"><Video size={20}/> 看廣告 (+1 次)</button>
                      <button onClick={handleUpgrade} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"><Crown size={20} className="fill-white"/> 升級 PRO (無限)</button>
                      <button onClick={() => setShowCreditModal(false)} className="w-full py-2 text-slate-500 text-sm font-medium hover:text-white">取消</button>
                  </div>
              </div>
            </div>
        )}
        {showLimitModal && (
             <div className="absolute inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 border-t sm:border border-slate-700 shadow-2xl">
                 <div className="flex justify-center mb-4"><div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center"><Zap size={32} className="text-indigo-400 fill-indigo-400" /></div></div>
                 <h2 className="text-2xl font-black text-white text-center mb-2">收藏空間已滿</h2>
                 <div className="space-y-3 mt-6">
                     <button onClick={handleUpgrade} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"><Crown size={20} className="fill-white"/> 升級 PRO (無限)</button>
                     <button onClick={() => { setShowAdOverlay(true); }} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"><Video size={20}/> 看廣告 (+5格)</button>
                     <button onClick={() => setShowLimitModal(false)} className="w-full py-2 text-slate-500 text-sm font-medium hover:text-white">取消</button>
                 </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}