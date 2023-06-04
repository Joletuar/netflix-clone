import { IVerificationToken } from '@/interfaces';
import { Schema, model, models } from 'mongoose';

const verificationTokenSchema = new Schema<IVerificationToken>({
    identifier: {
        type: String,
        required: true,
    },

    token: {
        type: String,
        required: true,
        unique: true,
    },
    expires: {
        type: Number,
    },
});

verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

export const VerificationToken =
    models.VerificationToken ||
    model('VerificationToken', verificationTokenSchema);
