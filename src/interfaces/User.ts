import { IAccountDB, ISessionDB } from './';

export interface IUserDB {
    _id: string;
    name: string;
    image?: string;
    email?: string;
    emailVerifiedDate?: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    favoriteIds: string[];
    session: ISessionDB[];
    accounts: IAccountDB[];
}
