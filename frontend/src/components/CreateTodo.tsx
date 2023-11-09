/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseSyntheticEvent, useState } from "react";

// import TodoList from "../utils/TodoListInterface";
import styles from "./css/CreateTodo.module.css";
import { Label, Input, Button, Slider } from "@fluentui/react-components";

import axios from "axios";
import TodoListInterface from "../utils/TodoListInterface";

export default function CreateTodo({
  mode,
  getData,
  setVisible,
  todo,
}: {
  mode: "create" | "edit";
  getData: () => Promise<void>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  todo?: TodoListInterface;
}) {
  const userEmail = "porracara@gmail.com";

  const [title, setTitle] = useState<any>(mode === "edit" ? todo?.title : "");
  const [description, setDescription] = useState<any>(
    mode === "edit" ? todo?.description : ""
  );
  const [progress, setProgress] = useState<any>(
    mode === "edit" ? todo?.progress : 50
  );

  const handleCreate = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const todo: TodoListInterface = {
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

  const handleEdit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    try {
      console.log({ title, description, progress });

      const result = await axios.patch("http://localhost:8000/todos/" + todo?.id, { title, description, progress });

      if (result.status === 200) {
        console.log('success');
        setVisible(false);
        getData();
      }
    } catch (error) {
      console.log(`an error occurred: ${error}`);
    }
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
            appearance="primary"
            onClick={(e: BaseSyntheticEvent) => mode === 'create' ? handleCreate(e) : handleEdit(e)}
            style={{ width: "100%" }}
          >
            {mode === "create" ? "Create" : "Edit"} Todo
          </Button>
        </div>
      </form>
    </div>
  );
}
