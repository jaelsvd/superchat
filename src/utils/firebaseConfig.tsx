import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0W4kBq3_KPYe7LRPEc6putbx52K7cWhs",
    authDomain: "my-portfolio-jl.firebaseapp.com",
    projectId: "my-portfolio-jl",
    storageBucket: "my-portfolio-jl.firebasestorage.app",
    messagingSenderId: "986157314830",
    appId: "1:986157314830:web:c2215c0dd4dd2eaa3f9d5f",
    measurementId: "G-8P8ZV2GXCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
