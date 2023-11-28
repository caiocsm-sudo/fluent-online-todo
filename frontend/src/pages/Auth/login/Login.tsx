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
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label>Password:</Label>
        <Input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </>
  );
};

export default Login;