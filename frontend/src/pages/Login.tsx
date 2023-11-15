import React, { useState, Dispatch, SetStateAction } from "react";
import { Label, Input, Button, Divider } from "@fluentui/react-components";
import styles from "./css/Login.module.css";

import { useParams } from "react-router-dom";

type User = { username: string; password: string };

interface CreateAndLogUser {
  username?: string;
  email: string;
  password: string;
  setUsername?: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}

import axios from "axios";

const Register: React.FC<CreateAndLogUser> = ({
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
}: CreateAndLogUser) => {
  return (
    <>
      <div>
        <Label>Username:</Label>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Label>Email:</Label>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div>
        <Label>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </>
  );
};

const Login: React.FC<CreateAndLogUser> = ({ email, setEmail, password, setPassword }: CreateAndLogUser) => {
  return (
    <>
      <div>
        <Label>Email:</Label>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div>
        <Label>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </>
  );
};

const Authentication: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mode } = useParams();

  const modeText = mode === "login" ? "Login" : "Sign Up";

  const requestFunction = async (
    endpoint: "login" | "register",
    body: User
  ) => {
    const result = await axios.post(`http://localhost:8000/${endpoint}`, body);
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
    if (username && password) {
      const data = await requestFunction("register", { username, password });
      console.log(data);
    }
  };

  return (
    <div className={styles["login-form"]}>
      <form method="post">
        <div className={styles["conventional-login"]}>
          <h2>{modeText}</h2>
          <div>
            <Label>Email:</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
