import { IUserDB } from '@/interfaces';
import { Schema, model, models, Types, Model } from 'mongoose';

const userSchema = new Schema<IUserDB>(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
        },
        image: { type: String },

        emailVerifiedDate: {
            type: String,
        },
        password: { type: String, required: true },
        favoriteIds: [
            {
                type: Types.ObjectId,
            },
        ],
        session: [
            {
                type: Types.ObjectId,
                ref: 'Session',
            },
        ],
        accounts: [
            {
                type: Types.ObjectId,
                ref: 'Account',
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const User: Model<IUserDB> =
    models.User || model<IUserDB>('User', userSchema);
