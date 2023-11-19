import { createSlice } from "@reduxjs/toolkit";
import User from "./interface/userStateInterface";

const initialState: User = {
  username: null,
  user_image: null,
  user_email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (!state.user_email && !state.username) {
        state.user_email = action.payload.email;
        state.username = action.payload.username;
      }
    },
    addUserImage: (state, action) => {
      if (state.user_email) {
        state.user_image = action.payload.user_image;
      }
    }
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
