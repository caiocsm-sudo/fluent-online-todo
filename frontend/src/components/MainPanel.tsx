/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

import { Avatar, Divider, Button } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import styles from "./css/MainPanel.module.css";

import TodoList from "./TodoList";
import Modal from "./Modal";
import TodoListInterface from "../utils/TodoListInterface";
import { StateUpdatersContext } from "../utils/Context";
import { UserReducer } from "../app/store";

import axios from "axios";
import { useSelector } from "react-redux";

export const MainPanel = () => {
  const [todos, setTodos] = useState<TodoListInterface[] | Array<any>>([]);
  const [mode, setMode] = useState<"create" | "edit" | undefined>();
  const [visible, setVisible] = useState<boolean>(false);

  const user = useSelector((state: UserReducer) => state.user);

  const userEmail = user.user_email;

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

      <StateUpdatersContext.Provider
        value={{ todos, getData, visible, setVisible, mode, setMode }}
      >
        {visible && mode === "create" && <Modal />}
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
