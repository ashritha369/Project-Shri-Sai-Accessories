import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    // below are actions, setCurrentUser is an action
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

/*
| Part                | What it is                         | Purpose                                       |
| ------------------- | ---------------------------------- | --------------------------------------------- |
| `userSlice.actions` | All action creators from the slice | Used to **dispatch** actions                  |
| `userSlice.reducer` | The reducer function               | Used to **handle those actions** in the store |

*/
