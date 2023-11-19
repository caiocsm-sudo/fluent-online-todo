import { useContext } from "react";
import { Button } from "@fluentui/react-components";

import CreateTodo from "./CreateTodo";
import CloseIcon from "./icons/closeIcon";
import styles from "./css/Modal.module.css";

import { StateUpdatersContext } from "./MainPanel";

export default function Modal() {
  const { mode, todos, getData, setVisible } = useContext(StateUpdatersContext);

  return (
    <div className={styles["modal-shadow"]}>
      <div className={styles["modal-container"]}>
        <Button
          className={styles["close-button"]}
          icon={<CloseIcon />}
          onClick={() => setVisible(false)}
        />
        {/* Will recieve a form for each option -> create todo, login, signup */}
        <CreateTodo mode={mode} getData={getData} todo={todos} />
      </div>
    </div>
  );
}
