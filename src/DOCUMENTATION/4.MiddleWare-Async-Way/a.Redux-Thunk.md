# Redux-Thunk with example

Alright! Let’s now sweetly unwrap **Redux Thunk** 🍫

---

### Back to our bakery analogy 🍰:

Remember, in Redux:

- You **dispatch actions** (like orders),
- Reducers (chefs 👨‍🍳) take those actions and update the state (inventory).

But what if an order needs **some thinking or waiting** before it can be sent to the chef?

> Example: "Only bake the cake if the customer **confirms the payment** online" 💳

---

### Enter **Redux Thunk** – your **thoughtful delivery person** 🛵💭

- **Thunk** is just a **function that returns another function**.
- It lets you **delay** the dispatching of actions.
- You can **write async logic directly inside your actions**.

---

### What It Does 🍬

Without Thunk:

```js
dispatch({ type: "MAKE_CAKE" });
```

With Thunk:

```js
dispatch((dispatch, getState) => {
  // Think for a while...
  if (getState().payment.confirmed) {
    dispatch({ type: "MAKE_CAKE" });
  }
});
```

So basically, instead of just sending an action, you send a **function** that can:

- Wait ⏳
- Fetch 🛜
- Check conditions ✅
- Then dispatch the real action when ready 💥

---

### Use Case Example 🍫

Let’s say you want to fetch ingredients before baking the cake:

```js
const fetchIngredients = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_INGREDIENTS_START" });

    try {
      const response = await fetch("/api/ingredients");
      const data = await response.json();

      dispatch({ type: "FETCH_INGREDIENTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_INGREDIENTS_FAIL", error });
    }
  };
};
```

---

### TL;DR 🍩

**Redux Thunk** is a simple tool that lets you write **logic inside your action creators**. It's perfect for:

- **Basic async flows**
- Simple conditions
- Making API calls before dispatching

---

| Feature    | Thunk 🧠          | Saga 🤖                               |
| ---------- | ----------------- | ------------------------------------- |
| Complexity | Simple to use     | More powerful                         |
| Code Style | Async/Await       | Generator Functions                   |
| Good for   | Basic async tasks | Complex flows, retries, cancellations |

---

Need help choosing between them or setting one up? I’ve got your back 🍪

# Theoritical Explanation: Redux-Thunk

Absolutely! Let’s start with a **clear explanation** of what Redux Thunk is, then I’ll show you how to write your **own custom version** of it.

---

## 🧠 What is Redux Thunk?

### ✅ Problem Redux Thunk Solves:

By default, **Redux only understands plain JavaScript objects** as actions.

But in real-world apps, you often need to:

- Fetch data from an API
- Wait for a response
- Then dispatch an action **based on the result**

Redux doesn't support async logic **out of the box** — that's where **middleware** like `redux-thunk` comes in.

---

### 💡 Redux Thunk = Middleware that allows you to write **async logic in your action creators**

Normally:

```js
dispatch({ type: "INCREMENT" }); // Sync action
```

With Thunk:

```js
dispatch((dispatch, getState) => {
  // Async logic here
  fetch("/api/user")
    .then((res) => res.json())
    .then((data) => dispatch({ type: "SET_USER", payload: data }));
});
```

So instead of returning an action object, you return a **function** that Redux Thunk can run. That function receives:

- `dispatch`: so you can dispatch more actions
- `getState`: if you need to read current state

---

## 🛠 How to Write a Custom Redux Thunk Middleware

Here’s a minimal version:

```js
const customThunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // If the action is a function, call it with dispatch and getState
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    // Otherwise, pass the action to the next middleware / reducer
    return next(action);
  };
```

### ✅ Usage

Replace your middleware import:

```js
// import { thunk } from "redux-thunk"; ❌ remove this

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  customThunk, // ✅ use your custom thunk
].filter(Boolean);
```

That’s it! Now your Redux setup behaves the same as with `redux-thunk`.

---

Let me know if you'd like to expand this to:

- Handle async/await instead of `.then`
- Add `withExtraArgument`
- Include error boundaries/logging

Happy to help you power it up 🚀
