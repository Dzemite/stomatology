import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { User } from '../interfaces/user';
import { Permission } from '../interfaces/permission';

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    entityName: String,
    objectId: String,
    canCreate: Boolean,
    canRead: Boolean,
    canUpdate: Boolean,
    canDelete: Boolean
});

export const PermissionModel = mongoose.model<Permission>('Permission', schema);