import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//below we used concept of chained curry  functions in 'loggerMiddleware'
/*
In JavaScript, currying is a functional programming 
concept where a function doesn't take all its arguments
at once but instead returns a series of functions
that each take one argument.
*/
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState:", store.getState());
  next(action);
  console.log(`next State`, store.getState());
};
// Middleware configuration
const middleWares = [loggerMiddleware];

// Composing enhancers
const composedEnhancers = compose(applyMiddleware(...middleWares));

// Create the store
export const store = createStore(rootReducer, undefined, composedEnhancers);
