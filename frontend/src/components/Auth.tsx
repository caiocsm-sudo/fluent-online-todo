import { BaseSyntheticEvent, useState } from "react";

import { Input, Label, Button } from "@fluentui/react-components";
import styles from "./css/Auth.module.css";

export const Auth = ({ mode }: { mode: string }) => {
  const formattedMode = mode === "signup" ? "Sign Up" : "Log In";

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  console.log({ email, password, confirmPassword });

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles["login-signup"]}>
      <form className={styles["form-style"]}>
        <h1 className={styles.title}>{formattedMode}</h1>
        <div className={styles["inputs"]}>
          <div>
            <Label className={styles.label}>Email</Label>
            <Input
              appearance="underline"
              type="email"
              className={styles.input}
              onChange={(e: BaseSyntheticEvent) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label className={styles.label}>Password</Label>
            <Input
              appearance="underline"
              type="password"
              className={styles.input}
              onChange={(e: BaseSyntheticEvent) => setPassword(e.target.value)}
            />
          </div>
          {mode === "signup" ? (
            <div>
              <Label className={styles.label}>Confirm Password</Label>
              <Input
                appearance="underline"
                type="password"
                className={styles.input}
                onChange={(e: BaseSyntheticEvent) => setConfirmPassword(e.target.value)}
              />
            </div>
          ) : null}
          <div>
            <Button
              type="submit"
              appearance="primary"
              onClick={handleSubmit}
              className={styles["ms-button"]}
            >
              {formattedMode}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
