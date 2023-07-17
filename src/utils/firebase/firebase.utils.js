import {initializeApp} from 'firebase/app'
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';

const apiKey = process.env.API_KEY;
const appId = process.env.APP_ID;

console.log(apiKey)
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "shri-sai-accessories-db.firebaseapp.com",
    projectId: "shri-sai-accessories-db",
    storageBucket: "shri-sai-accessories-db.appspot.com",
    messagingSenderId: "21155926719",
    appId: appId
  };
  
  //Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
  const provider=new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt:"select_account"
  })
  
  export const auth=getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);