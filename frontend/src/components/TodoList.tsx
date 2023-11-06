import { Button, Checkbox } from "@fluentui/react-components";
import { DeleteRegular, EditRegular } from "@fluentui/react-icons";
import styles from "./css/TodoList.module.css";

export default function TodoList() {
  return (
    <li className={styles.list}>
      <div>
        <Checkbox label={"Checar putas"}></Checkbox>
      </div>
      <div className="description">
        <span className="description-text">
          Tirar a areia de dentro do cavalo
        </span>
      </div>
      <div className="buttons">
        <Button>
          <EditRegular />
        </Button>
        <Button>
          <DeleteRegular />
        </Button>
      </div>
    </li>
  );
}
