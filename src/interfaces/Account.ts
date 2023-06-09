import { Types } from 'mongoose';

export interface IAccountDB {
  userId: Types.ObjectId;
  typeAccount: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: Types.ObjectId;
  session_state?: string;
}
