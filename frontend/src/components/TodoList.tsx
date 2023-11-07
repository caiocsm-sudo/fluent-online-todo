import { Button, Checkbox } from "@fluentui/react-components";
import { DeleteRegular, EditRegular } from "@fluentui/react-icons";
import Progress from "./Progress";
import styles from "./css/TodoList.module.css";

export default function TodoList({ title, description, progress }: { title: string, description: string, progress: number}) {

  return (
    <li className={styles.list}>
      <div>
        <Checkbox label={title || "Test Todo"}></Checkbox>
      </div>
      <div className="description">
        <span className={styles["description-text"]}>
          {description || "Test Description"}
        </span>
      </div>
      <Progress progress={progress || 50}/>
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
