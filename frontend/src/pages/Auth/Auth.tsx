import { FC, useState } from "react";
import { Button, Divider } from "@fluentui/react-components";
import styles from "./css/Login.module.css";

import { useParams } from "react-router-dom";

type UserLogin = { email: string; password: string };
type UserRegister = { username: string; email: string; password: string };

import axios from "axios";

import { useCookies } from "react-cookie";

import Login from "./login/Login";
import Register from "./register/Register";

const Authentication: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [serverMessage, setServerMessage] = useState<string>('');

  const [/* cookies */, setCookies, /* removeCookies */] = useCookies();

  const { mode } = useParams();

  const modeText = mode === "login" ? "Login" : "Sign Up";

  const emptyFiels = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  }

  const requestFunction = async (
    endpoint: "login" | "register",
    body: UserLogin | UserRegister
  ) => {
    const result = await axios.post(
      `http://localhost:8000/user/${endpoint}`,
      body
    );

    console.log(result.statusText);

    if (result.data.status === 'success' && endpoint === 'login') {
      setCookies('Token', result.data.data.token);
    }

    return result;
  };

  const handleLogin = async () => {
    // Add authentication logic
    if (email && password) {
      const result = await requestFunction("login", { email, password });

      // not recieving email + token + confirmation;

      console.log(result);
      if (result.data.status === 'fail') {
        setServerMessage(result.data.status)
      }
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

      if (result.data.status === 'success') emptyFiels();

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
          <div style={{ textAlign: 'center', fontSize: '1.5rem', margin: '1rem 0 0 0' }}>{serverMessage}</div>
        </div>
      </form>
    </div>
  );
};

export default Authentication;
