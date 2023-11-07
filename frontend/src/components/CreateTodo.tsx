import { BaseSyntheticEvent, useState } from "react";

import styles from "./css/CreateTodo.module.css";
import TodoList from "../utils/TodoListInterface";
import { Label, Input } from "@fluentui/react-components";

import axios from 'axios';

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState<number>(50);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const todo: TodoList = {
      id: '',
      title: title,
      description: description,
      progress: progress,
      completed: false,
      date: `${Date.now()}`,
    };
    
    const res = await axios.post('http://localhost:8000/todos', todo);

    console.log(res);
  };

  return (
    <div className={styles["create-todo"]}>
      <form action="POST">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            onClick={(e: BaseSyntheticEvent) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Description</Label>
          <Input
            type="text"
            onClick={(e: BaseSyntheticEvent) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label>Progress</Label>
          <Input
            type="number"
            onClick={(e: BaseSyntheticEvent) => setProgress(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
