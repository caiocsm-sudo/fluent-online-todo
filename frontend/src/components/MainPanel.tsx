import {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./css/MainPanel.module.css";
import TodoList from "./TodoList";
import TodoListInterface from "../utils/TodoListInterface";
import Modal from "./Modal";

import { Avatar, Divider, Button } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";

import axios from "axios";

type Context = {
  todos: TodoListInterface[] | Array<never>;
  getData: () => Promise<void>;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const StateUpdatersContext = createContext<Context | undefined>(undefined);

export const MainPanel = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todos, setTodos] = useState<TodoListInterface[] | Array<any>>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const userEmail = "porracara@gmail.com";

  const getData = async () => {
    const res = await axios.get("http://localhost:8000/todos/" + userEmail);

    if (Array.isArray(res.data.data)) {
      const data = res.data.data;
      setTodos(data);
    } else {
      setTodos([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddTodos = () => {
    setVisible(!visible);
  };

  return (
    <section className={styles["todo-container"]}>
      <div className={styles["todo-header"]}>
        <div>
          <Avatar initials={"MG"} color="magenta" size={32} />
          <h2 className={styles["todo-title"]}>Minecraft Guerra</h2>
        </div>
        <div className={styles["todo-options"]}>
          <Button icon={<AddRegular />} onClick={handleAddTodos} />
        </div>
      </div>
      <Divider />

      <StateUpdatersContext.Provider value={{ todos, getData, setVisible }}>
        {visible && <Modal mode="create" />}
        <div className={styles["todo-tasks"]}>
          <ul className={styles["todo-list"]}>
            {todos &&
              todos.map((todo) => {
                return (
                  <TodoList
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    progress={todo.progress}
                    todo={todo}
                    getData={getData}
                  />
                );
              })}
          </ul>
        </div>
      </StateUpdatersContext.Provider>
    </section>
  );
};

export { StateUpdatersContext };
