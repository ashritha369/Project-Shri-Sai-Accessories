import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";

// Middleware configuration
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);
//
export const store = configureStore({
  reducer: rootReducer,
  //   middleware: middleWares,
});
