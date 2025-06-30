import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// Middleware configuration
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);
/*
EXAMPLE OF HOW ABOVE WORKS:
2===3 && {a:'string'}
output: false

[2===3 && {a:'string'}].filter(Boolean)
output: []

[3===3 && {a:'string'}].filter(Boolean)
output: [{...}]
EXPANDING THE OUTPUT GIVES BELOW
>0:{a:'string'}
length:1
>[[Prototype]:Array(0)]

*/
// process.env.NODE_ENV !== "production" means it is in development mode: i.e local mode
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Composing enhancers
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// Create the store
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
