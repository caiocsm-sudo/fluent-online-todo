import { FC } from "react";
import styles from "./HomePage.module.css";

import { Button } from "@fluentui/react-components";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  return (
    <>
      <section className={styles["header-section"]}>
        <h2 className={styles["gradient-title"]}>
          A new kind of TODO
          <br />
          to collaborate with friends
        </h2>
        <p className={styles["app-description"]}>
          Join now, create and invite your friends to your todo.
        </p>
        <div className={styles["get-started"]}>
          <Link to={"/login/register"}>
            <Button appearance="primary">Get Started</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
