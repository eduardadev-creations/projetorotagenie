import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    initializeFirestore,
    persistentLocalCache
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCOj3Eb5VoLR7EhikRrJ601hizocpFmtkw",
    authDomain: "jf-distribuidora-13be0.firebaseapp.com",
    projectId: "jf-distribuidora-13be0",
    storageBucket: "jf-distribuidora-13be0.firebasestorage.app",
    messagingSenderId: "372816933363",
    appId: "1:372816933363:web:0628152ef69dca5e106286",
    measurementId: "G-JGW8M2YKS6"
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
    localCache: persistentLocalCache()
});