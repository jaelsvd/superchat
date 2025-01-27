import './App.css'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firabase.initializeApp({
    apiKey: "AIzaSyC0W4kBq3_KPYe7LRPEc6putbx52K7cWhs",
    authDomain: "my-portfolio-jl.firebaseapp.com",
    projectId: "my-portfolio-jl",
    storageBucket: "my-portfolio-jl.firebasestorage.app",
    messagingSenderId: "986157314830",
    appId: "1:986157314830:web:c2215c0dd4dd2eaa3f9d5f",
    measurementId: "G-8P8ZV2GXCK"
});

const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {

  return (
    <div className="App">
        <header className={"App-header"}>
            
        </header>
    </div>
  )
}

export default App
