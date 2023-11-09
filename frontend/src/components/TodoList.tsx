import { useState } from "react";

import {
  Button,
  Checkbox,
  Toast,
  Toaster,
  ToastTitle,
  useId,
  useToastController,
  ToastIntent,
} from "@fluentui/react-components";

import { DeleteRegular, EditRegular } from "@fluentui/react-icons";
import Progress from "./Progress";
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
  const toasterId = useId("toaster");
  const [dashed, setDashed] = useState<boolean>(false);
  const { dispatchToast } = useToastController(toasterId);
  const [intent, setIntent] = useState<ToastIntent>("success");

  const completeTaskHandler = () => {
    setDashed(true);
  };

  const notify = (message: string) =>
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { intent }
    );

  const handleDelete = async () => {
    const result = await axios.delete("http://localhost:8000/" + id);
    if (result.status === 200) {
      notify("Task deleted successfully");
    } else {
      setIntent("error");
      notify(`An error occured: ${result.data.detail}`);
    }
    console.log(result);
  };

  return (
    <li className={styles.list}>
      <div>
        <Checkbox
          label={title || "Test Todo"}
          onClick={completeTaskHandler}
        ></Checkbox>
      </div>
      <div className="description">
        <span className={styles[`description-text ${dashed ? "dashed" : ""}`]}>
          {description || "Test Description"}
        </span>
        <Progress progress={progress || 50} />
      </div>
      <div className={styles["buttons"]}>
        <Button>
          <EditRegular />
        </Button>
        <Button>
          <DeleteRegular onClick={handleDelete} />
        </Button>
      </div>
      <Toaster toasterId={toasterId}/>
    </li>
  );
}
