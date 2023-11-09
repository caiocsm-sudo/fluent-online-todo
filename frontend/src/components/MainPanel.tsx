import { useEffect, useState } from "react";
import styles from "./css/MainPanel.module.css";
import TodoList from "./TodoList";
import TodoListInterface from "../utils/TodoListInterface";
import Modal from './Modal';

import { Avatar, Divider, Button } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";

import axios from 'axios';

export const MainPanel = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todos, setTodos] = useState<TodoListInterface[] | Array<any> >([]);
  const [visible, setVisible] = useState<boolean>(false);

  const userEmail = 'porracara@gmail.com';

  const getData = async () => {
    const res = await axios.get("http://localhost:8000/todos/" + userEmail);

    if(Array.isArray(res.data.data)) {
      const data = res.data.data;
      setTodos(data);
    } else {
      setTodos([]);
    }
  }

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
          <Button icon={<AddRegular />} onClick={handleAddTodos}/>
        </div>
      </div>
      <Divider />
      { visible && <Modal mode='create' setVisible={setVisible} getData={getData}/> }
      <div className={styles["todo-tasks"]}>
        <ul className={styles["todo-list"]}>
          { todos && todos.map(todo => {
            return(
              <TodoList
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                progress={todo.progress}
                getData={getData}
              />
            );
          }) }
        </ul>
      </div>
    </section>
  );
};
