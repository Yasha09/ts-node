import { Schema, model } from 'mongoose';
import User from '@/resources/user/user.interface';

const UserSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            required: true,
        },
        visible: {
            type: Boolean,
            required: true,
        },
        rows: {
            type: Number,
        },
    },
    { timestamps: true }
);

export default model<User>('User', UserSchema);
