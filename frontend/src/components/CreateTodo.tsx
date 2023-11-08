import { BaseSyntheticEvent, useState } from "react";

import styles from "./css/CreateTodo.module.css";
import TodoList from "../utils/TodoListInterface";
import { Label, Input, Button, Slider } from "@fluentui/react-components";

import TodoListInterface from "../utils/TodoListInterface";

import axios from "axios";

export default function CreateTodo({
  mode,
  getData,
  setVisible
}: {
  mode: "create" | "edit";
  getData: React.Dispatch<React.SetStateAction<TodoListInterface[]>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userEmail = "porracara@gmail.com";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState<number>(50);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const todo: TodoList = {
      id: "",
      title: title,
      description: description,
      progress: progress,
      completed: false,
      user_email: userEmail,
      date: `${Date.now()}`,
    };

    if (!title || !progress || !description) return;

    console.log("chegou");

    const data = await axios.post("http://localhost:8000/todos", todo);

    if (data.data.status === "success") {
      getData();
      setVisible(false);
    }

    setTitle("");
    setDescription("");
    setProgress(50);
  };

  console.log({ title, description, progress });

  return (
    <div className={styles["create-todo"]}>
      <form action="POST">
        <h2>Let's {mode} your todo</h2>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            maxLength={30}
            onChange={(e: BaseSyntheticEvent) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e: BaseSyntheticEvent) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label>Progress</Label>
          <Slider
            min={0}
            max={100}
            defaultValue={progress}
            onChange={(e: BaseSyntheticEvent) => setProgress(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <Button
            type="submit"
            onClick={(e: BaseSyntheticEvent) => handleSubmit(e)}
            appearance="primary"
            style={{ width: "100%" }}
          >
            {mode === "create" ? "Create" : "Edit"} Todo
          </Button>
        </div>
      </form>
    </div>
  );
}
