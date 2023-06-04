import { ISessionDB } from '@/interfaces';
import { Schema, model, models } from 'mongoose';

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

export const Session = models.Session || model('Session', sessionSchema);
