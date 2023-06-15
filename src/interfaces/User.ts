export interface IUserDB {
  name: string;
  image?: string;
  email?: string;
  emailVerifiedDate?: string;
  password: string;
  favoriteIds?: string[];
  accounts?: string[];
}

export interface IUser {
  id: string;
  name: string;
  image?: string;
  email?: string;
  favoriteIds?: string[];
  accounts?: string[];
}
