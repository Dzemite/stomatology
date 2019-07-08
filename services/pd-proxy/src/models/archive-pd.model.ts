import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { pd } from "../interfaces/pd";
import { APP_CONFIG } from "../config";

const schema = new Schema({
    id: {
        type: String
    },
    version: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    createdById: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date
    },
    updatedById: {
        type: String
    },
    externalId: {
        type: Number
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['MAN', 'WOMAN', 'UNDEFINED'],
        default: 'UNDEFINED'
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    omsSeriesAndNumber: {
        type: String
    },
    snilsNumber: {
        type: String
    },
    deleted: {
        type: Boolean
    },
    address: {
        type: {
            region: {type: String},
            area: {type: String},
            locality: {type: String},
            street: {type: String},
            building: {type: String},
            apartment: {type: String},
            postcode: {type: String}
        }
    },
});

export const ArchivePDModel = mongoose.model<pd>(APP_CONFIG.mongoArchiveCollectionName, schema, APP_CONFIG.mongoArchiveCollectionName);