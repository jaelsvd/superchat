import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';
import * as React from "react";

const firebaseConfig = {
    apiKey: "AIzaSyC0W4kBq3_KPYe7LRPEc6putbx52K7cWhs",
    authDomain: "my-portfolio-jl.firebaseapp.com",
    projectId: "my-portfolio-jl",
    storageBucket: "my-portfolio-jl.firebasestorage.app",
    messagingSenderId: "986157314830",
    appId: "1:986157314830:web:c2215c0dd4dd2eaa3f9d5f",
    measurementId: "G-8P8ZV2GXCK"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();

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
    console.log('messagesRef',messagesRef);
    const q = query(messagesRef, orderBy('createdAt'), limit(25));

    const [messages] = useCollectionData(q);    
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
debugger;
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
                    messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
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
