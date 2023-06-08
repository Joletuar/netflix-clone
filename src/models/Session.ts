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
        required: true,
    },
    expires: {
        type: Number,
        required: true,
    },
});

export const Session: Model<ISessionDB> =
    models.Session || model('sessions', sessionSchema);
