import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import todoReducer from "./todos/todoSlice";

const RootReducers = combineReducers({
  user: userReducer,
  todo: todoReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});

export type UserReducer = ReturnType<typeof RootReducers>;
