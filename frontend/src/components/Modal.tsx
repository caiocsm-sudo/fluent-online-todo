import styles from "./css/Modal.module.css";
import { Auth } from "./Auth";

export default function Modal() {
  return (
    <div className={styles["modal-shadow"]}>
      <div className={styles["modal-container"]}>
        {/* Will recieve a form for each option -> create todo, login, signup */}
        <Auth mode="signup"/>
      </div>
    </div>
  );
}
