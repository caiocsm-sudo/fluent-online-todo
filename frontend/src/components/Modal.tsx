import { useContext } from "react";
import { Button } from "@fluentui/react-components";

import CreateTodo from "./CreateTodo";
import CloseIcon from "../utils/icons/closeIcon";
import styles from "./css/Modal.module.css";

import { StateUpdatersContext } from "./MainPanel";

export default function Modal() {
  const { mode, getData, setVisible } = useContext(StateUpdatersContext);

  return (
    <div className={styles["modal-shadow"]}>
      <div className={styles["modal-container"]}>
        <Button
          className={styles["close-button"]}
          icon={<CloseIcon />}
          onClick={() => setVisible(false)}
        />
        <CreateTodo mode={mode} getData={getData} />
      </div>
    </div>
  );
}
