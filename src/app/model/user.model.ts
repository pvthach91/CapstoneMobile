import {Role} from './role.model';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  isActive: boolean;
  roles: Array<Role>;
}
