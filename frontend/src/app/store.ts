import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({ 
  user: undefined,
  reducer: () => {
    console.log('internal pointer variable');
  }
 });
