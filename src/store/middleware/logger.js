//below we used concept of chained curry  functions in 'loggerMiddleware'
/*
In JavaScript, currying is a functional programming 
concept where a function doesn't take all its arguments
at once but instead returns a series of functions
that each take one argument.
*/
export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState:", store.getState());
  next(action);
  console.log(`next State`, store.getState());
};
