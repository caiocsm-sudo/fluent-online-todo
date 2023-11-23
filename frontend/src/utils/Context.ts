/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch, SetStateAction, createContext } from "react";

import TodoListInterface from "./TodoListInterface";

export type Todo = {
  id: string | undefined,
  title: string | undefined,
  description: string | undefined,
  progress: number | undefined,
}

export interface Context {
  todos: TodoListInterface[] | Array<never>;
  getData: () => Promise<void>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>
}

// export interface Edit {
//   todo: Todo
// }

const EditContext = createContext<Todo | undefined>(undefined);

const StateUpdatersContext = createContext<Context | undefined | any>(
  undefined
);

export { EditContext, StateUpdatersContext };

