import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  id: null,
  username: null,
  email: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { id, username, email } = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
    },
    changeAuth: (state, action) => {
      const { isAuthenticated } = action.payload;
      state.isAuthenticated = isAuthenticated;

    }
  },
});

export const { addUser, changeAuth } = userSlice.actions;
export default userSlice.reducer;
