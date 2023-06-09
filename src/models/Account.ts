import { IAccountDB } from '@/interfaces';
import { Schema, model, models, Model } from 'mongoose';

const accountSchema = new Schema<IAccountDB>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  typeAccount: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
  },
  access_token: {
    type: String,
  },
  expires_at: {
    type: Number,
  },
  token_type: {
    type: String,
  },
  scope: {
    type: String,
  },
  id_token: {
    type: String,
  },
  session_state: {
    type: String,
  },
});

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export const Accounts: Model<IAccountDB> =
  models.Accounts || model('Accounts', accountSchema);
