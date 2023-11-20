/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch, SetStateAction, createContext } from "react";

import TodoListInterface from "./TodoListInterface";

type Todo = {
  id: string | undefined,
  title: string,
  description: string,
  progress: number | string,
}

export interface Context {
  todos: TodoListInterface[] | Array<never>;
  getData: () => Promise<void>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>
}

export interface Edit {
  todo: Todo
}

const EditContext = createContext<Edit | undefined>(undefined);

const StateUpdatersContext = createContext<Context | undefined | any>(
  undefined
);

export { EditContext, StateUpdatersContext };

