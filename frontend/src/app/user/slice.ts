import { createSlice } from "@reduxjs/toolkit";
import User from "./interface/userStateInterface";

const initialState: User = {
  username: null,
  user_image: null,
  user_email: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (!state.user_email) {
        state.user_email = action.payload.email;
        state.token = action.payload.token;
      }
    },
  },
});
