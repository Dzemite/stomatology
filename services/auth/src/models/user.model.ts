import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { User } from '../interfaces/user';

const schema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    ldapId: String,
    displayName: {
        type: String,
        required: true,
        minlength: 1
    },
    departamentDisplayName: String,
    deleted: Boolean,
    permissions: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Permission'}],
    mail: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Введенный адрес электронной почты некорректен"]
    }
});

export const UserModel = mongoose.model<User>('User', schema);