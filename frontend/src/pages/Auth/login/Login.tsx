import { FC } from "react";

import { Label, Input } from "@fluentui/react-components";

import { CreateAndLogUser } from "../interface/CreateAndLogUser";

const Login: FC<CreateAndLogUser> = ({
  email,
  setEmail,
  password,
  setPassword,
}: CreateAndLogUser) => {
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

export default Login;