import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {useCollectionData} from "react-firebase-hooks/firestore";
import ChatMessage from "../chat-message/ChatMessage.tsx";

export default function ChatRoom() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    
    const [messages] = useCollectionData(query, { idField: 'id' });
    return(
        <>
            <div>
                { messages && messages.map(msg => <ChatMessage key={"id"} message={"message"}/>)}
            </div>
        </>
    );
};