/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseSyntheticEvent, useState, useContext } from "react";

import TodoListInterface from "../utils/TodoListInterface";

import styles from "./css/CreateTodo.module.css";
import { Label, Input, Button, Slider } from "@fluentui/react-components";

import {
  Todo,
  EditContext,
  StateUpdatersContext /* EditContext */,
} from "../utils/Context";

// Edit type changing

import axios from "axios";

export default function CreateTodo({
  mode,
  getData,
}: // todo,
  {
    mode: "create" | "edit";
    getData: () => Promise<void>;
    // todo?: TodoListInterface;
  }) {
  const { setVisible } = useContext(StateUpdatersContext);

  const editData = useContext(EditContext);

  // placeholder for useContext EditTodo
  const todo: Todo = {
    id: editData?.id,
    title: editData?.title,
    description: editData?.description,
    progress: editData?.progress,
  };

  console.log(todo);

  // Provided by Redux
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
      user_email: userEmail,
      date: `${Date.toString()}`,
    };

    if (!title || !progress || !description) return;

    const data = await axios.post("http://localhost:8000/todos", todo);

    console.log("chegou");

    if (data.status === 200) {
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
      const edited: object = { title, description, progress };

      const result = await axios.patch(
        "http://localhost:8000/todos/" + todo?.id,
        edited
      );

      if (result.status === 200) {
        console.log("success");
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
            onClick={(e: BaseSyntheticEvent) =>
              mode === "create" ? handleCreate(e) : handleEdit(e)
            }
            style={{ width: "100%" }}
          >
            {mode === "create" ? "Create" : "Edit"} Todo
          </Button>
        </div>
      </form>
    </div>
  );
}
