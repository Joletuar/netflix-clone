import { Types } from 'mongoose';

export interface IAccountDB {
    userId: Types.ObjectId;
    typeAccount: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    acces_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state: string;
}
