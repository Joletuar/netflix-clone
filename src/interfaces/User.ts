import { IAccountDB, ISessionDB } from './';

export interface IUserDB {
  name: string;
  image?: string;
  email?: string;
  emailVerifiedDate?: string;
  password: string;
  favoriteIds?: string[];
  session?: ISessionDB[];
  accounts?: IAccountDB[];
}
