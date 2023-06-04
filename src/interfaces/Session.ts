import { Types } from 'mongoose';

export interface ISessionDB {
    _id: string;
    sessionToken: string;
    userId: Types.ObjectId;
    expires: number;
}
