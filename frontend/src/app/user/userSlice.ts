import { createSlice } from "@reduxjs/toolkit";
import User from "./interface/userStateInterface";

const initialState: User = {
  id: null,
  username: null,
  user_image: null,
  user_email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("action payload below");
      console.log(action.payload);
      state.user_email = action.payload.user_email;
      state.username = action.payload.username;
      state.id = action.payload.id;

      console.log("state below");
      console.log(state.user_email, state.username);

      return state;
    },
    addUserImage: (state, action) => {
      if (state.user_email) {
        state.user_image = action.payload.user_image;
      }
    },
    logOutUser: (state) => {
      state.user_email = null;
      state.id = null;
      state.username = null;
      state.user_image = null;

      return state;
    },
  },
});

export const { addUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
