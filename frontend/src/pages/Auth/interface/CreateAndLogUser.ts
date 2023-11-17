import { Dispatch, SetStateAction } from "react";

export interface CreateAndLogUser {
  username?: string;
  email: string;
  password: string;
  setUsername?: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}
