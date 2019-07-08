"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
const schema = new mongoose_1.Schema({
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
            region: { type: String },
            area: { type: String },
            locality: { type: String },
            street: { type: String },
            building: { type: String },
            apartment: { type: String },
            postcode: { type: String }
        }
    },
});
exports.ArchivePDModel = mongoose.model(config_1.APP_CONFIG.mongoArchiveCollectionName, schema, config_1.APP_CONFIG.mongoArchiveCollectionName);
