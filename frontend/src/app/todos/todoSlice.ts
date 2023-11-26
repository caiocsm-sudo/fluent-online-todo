import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  title: string;
  description: string;
  progress: number;
}

const initialState: Todo = {
  id: "",
  title: "",
  description: "",
  progress: 50,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setEditingTodo: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.progress = action.payload.progress;
    },
  },
});

export const { setEditingTodo } = todoSlice.actions;

export default todoSlice.reducer;
