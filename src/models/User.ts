import { IUserDB } from '@/interfaces';
import { Schema, model, models, Model } from 'mongoose';

const userSchema = new Schema<IUserDB>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String },

    emailVerifiedDate: {
      type: String,
    },
    password: { type: String, required: true },
    favoriteIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movies',
      },
    ],
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Accounts',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Users: Model<IUserDB> =
  models.Users || model<IUserDB>('Users', userSchema);
