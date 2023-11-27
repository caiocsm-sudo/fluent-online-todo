import { useContext } from "react";

import { Button, Checkbox } from "@fluentui/react-components";
import { DeleteRegular, EditRegular } from "@fluentui/react-icons";
import { StateUpdatersContext } from "./MainPanel";

import Progress from "./Progress";
import Modal from "./Modal";

import styles from "./css/TodoList.module.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { UserReducer } from "../app/store";
import { setEditingTodo } from "../app/todos/todoSlice";

type Id = string | undefined;

export default function TodoList({
  id,
  title,
  description,
  progress,
}: {
  id: Id;
  title: string;
  description: string;
  progress: number;
}) {
  const dispatch = useDispatch();
  const { visible, getData, setVisible, mode, setMode } =
    useContext(StateUpdatersContext);


  const handleDelete = async () => {
    const result = await axios.delete("http://localhost:8000/todos/" + id);
    console.log(result.data);

    if (result.data.status === "success") getData();
    else console.log(result.data.detail);
  };

  const handleEdit = () => {
    dispatch(setEditingTodo({id, title, description, progress}));
    setMode("edit");
    setVisible(true);
  };

  return (
    <li className={styles.list}>
      <div>
        <Checkbox label={title || "Test Todo"}></Checkbox>
      </div>
      <div className="description">
        <span className={styles[`description-text`]}>
          {description || "Test Description"}
        </span>
      </div>
      <div>
        <Progress progress={progress || 50} />
      </div>
      <div className={styles["buttons"]}>
        <Button onClick={handleEdit}>
          <EditRegular />
        </Button>
        <Button onClick={handleDelete}>
          <DeleteRegular />
        </Button>
      </div>
      {visible && mode === "edit" && <Modal />}
    </li>
  );
}
