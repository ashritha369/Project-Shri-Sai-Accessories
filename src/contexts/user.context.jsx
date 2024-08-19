import { createContext, useEffect, useReducer } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// we use reducer instead of use-state to store the values
const userReducer = (state, action) => {
  console.log(`dispatched`);
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  // INSTEAD OF USING USESTATE, WE ARE USING REDUCER

  //<<<<<<<<<<<<<<<<< USAGE OF REDUCER>>>>>>>>>>>>>>>>
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);
  // destructuring state
  //const { currentUser } = state;
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };
  // <<<<<<<<<<<<<<<<< USAGE OF REDUCER>>>>>>>>>>>>>>>>
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    //' onAuthStateChangedListener ' is the callback that will be received in firebase util.js export fun as second parameter
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        //this 'user' is coming from 'createUserDocumentFromAuth' i.e from firebase utils
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
