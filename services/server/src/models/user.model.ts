import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    displayName: {
        type: String,
        required: true,
        minlength: 1
    },
    deleted: Boolean,
    permissions: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Permission'}],
    mail: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Введенный адрес электронной почты некорректен"]
    }
});

export const UserModel = mongoose.model<IUser>('User', schema);