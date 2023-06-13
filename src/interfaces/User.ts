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

export interface IUser {
  id: string;
  name: string;
  image?: string;
  email?: string;
  favoriteIds?: string[];
  session?: ISessionDB[];
  accounts?: IAccountDB[];
}
