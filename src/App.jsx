import React, { useState, useEffect, useCallback } from 'react';

import MenuScreen from './components/MenuScreen';
import QuizScreen from './components/QuizScreen';
import SummaryScreen from './components/SummaryScreen';
import DictionaryScreen from './components/DictionaryScreen';
import { initializeFirebase } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore'; 


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
  
  // Firestore 路徑常量
  const USER_DATA_COLLECTION = 'user_config';
  const CONFIG_DOCUMENT_ID = 'data';

  // 1. Firebase 初始化與認證
  useEffect(() => {
    // 呼叫 Service 層
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

      const favRef = doc(
        firebaseServices.db, 
        'artifacts', firebaseServices.appId, 
        'users', userId, 
        USER_DATA_COLLECTION, CONFIG_DOCUMENT_ID
      );

      const unsubFav = onSnapshot(favRef, (docSnap) => {
          if (docSnap.exists()) {
              setFavorites(docSnap.data().verbs || {});
              setStreak(docSnap.data().streak || 0);
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
  }, [firebaseServices.db, userId, firebaseServices.appId, favorites]);

  // 4. 更新 Streak 邏輯
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

  const renderScreen = () => {
    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-950">
                <p className="text-white text-lg animate-pulse">
                    正在連接健身房資料庫...
                </p>
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