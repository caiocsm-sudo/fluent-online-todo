/*

import { createSlice } from "@reduxjs/toolkit";
import User from "./interface/userStateInterface";

const initialState: User = {
  id: null,
  username: null,
  user_image: null,
  user_email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (!state.user_email && !state.username) {
        state.user_email = action.payload.email;
        state.username = action.payload.username;
        state.id = action.payload.id;
      }
    },
    addUserImage: (state, action) => {
      if (state.user_email) {
        state.user_image = action.payload.user_image;
      }
    },
 },
});

export const { addUser, logOutUser } = userSlice.actions;

export default userSlice.reducers;

*/
