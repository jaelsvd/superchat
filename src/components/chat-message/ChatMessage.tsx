import * as React from "react";
import firebase from "firebase/compat";
import auth = firebase.auth;

interface ChatMessageProps {
    text: string;
    uid: string;
    photoURL: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({text, uid, photoURL})=> {
    
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    
    return  (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} alt="profile"/>
            <p>{text}</p>
        </div>
    );
};

export default ChatMessage;