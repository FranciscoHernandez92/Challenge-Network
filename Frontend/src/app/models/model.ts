import { JwtPayload } from 'jwt-decode';

export type UserLogin = {
  username: string;
  password: string;
};

export type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = {
  id: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currenPayload: Payload | null;
  currenUser: unknown | null;
};
