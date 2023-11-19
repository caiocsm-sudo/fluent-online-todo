/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, createContext } from "react";

import { Avatar, Divider, Button } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import styles from "./css/MainPanel.module.css";

import TodoList from "./TodoList";
import Modal from "./Modal";
import TodoListInterface from "../utils/TodoListInterface";
import { Context } from "../utils/Context";

// only imported because of getData function
import axios from "axios";

// Why is it undefined? Don't remember
const StateUpdatersContext = createContext<Context | undefined | any>(
  undefined
);

export const MainPanel = () => {

  // higher level of abstraction = make it global with useContext instead of Redux
  // at least, i think it's better for this type of data.

  // States
  const [todos, setTodos] = useState<TodoListInterface[] | Array<any>>([]);
  const [mode, setMode] = useState<"create" | "edit" | undefined>();
  const [visible, setVisible] = useState<boolean>(false);
  // States

  // test email later substituted by Redux user_email variable;
  const userEmail = "porracara@gmail.com";

  const getData = async () => {
    // maybe it's kind of an authorization that is happening here, i'm sending the user
    // email to authorize the server getting the user's created todos

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
    setMode("create");
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

      {/* Context -> Todos, getData, setVisible */}
      <StateUpdatersContext.Provider
        value={{ todos, getData, visible, setVisible, mode, setMode }}
      >
        {/* The problem is in this mode="create" */}
        {visible && <Modal />}
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
