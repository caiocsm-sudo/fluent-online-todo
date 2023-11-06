import styles from "./css/MainPanel.module.css";
import TodoList from "./TodoList";

import { Avatar, Divider, Button } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";

export const MainPanel = () => {
  // will recieve an image for the todo name

  return (
    <section className={styles["todo-container"]}>
      <div className={styles["todo-header"]}>
        <div>
          <Avatar initials={"MG"} color="magenta" size={32} />
          <h2 className={styles["todo-title"]}>Minecraft Guerra</h2>
        </div>
        <div className={styles["todo-options"]}>
          <Button icon={<AddRegular />} />
        </div>
      </div>
      <Divider />
      <div className={styles[""]}>
        <ul className={styles["todo-list"]}>
          <TodoList />
        </ul>
      </div>
    </section>
  );
};
