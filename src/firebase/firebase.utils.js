import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBGLHa2MdbWUaQnY2OPGXt2TeEqbIq8s4k",
    authDomain: "crwn-db-824fb.firebaseapp.com",
    projectId: "crwn-db-824fb",
    storageBucket: "crwn-db-824fb.appspot.com",
    messagingSenderId: "711040064516",
    appId: "1:711040064516:web:19df9a2df1fd6d54f1a951"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    //console.log(userAuth);
    // console.log(doc(firestore, `users/${userAuth.uid}`));
    //const userRef = doc(firestore, `users/12345`);
    const userRef = doc(firestore, `users/${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    console.log('snapshot:', snapShot);
    console.log('exists? :', snapShot.exists());

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        console.log('userName' + displayName);
        console.log('email' + email);
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ params: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
