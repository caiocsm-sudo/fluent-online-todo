import styles from "./css/Modal.module.css";
import CreateTodo from "./CreateTodo";

export default function Modal({ mode }: { mode: 'create' | 'edit' }) {
  return (
    <div className={styles["modal-shadow"]}>
      <div className={styles["modal-container"]}>
        {/* Will recieve a form for each option -> create todo, login, signup */}
        <CreateTodo mode={mode}/>
      </div>
    </div>
  );
}
