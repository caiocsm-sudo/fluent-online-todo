import { Avatar } from "@fluentui/react-components";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

// logged in ? avatar : '';

export default function Header() {
  const loggedIn: boolean = false;

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1 className={styles.title}>DirectX Todos</h1>
      </Link>
      <div>
        {loggedIn ? (
          <DefaultButton className={styles.btn}>Log Out</DefaultButton>
        ) : (
          <>
            <Link to="/login/login">
              <PrimaryButton className={styles.btn}>Log In</PrimaryButton>
            </Link>
            <Link to="/login/register">
              <DefaultButton className={styles.btn}>Sign Up</DefaultButton>
            </Link>
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
