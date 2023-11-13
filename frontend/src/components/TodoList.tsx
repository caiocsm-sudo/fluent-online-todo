import { useContext, useState } from "react";

import { Button, Checkbox } from "@fluentui/react-components";

import { DeleteRegular, EditRegular } from "@fluentui/react-icons";
import Progress from "./Progress";
import Modal from "./Modal";

import styles from "./css/TodoList.module.css";

import axios from "axios";
import TodoListInterface from "../utils/TodoListInterface";
import { StateUpdatersContext } from "./MainPanel";

export default function TodoList({
  id,
  title,
  description,
  progress,
  todo,
}: {
  id: string | undefined;
  title: string;
  description: string;
  progress: number;
  todo: TodoListInterface;
}) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { getData } = useContext(StateUpdatersContext);

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
    setModalVisible(true);
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
      {modalVisible && (
        <Modal
          mode="edit"
          setModalVisible={setModalVisible}
          todo={todo}
        />
      )}
    </li>
  );
}
