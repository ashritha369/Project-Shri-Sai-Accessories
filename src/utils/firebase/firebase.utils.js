import {initializeApp} from 'firebase/app'
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore';

const apiKey = process.env.REACT_APP_API_KEY;
const appId = process.env.REACT_APP_APP_ID;

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "shri-sai-accessories-db.firebaseapp.com",
    projectId: "shri-sai-accessories-db",
    storageBucket: "shri-sai-accessories-db.appspot.com",
    messagingSenderId: "21155926719",
    appId:appId,
  };
  
  //Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  console.log(firebaseApp);
  
  const provider=new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt:"select_account"
  })
  
  export const auth=getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);
  
  export const db=getFirestore();

  export const createUserDocumentFromAuth=async(userAuth)=>{
    const userDocRef=doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    const userSnapshot=await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
  }

  