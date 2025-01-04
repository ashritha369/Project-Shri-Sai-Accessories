import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// Middleware configuration
const middleWares = [logger];

// Composing enhancers
const composedEnhancers = compose(applyMiddleware(...middleWares));

// Create the store
export const store = createStore(rootReducer, undefined, composedEnhancers);
