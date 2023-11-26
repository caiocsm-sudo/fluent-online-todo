import { FC, useState } from "react";
import {
  Button,
  Divider,
  useId,
  Toast,
  Toaster,
  ToastTitle,
  useToastController,
  ToastIntent
} from "@fluentui/react-components";

import styles from "./css/Login.module.css";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../app/user/userSlice";

import Login from "./login/Login";
import Register from "./register/Register";
import { UserReducer } from "../../app/store";

type UserLogin = { email: string; password: string };
type UserRegister = { username: string; email: string; password: string };

const Authentication: FC = () => {
  const navigate = useNavigate();
  const { mode } = useParams();
  const modeText = mode === "login" ? "Login" : "Sign Up";

  const user = useSelector((state: UserReducer) => state.user);

  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // simple error handling
  const [serverMessage, setServerMessage] = useState<string>("");
  const [ intent, setIntent ] = useState<ToastIntent>("info");

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const notify = (message: string) => {
    return dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { intent: intent }
    );
  };

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

      if (result.data.status === "success") {
        const loggedUser = result.data.data.user;

        setSessionUser(
          loggedUser.username,
          loggedUser.user_email,
          loggedUser.id
        );

        setCookies("token", result.data.accessToken);
        setIntent("success");
        setServerMessage(result.data.status);

        navigate("/");
      } else {
        console.log(result);
        setServerMessage(result.data.error);
        setIntent("error");
      }
      emptyFiels();
    } else {
      setServerMessage("Please enter both username and password.");
      setIntent("error");
    }

    console.log("tas chegando aqui?");
    
    notify(serverMessage);
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

    console.log("e aqui?");

    notify(serverMessage);
  };

  return (
    <div className={styles["wrapper"]}>
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
            <Button
              onClick={() => notify(serverMessage)}
            >
              Show Modal
            </Button>
          </div>
          <div className={styles["oauth-options"]}>
            <div>
              <Divider>Or Sign In with</Divider>
            </div>
            <div></div>
            {/* <div> Old logout button for testing </div> */}
          </div>
        </form>
      </div>
      <Toaster
        toasterId={toasterId}
        position="bottom-end"
        pauseOnHover
        timeout={1000}
      />
    </div>
  );
};

export default Authentication;
