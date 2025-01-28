import firebase from "firebase/compat";
import auth = firebase.auth;

export default function SignIn() {
    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
         auth.signInWithPopup(provider);
    }

    return (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    );
}