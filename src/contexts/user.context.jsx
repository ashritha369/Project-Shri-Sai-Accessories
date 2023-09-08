import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//actual functional component
// here children will be the one which comes under UserProvider,in this case when we import this under index.js like this <UserProvider><App/><UserProvider/> 'App' will be the children component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    //' onAuthStateChangedListener ' is the callback that will be received in firebase util.js export fun as second parameter
    const unsubscribe = onAuthStateChangedListener( (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
