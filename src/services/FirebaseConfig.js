// src/services/FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD0c83Y6Db3tfk-t3eo32Wm1TNEu_ADrqg",
    authDomain: "diarioactividades-e47a0.firebaseapp.com",
    projectId: "diarioactividades-e47a0",
    storageBucket: "diarioactividades-e47a0.firebasestorage.app",
    messagingSenderId: "132456625130",
    appId: "1:132456625130:web:d7d88bed7071a7d2e8f893"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
// Inicializa Auth con persistencia
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);