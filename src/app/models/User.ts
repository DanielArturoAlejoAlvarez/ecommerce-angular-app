import { Role } from './Role';

export class User {
  _id: number | string;
  displayName: String;
  email: String;
  username: String;
  password: String;
  avatar: String;
  role: Role;
  status: Boolean;
}
