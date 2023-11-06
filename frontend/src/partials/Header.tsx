import { Avatar } from "@fluentui/react-components";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import styles from "./Header.module.css";

// logged in ? avatar : '';

export default function Header() {
  const loggedIn: boolean = true;

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>DirectX Todos</h1>
      <div>
        {loggedIn ? (
          <DefaultButton className={styles.btn}>Log Out</DefaultButton>
        ) : (
          <>
            <PrimaryButton className={styles.btn}>Log In</PrimaryButton>
            <DefaultButton className={styles.btn}>Sign Up</DefaultButton>
          </>
        )}
        {loggedIn ? (
          <Avatar
            name="guest"
            className={styles.avatar}
            image={{
              src: "https://i.pinimg.com/564x/28/8f/b6/288fb60866ff176876fbc3f4304f318f.jpg",
            }}
          />
        ) : null}
      </div>
    </header>
  );
}
