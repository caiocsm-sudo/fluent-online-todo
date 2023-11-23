import { useContext, useEffect, useState } from "react";

import { Button, Checkbox } from "@fluentui/react-components";
import { DeleteRegular, EditRegular } from "@fluentui/react-icons";

import { Todo } from "../utils/Context";

import { EditContext } from "../utils/Context";
import { StateUpdatersContext } from "./MainPanel";

import Progress from "./Progress";
import Modal from "./Modal";

import styles from "./css/TodoList.module.css";

import axios from "axios";

export default function TodoList({
  id,
  title,
  description,
  progress,
}: {
  id: string | undefined;
  title: string;
  description: string;
  progress: number;
}) {
  // useContext
  const { visible, getData, setVisible, mode, setMode } =
    useContext(StateUpdatersContext);

  const [editData, setEditData] = useState<Todo>({
    id,
    title,
    description,
    progress,
  });

  useEffect(() => {
    setEditData({id, title, description, progress});
  }, [description, editData, id, progress, title]);

  const handleDelete = async () => {
    const result = await axios.delete("http://localhost:8000/todos/" + id);
    console.log(result.data);

    if (result.data.status === "success") {
      getData();
    } else {
      console.log(result.data.data.detail);
    }
  };

  const handleEdit = () => {
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
      <EditContext.Provider value={editData}>
        {visible && mode === 'edit' && <Modal />}
      </EditContext.Provider>
    </li>
  );
}
