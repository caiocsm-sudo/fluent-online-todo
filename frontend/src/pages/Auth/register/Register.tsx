import { FC, BaseSyntheticEvent } from 'react';

import { Label, Input } from '@fluentui/react-components';

import { CreateAndLogUser } from '../interface/CreateAndLogUser';

const Register: FC<CreateAndLogUser> = ({
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
          onChange={(e: BaseSyntheticEvent) => setUsername ? setUsername(e.target.value) : false}
        />
      </div>
      <div>
        <Label>Email:</Label>
        <Input
          type="text"
          value={email}
          onChange={(e: BaseSyntheticEvent) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div>
        <Label>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e: BaseSyntheticEvent) => setPassword(e.target.value)}
        />
      </div>
    </>
  );
};

export default Register;
