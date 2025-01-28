import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';
import * as React from "react";

const firebaseConfig = {
    apiKey: "AIzaSyCbFzLzkoIfccbBNjJWcrHo3ULi6RbeyFg",
    authDomain: "jael-chat.firebaseapp.com",
    projectId: "jael-chat",
    storageBucket: "jael-chat.firebasestorage.app",
    messagingSenderId: "331430286969",
    appId: "1:331430286969:web:f1c42391ad017424b6e6a8",
    measurementId: "G-QYXRXHDV97"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
//const db = getFirestore(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>
                <h1>⚛️🔥💬</h1>
                <SignOut />
            </header>

            <section>
                {user ? <ChatRoom /> : <SignIn />}
            </section>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error during Google sign-in: ', error);
        }
    };

    return (
        <>
            <button className="sign-in" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
        </>
    );
}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => signOut(auth)}>
            Sign Out
        </button>
    );
}

function ChatRoom() {
    const dummy = useRef<null | HTMLDivElement>(null);
    
     const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'), limit(25));
    const [messages] = useCollectionData(q);    
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser!; // `auth.currentUser!` is safe here, but you may want to handle it better in production.

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL,
        });

        setFormValue('');
        // Scroll to the bottom of the chat room
        dummy.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <main>
                {messages &&
                messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
                <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="Say something nice"
                />
                <button type="submit" disabled={!formValue}>
                    🕊️
                </button>
            </form>
        </>
    );
}

interface ChatMessageProps {
    message: {
        text: string;
        uid: string;
        photoURL: string;
    };
}

function ChatMessage({ message }: ChatMessageProps) {
    const { text, uid, photoURL } = message;
    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img
                src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}
                alt="User avatar"
            />
            <p>{text}</p>
        </div>
    );
}

export default App;
