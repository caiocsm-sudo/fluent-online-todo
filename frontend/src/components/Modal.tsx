import styles from "./css/Modal.module.css";
import CreateTodo from "./CreateTodo";
import { Button } from "@fluentui/react-components";
import TodoListInterface from "../utils/TodoListInterface";
// import TodoListInterface from "../utils/TodoListInterface";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2048 2048"
    className="svg_dd790ee3"
    focusable="false"
  >
    <path d="M1115 1024l690 691-90 90-691-690-691 690-90-90 690-691-690-691 90-90 691 690 691-690 90 90-690 691z"></path>
  </svg>
);

export default function Modal({
  mode,
  setVisible,
  getData,
  todo
}: {
  mode: "create" | "edit";
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  getData: () => Promise<void>;
  todo: TodoListInterface
}) {
  return (
    <div className={styles["modal-shadow"]}>
      <div className={styles["modal-container"]}>
        <Button
          className={styles["close-button"]}
          icon={<CloseIcon />}
          onClick={() => setVisible(false)}
        />
        {/* Will recieve a form for each option -> create todo, login, signup */}
        <CreateTodo mode={mode} getData={getData} setVisible={setVisible} todo={todo} />
      </div>
    </div>
  );
}
