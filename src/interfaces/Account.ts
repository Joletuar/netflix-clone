import { Types } from 'mongoose';

export interface IAccountDB {
  userId: Types.ObjectId | string;
  typeAccount: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: Types.ObjectId | string;
  session_state?: string;
}

export interface IAccount {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  typeAccount: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: Types.ObjectId | string;
  session_state?: string;
}
