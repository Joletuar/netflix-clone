import { ISessionDB } from '@/interfaces';
import { Model, Schema, model, models } from 'mongoose';

const sessionSchema = new Schema<ISessionDB>({
  sessionToken: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  expires: {
    type: Number,
    required: true,
  },
});

export const Sessions: Model<ISessionDB> =
  models.Sessions || model('Sessions', sessionSchema);
