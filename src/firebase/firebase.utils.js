import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBGLHa2MdbWUaQnY2OPGXt2TeEqbIq8s4k",
    authDomain: "crwn-db-824fb.firebaseapp.com",
    projectId: "crwn-db-824fb",
    storageBucket: "crwn-db-824fb.appspot.com",
    messagingSenderId: "711040064516",
    appId: "1:711040064516:web:19df9a2df1fd6d54f1a951"
}

initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ params: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
