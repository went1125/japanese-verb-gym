import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore'; 

export const initializeFirebase = () => {
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