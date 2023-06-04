import { IUserDB } from '@/interfaces';
import { Schema, model, models, Types } from 'mongoose';

const userSchema = new Schema<IUserDB>(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        email: {
            type: String,
        },

        emailVerifiedDate: {
            type: String,
        },
        password: { type: String, required: true },
        favoriteIds: [
            {
                type: Types.ObjectId,
                required: true,
            },
        ],
        session: [
            {
                type: Types.ObjectId,
                ref: 'Session',
                required: true,
            },
        ],
        accounts: [
            {
                type: Types.ObjectId,
                ref: 'Account',
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const User = models.User || model<IUserDB>('User', userSchema);
