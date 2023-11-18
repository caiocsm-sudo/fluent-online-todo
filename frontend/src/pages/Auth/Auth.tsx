import { FC, useState } from "react";
import { Button, Divider } from "@fluentui/react-components";
import styles from "./css/Login.module.css";

// The /login has an id, which is the mode;
import { useParams } from "react-router-dom";

type UserLogin = { username: string; password: string };
type UserRegister = { username: string; email: string; password: string };

import axios from "axios";

import Login from "./login/Login";
import Register from "./register/Register";

const Authentication: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mode } = useParams();

  const modeText = mode === "login" ? "Login" : "Sign Up";

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
    // Add authentication logic
    if (username && password) {
      const data = await requestFunction("login", { username, password });
      console.log(data);
    } else {
      alert("Please enter both username and password.");
    }
  };

  const handleRegister = async () => {
    if (username && email && password) {
      const data = await requestFunction("register", {
        username,
        email,
        password,
      });
      console.log(data);
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
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default Authentication;
