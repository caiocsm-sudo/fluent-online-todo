import { Dispatch, SetStateAction } from "react";

import TodoListInterface from "./TodoListInterface";

export interface Context {
  todos: TodoListInterface[] | Array<never>;
  getData: () => Promise<void>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>
}
