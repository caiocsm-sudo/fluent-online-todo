import { FC, useContext } from "react";
import { Avatar } from "@fluentui/react-components";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../app/user/userSlice";
import { LoginContext } from "../utils/Context";
import { UserReducer } from "../app/store";

import { Image } from "@fluentui/react-components";

import { useCookies } from "react-cookie";

const Header: FC = () => {
  const [, , removeCookies] = useCookies();
  const dispatch = useDispatch();
  const { user } = useSelector((state: UserReducer) => state);
  const { loggedIn } = useContext(LoginContext);

  const handleLogOut = () => {
    removeCookies("token");
    dispatch(logOutUser());
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1 className={styles.title}>
          <Image src="/directx.svg" width={35} height={35}></Image>
        </h1>
      </Link>
      <div
        style={loggedIn ? { flexDirection: "row-reverse", gap: "0.7rem" } : {}}
        className={styles["right-header"]}
      >
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
        {/* TODO: Dropdown menu instead of a logout button */}
        {loggedIn ? (
          <div className={styles["profile"]}>
            <Link to="/profile">
              <Avatar
                name="guest"
                className={styles.avatar}
                image={{
                  src: "https://i.pinimg.com/564x/28/8f/b6/288fb60866ff176876fbc3f4304f318f.jpg",
                }}
              />
            </Link>
            <p>{user.username}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
