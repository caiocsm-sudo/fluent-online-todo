import { FC, useContext } from "react";
import { Avatar } from "@fluentui/react-components";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../app/user/userSlice";
import { LoginContext } from "../utils/Context";

// logged in ? avatar : '';


const Header: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { loggedIn } = useContext(LoginContext);

  const handleLogOut = () => {
    dispatch(logOutUser());
    console.log(user);
    console.log(user.username);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1 className={styles.title}>DirectX Todos</h1>
      </Link>
      <div>
        {loggedIn ? (
          <DefaultButton className={styles.btn} onClick={handleLogOut}>
            Log Out
          </DefaultButton>
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
          <Link to="/profile">
            <Avatar
              name="guest"
              className={styles.avatar}
              image={{
                src: "https://i.pinimg.com/564x/28/8f/b6/288fb60866ff176876fbc3f4304f318f.jpg",
              }}
            />
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
