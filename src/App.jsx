import React, { useState, useEffect, useCallback } from 'react';
import { Crown, Video, Zap } from 'lucide-react';

import MenuScreen from './components/MenuScreen';
import QuizScreen from './components/QuizScreen';
import SummaryScreen from './components/SummaryScreen';
import DictionaryScreen from './components/DictionaryScreen';
import { initializeFirebase } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore'; 

export default function App() {
  const [screen, setScreen] = useState('menu'); 
  const [selectedMode, setSelectedMode] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  // --- 商業邏輯狀態 ---
  const [isPro, setIsPro] = useState(false); 
  const [selectedLevels, setSelectedLevels] = useState(['N5']); 
  
  // --- 收藏限制邏輯 ---
  const [maxFavorites, setMaxFavorites] = useState(5); 
  const [showLimitModal, setShowLimitModal] = useState(false); 

  // --- Firestore 狀態 ---
  const [firebaseServices, setFirebaseServices] = useState({ db: null, auth: null, appId: null });
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [favorites, setFavorites] = useState({}); 
  const [streak, setStreak] = useState(0); 
  
  const USER_DATA_COLLECTION = 'user_config';
  const CONFIG_DOCUMENT_ID = 'data';

  // 1. Firebase 初始化
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

  // 2. Firestore 數據監聽 (讀取 Pro 狀態)
  useEffect(() => {
      if (!firebaseServices.db || !userId) return;

      const favRef = doc(
        firebaseServices.db, 
        'artifacts', firebaseServices.appId, 
        'users', userId, 
        USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID
      );

      const unsubFav = onSnapshot(favRef, (docSnap) => {
          if (docSnap.exists()) {
              const data = docSnap.data();
              setFavorites(data.verbs || {});
              setStreak(data.streak || 0);
              if (data.maxFavorites) setMaxFavorites(data.maxFavorites);
              
              // --- 新增：讀取 Pro 狀態 ---
              if (data.isPro) {
                  setIsPro(true);
                  // 如果是 Pro，自動解鎖所有等級
                  setSelectedLevels(['N5', 'N4', 'N3', 'N2', 'N1']);
              }
          } else {
              setFavorites({});
              setStreak(0);
              setMaxFavorites(5);
              setIsPro(false);
          }
      }, (error) => {
          console.error("Error listening to user data:", error);
      });

      return () => unsubFav();
  }, [firebaseServices.db, userId, firebaseServices.appId]);
  
  // 3. 收藏切換邏輯
  const toggleFavorite = useCallback(async (verbId) => {
      if (!firebaseServices.db || !userId) return;
      
      const isAdding = !favorites[verbId];
      const currentCount = Object.keys(favorites).length;

      if (isAdding && !isPro && currentCount >= maxFavorites) {
          setShowLimitModal(true); 
          return; 
      }

      const newFavorites = { ...favorites };
      if (newFavorites[verbId]) {
          delete newFavorites[verbId]; 
      } else {
          newFavorites[verbId] = true; 
      }

      const favRef = doc(
        firebaseServices.db, 
        'artifacts', firebaseServices.appId, 
        'users', userId, 
        USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID
      );

      try {
          await setDoc(favRef, { verbs: newFavorites }, { merge: true });
          setFavorites(newFavorites);
      } catch (error) {
          console.error("Failed to update favorite:", error);
      }
  }, [firebaseServices.db, userId, firebaseServices.appId, favorites, isPro, maxFavorites]);

  // 4. 更新 Streak
  const updateStreak = useCallback(async (newStreak) => {
    if (!firebaseServices.db || !userId) return;
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

  // --- 廣告與升級處理 ---
  
  // 升級 PRO (寫入 Firestore)
  const handleUpgrade = async () => {
    if (!firebaseServices.db || !userId) {
        alert("請先連線網路");
        return;
    }

    // 實際開發這裡會先呼叫金流 API，成功後才執行以下程式碼
    const favRef = doc(
      firebaseServices.db, 
      'artifacts', firebaseServices.appId, 
      'users', userId, 
      USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID
    );

    try {
        // --- 核心修改：將 isPro: true 寫入資料庫 ---
        await setDoc(favRef, { isPro: true }, { merge: true });
        
        alert("模擬：付款成功！Pro 資格已綁定此裝置。");
        // 本地狀態會由上面的 onSnapshot 自動更新，不需要手動 setIsPro(true)
        setShowLimitModal(false);
    } catch (error) {
        console.error("Upgrade failed:", error);
        alert("升級失敗，請稍後再試");
    }
  };

  const handleWatchAdForSlots = async () => {
      if (!firebaseServices.db || !userId) {
          alert("請先連線網路");
          return;
      }
      alert("模擬：廣告播放完畢！獲得 +5 收藏空間");
      const newMax = maxFavorites + 5;
      const favRef = doc(
        firebaseServices.db, 
        'artifacts', firebaseServices.appId, 
        'users', userId, 
        USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID
      );
      try {
          await setDoc(favRef, { maxFavorites: newMax }, { merge: true });
          setShowLimitModal(false); 
      } catch (error) {
          console.error("Failed to expand slots:", error);
      }
  };

  const handleWatchAd = () => {
    alert("模擬：廣告播放中... (觀看完畢獲得本次體驗)");
    setScreen('quiz');
  };

  const renderScreen = () => {
    if (!isAuthReady) {
        return <div className="flex items-center justify-center h-screen bg-slate-950 text-white animate-pulse">連線中...</div>;
    }

    switch(screen) {
      case 'menu': return <MenuScreen 
        onStart={(mode) => { setSelectedMode(mode); setScreen('quiz'); }} 
        onDict={() => setScreen('dictionary')}
        streak={streak} 
        userId={userId}
        isPro={isPro}
        onUpgrade={handleUpgrade}
        onWatchAd={handleWatchAd}
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
      />;
      case 'quiz': return <QuizScreen 
        mode={selectedMode} 
        onFinish={(score) => { setFinalScore(score); setScreen('summary'); updateStreak(streak + 1); }} 
        onExit={() => setScreen('menu')}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        selectedLevels={selectedLevels}
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
        isPro={isPro}
        maxFavorites={maxFavorites}
        onWatchAdForSlots={handleWatchAdForSlots}
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
        onUpgrade={handleUpgrade}
      />;
      default: return <MenuScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-slate-900 border-x border-slate-800">
        {renderScreen()}
        
        {/* 收藏額度不足彈窗 */}
        {showLimitModal && (
            <div className="absolute inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 border-t sm:border border-slate-700 shadow-2xl">
                  <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center">
                          <Zap size={32} className="text-indigo-400 fill-indigo-400" />
                      </div>
                  </div>
                  <h2 className="text-2xl font-black text-white text-center mb-2">收藏空間已滿！</h2>
                  <p className="text-slate-400 text-center mb-6 text-sm">
                      您目前的空間 ({maxFavorites}格) 已用完。<br/>
                      請選擇擴充方式：
                  </p>
                  
                  <div className="space-y-3">
                      <button 
                        onClick={handleUpgrade}
                        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-yellow-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
                      >
                          <Crown size={20} className="fill-white"/> 升級 PRO (無限收藏)
                      </button>
                      <button 
                        onClick={handleWatchAdForSlots}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
                      >
                          <Video size={20}/> 看廣告 (+5格 永久空間)
                      </button>
                      <button 
                        onClick={() => setShowLimitModal(false)}
                        className="w-full py-2 text-slate-500 text-sm font-medium hover:text-white"
                      >
                          取消
                      </button>
                  </div>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}