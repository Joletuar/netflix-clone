import { Types } from 'mongoose';

export interface ISessionDB {
    sessionToken: string;
    userId: Types.ObjectId;
    expires: number;
}
