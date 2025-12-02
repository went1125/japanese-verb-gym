// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Video, Zap, BatteryCharging, X } from 'lucide-react';

import MenuScreen from './components/MenuScreen';
import QuizScreen from './components/QuizScreen';
import SummaryScreen from './components/SummaryScreen';
import DictionaryScreen from './components/DictionaryScreen';
import MistakeScreen from './components/MistakeScreen';
import { initializeFirebase } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot, deleteField } from 'firebase/firestore'; 

// --- 模擬激勵廣告 (Rewarded Ad) ---
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
            <p className="text-slate-400 text-sm">這是模擬廣告 (AdMob)</p>
        </div>
    </div>
  );
};

// --- 新增：模擬底部橫幅廣告 (Banner Ad) ---
const BottomBannerAd = () => {
    // 實際上線時，這裡會放 AdMob 的 Banner Component
    return (
        <div className="w-full h-[60px] bg-slate-800 border-t border-slate-700 flex items-center justify-center relative shrink-0">
            <div className="text-slate-500 text-xs font-mono tracking-widest flex items-center gap-2">
                <span className="bg-slate-700 px-1 rounded">AD</span>
                Google AdMob Banner Area
            </div>
        </div>
    );
};

export default function App() {
  const [screen, setScreen] = useState('menu'); 
  const [selectedMode, setSelectedMode] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  // 篩選狀態 (全開放，但無 Pro 狀態)
  const [selectedLevels, setSelectedLevels] = useState(['N5']); 
  
  // 體力與集點系統
  const [credits, setCredits] = useState(3); 
  const [points, setPoints] = useState(0); 
  
  // UI 狀態
  const [showAdOverlay, setShowAdOverlay] = useState(false); 
  const [showCreditModal, setShowCreditModal] = useState(false); 
  const [maxFavorites, setMaxFavorites] = useState(10); 
  const [showLimitModal, setShowLimitModal] = useState(false); 
  const [adType, setAdType] = useState(null); // 'credit' | 'slot' 用來區分廣告獎勵類型

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
              setCredits(data.credits !== undefined ? data.credits : 3);
              setPoints(data.points || 0); 
              if (data.maxFavorites) setMaxFavorites(data.maxFavorites);
          } else {
              setFavorites({}); setMistakes({}); setCredits(3); setPoints(0); setMaxFavorites(10);
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

  // Actions
  const toggleFavorite = (verbId) => {
      const isAdding = !favorites[verbId];
      // 永遠檢查上限 (因為沒有 Pro 了)
      if (isAdding && Object.keys(favorites).length >= maxFavorites) {
          setShowLimitModal(true); return; 
      }
      updateUserData({ verbs: { [verbId]: isAdding ? true : deleteField() } });
  };

  const toggleMistake = (verbId) => {
      const isAdding = !mistakes[verbId];
      updateUserData({ mistakes: { [verbId]: isAdding ? true : deleteField() } });
  };

  const handleStartQuiz = (mode) => {
      if (credits > 0) {
          updateUserData({ credits: credits - 1 }); 
          setSelectedMode(mode); setScreen('quiz');
      } else {
          setShowCreditModal(true);
      }
  };

  const handleQuizFinish = (score) => {
      setFinalScore(score);
      setScreen('summary');
      updateUserData({ points: points + 1 });
  };

  const handleRedeemPoints = () => {
      if (points >= 5) {
          updateUserData({ points: points - 5, credits: credits + 1 });
          alert("兌換成功！體力 +1");
      } else {
          alert("積分不足 5 點");
      }
  };

  // 統一處理廣告獎勵
  const handleAdComplete = () => {
      if (adType === 'credit') {
          updateUserData({ credits: credits + 1 });
          alert(`獲得 1 次訓練機會！`);
      } else if (adType === 'slot') {
          updateUserData({ maxFavorites: maxFavorites + 5 });
          alert("收藏空間已擴充 +5！");
      }
      setAdType(null);
  };

  const triggerAd = (type) => {
      setAdType(type);
      setShowCreditModal(false);
      setShowLimitModal(false);
      setShowAdOverlay(true);
  };

  const renderScreen = () => {
    if (!isAuthReady) return <div className="flex items-center justify-center h-screen bg-slate-950 text-white animate-pulse">連線中...</div>;

    switch(screen) {
      case 'menu': return <MenuScreen 
        onStart={handleStartQuiz} 
        onDict={() => setScreen('dictionary')}
        onMistakes={() => setScreen('mistakes')} 
        userId={userId} 
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
        maxFavorites={maxFavorites} 
        onWatchAdForSlots={() => triggerAd('slot')}
        selectedLevels={selectedLevels} setSelectedLevels={setSelectedLevels} 
      />;
      default: return <MenuScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 relative shadow-2xl bg-slate-900 border-x border-slate-800 flex flex-col">
        {/* 主要內容區 */}
        <div className="flex-1 relative overflow-hidden">
            {renderScreen()}
        </div>

        {/* 底部 Banner 廣告 (全域顯示) */}
        <BottomBannerAd />
        
        {/* 全螢幕覆蓋層 */}
        {showAdOverlay && <MockAdOverlay onReward={handleAdComplete} onClose={() => setShowAdOverlay(false)} />}
        
        {showCreditModal && (
            <div className="absolute inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 border-t sm:border border-slate-700 shadow-2xl pb-20"> {/* pb-20 for banner */}
                  <div className="flex justify-center mb-4"><div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center"><BatteryCharging size={32} className="text-red-500" /></div></div>
                  <h2 className="text-2xl font-black text-white text-center mb-2">訓練次數不足</h2>
                  <p className="text-slate-400 text-center mb-6 text-sm">您的體力已用盡。<br/>看廣告立即恢復，繼續特訓！</p>
                  <div className="space-y-3">
                      <button onClick={() => triggerAd('credit')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"><Video size={20}/> 看廣告 (+1 次)</button>
                      <button onClick={() => setShowCreditModal(false)} className="w-full py-2 text-slate-500 text-sm font-medium hover:text-white">稍後再說</button>
                  </div>
              </div>
            </div>
        )}
        
        {showLimitModal && (
             <div className="absolute inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 border-t sm:border border-slate-700 shadow-2xl pb-20">
                 <div className="flex justify-center mb-4"><div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center"><Zap size={32} className="text-indigo-400 fill-indigo-400" /></div></div>
                 <h2 className="text-2xl font-black text-white text-center mb-2">收藏空間已滿</h2>
                 <p className="text-slate-400 text-center mb-6 text-sm">您目前的空間 ({maxFavorites}格) 已用完。<br/>看廣告可永久擴充空間！</p>
                 <div className="space-y-3">
                     <button onClick={() => triggerAd('slot')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"><Video size={20}/> 看廣告 (+5格 永久空間)</button>
                     <button onClick={() => setShowLimitModal(false)} className="w-full py-2 text-slate-500 text-sm font-medium hover:text-white">取消</button>
                 </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}