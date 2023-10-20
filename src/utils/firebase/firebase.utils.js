import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const apiKey = process.env.REACT_APP_API_KEY;
const appId = process.env.REACT_APP_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "shri-sai-accessories-db.firebaseapp.com",
  projectId: "shri-sai-accessories-db",
  storageBucket: "shri-sai-accessories-db.appspot.com",
  messagingSenderId: "21155926719",
  appId: appId,
};

//Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

//Below code adds all the datas present inside shop-data.js to cloud 'firestore database' where -->collectionKey (parameter), objectsToAdd(parameter),
// collectionKey=categories(argument), objectsToAdd=SHOP_DATA(argument)
// addCollectionAndDocuments('categories',SHOP_DATA) is been called in products.context inside useEffect
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};
//RE UPLOADED THE DATA FOR CROWNS AND DRESSES
addCollectionAndDocuments("categories", [
  {
    title: "CROWNS+DRESSES",
    items:  [
      {
          id: 17,
          name: "Dark Sapphire Blue Crown with Dress",
          imageUrl: "https://i.ibb.co/FsLZQhJ/crown-with-dress-dark-sapphire-blue.jpg",
          price: 25
        },
        {
          id: 18,
          name: "Green Crown with Dress",
          imageUrl: "https://i.ibb.co/JxsrhW4/crown-with-dress-green.jpg",
          price: 18
        },
        {
          id: 19,
          name: "Sky Blue Crown with Dress",
          imageUrl: "https://i.ibb.co/VLqvrK3/crown-with-dress-sky-blue.jpg",
          price: 35
        },
        {
          id: 20,
          name: "Sapphire Blue Crown with Dress",
          imageUrl: " https://i.ibb.co/qRnn8dY/crown-with-dress-sapphire-blue.jpg",
          price: 25
        },
        {
          id: 21,
          name: "Pink Crown with Dress",
          imageUrl: "https://i.ibb.co/Gkp4swT/crown-with-dress-pink.jpg",
          price: 18
        },
        {
          id: 22,
          name: "Navy Blue Crown with Dress",
          imageUrl: "https://i.ibb.co/g4kJp6r/crown-with-dress-navy-blue.jpg",
          price: 14
        },
        {
          id: 23,
          name: "Purple Crown with Dress",
          imageUrl: "https://i.ibb.co/yqpXPmn/crown-with-dress-purple.jpg",
          price: 18
        },
        {
          id: 24,
          name: "Yellow Crown with Dress",
          imageUrl: "https://i.ibb.co/47snhph/crown-with-dress-yellow.jpg",
          price: 14
        }
    ],
  },
]);
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
  /*
      'categoryMap' is an Object we receive it like below
      Object:{
          crowns: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
          crowns+dresses: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
          dresses: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
          full sets: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
          varmalas: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
          [[Prototype]]: Object
        }
      */
};

/*
{
  crowns:{
    title:"Crowns",
    items:[
      {},
      {}
    ]
  },
  dress:{
    title:"Dress",
    items:[
      {},
      {}
    ]

  }
}
*/
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  /*usually after we check userSnapshot.exists it returns false in console,which means no user data inside firestore collection
    So we a
    re checking for if `!userSnapshot.exists` , means if `no user data is present  in firestore`, returns true, 
    then take the data from userAuth , destructure email and others and setDoc */

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      if (error.code === "auth/wrong-password")
        console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//we are giving callbak to onAuthStateChangedListener
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
