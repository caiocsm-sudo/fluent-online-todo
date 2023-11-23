import { FC, useState } from "react";
import { Button, Divider } from "@fluentui/react-components";

import styles from "./css/Login.module.css";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addUser, logOutUser } from "../../app/user/userSlice";

import Login from "./login/Login";
import Register from "./register/Register";

type UserLogin = { email: string; password: string };
type UserRegister = { username: string; email: string; password: string };

const Authentication: FC = () => {
  const navigate = useNavigate();
  const { mode } = useParams();
  const modeText = mode === "login" ? "Login" : "Sign Up";

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [serverMessage, setServerMessage] = useState<string>("");

  const [, /* cookies */ setCookies /* removeCookies */] = useCookies();

  const emptyFiels = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const setSessionUser = (username: string, user_email: string, id: string) => {
    if (user.username || user.user_email) return;
    dispatch(addUser({ username, user_email, id }));
  };

  // put it in another file later
  const requestFunction = async (
    endpoint: "login" | "register",
    body: UserLogin | UserRegister
  ) => {
    const result = await axios.post(
      `http://localhost:8000/user/${endpoint}`,
      body
    );

    return result;
  };

  const handleLogin = async () => {
    if (email && password) {
      // TODO: Send the error message from server to client

      const result = await requestFunction("login", { email, password });

      setServerMessage(result.data.status);

      if (result.data.status === "success") {
        const loggedUser = result.data.data.user;

        setSessionUser(
          loggedUser.username,
          loggedUser.user_email,
          loggedUser.id
        );
        setCookies("token", result.data.accessToken);

        navigate("/");
      } else {
        setServerMessage("Incorrect user or password");
      }
      emptyFiels();
    } else {
      alert("Please enter both username and password.");
    }
  };

  const handleRegister = async () => {
    if (username && email && password) {
      const result = await requestFunction("register", {
        username,
        email,
        password,
      });
      console.log(result);

      if (result.data.status === "success") emptyFiels();

      setServerMessage(result.data.message);
    }
  };

  return (
    <div className={styles["login-form"]}>
      <form method="post">
        <div className={styles["conventional-login"]}>
          <h2>{modeText}</h2>
          {modeText === "Login" ? (
            <Login
              username={username}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              setUsername={setUsername}
            />
          ) : (
            <Register
              username={username}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              setUsername={setUsername}
            />
          )}
          <br />
          <Button
            appearance="primary"
            onClick={mode === "login" ? handleLogin : handleRegister}
          >
            {modeText}
          </Button>
        </div>
        <div className={styles["oauth-options"]}>
          <div>
            <Divider>Or Sign In with</Divider>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              margin: "1rem 0 0 0",
            }}
          >
            {serverMessage}
          </div>
          <div>
            <Button onClick={() => dispatch(logOutUser())}>
              log out for testing
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Authentication;
