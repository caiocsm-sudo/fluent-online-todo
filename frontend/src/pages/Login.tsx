import React, { useState } from "react";
import { Label, Input, Button, Divider } from "@fluentui/react-components";
import styles from "./css/Login.module.css";

import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Add authentication logic
    if (username && password) {
      const result = await axios.post("http://localhost:8000/login");
      console.log(result);
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className={styles["login-form"]}>
      <form method="post">
        <div className={styles['conventional-login']}>
          <h2>Login</h2>
          <div>
            <Label>Username:</Label>
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
          <Button appearance="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
        <div className={styles['oauth-options']}>
          <div>
            <Divider>Or Sign In with</Divider>
          </div>
          <div>

          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
