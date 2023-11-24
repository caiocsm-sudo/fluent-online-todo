import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

const RootReducers = combineReducers({
  user: userReducer
});

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type UserReducer = ReturnType<typeof RootReducers>
