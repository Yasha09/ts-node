import { Document } from 'mongoose';

export default interface User extends Document {
    id?: string;
    type: string;
    label: string;
    required: boolean;
    visible: boolean;
    rows?: number;
}
