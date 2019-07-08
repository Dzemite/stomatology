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
    patientId: {
        type: String
    },
    kpis: {
        type: [{
                id: { type: String },
                values: {
                    type: [{
                            id: { type: String },
                            eventId: { type: String },
                            documentId: { type: String },
                            stageId: { type: String },
                            value: { type: mongoose_1.Schema.Types.Mixed },
                            unit: { type: String },
                            date: { type: String, required: true }
                        }]
                }
            }]
    },
    events: {
        type: [{
                id: { type: String },
                documentId: { type: String },
                stageId: { type: String },
                date: { type: Date },
                startDate: { type: Date },
                endDate: { type: Date },
                clinicId: { type: String },
                parameters: { type: [{
                            id: { type: String },
                            value: { type: String },
                        }] }
            }]
    },
    documents: {
        type: [{
                id: { type: String },
                typeId: { type: String },
                displayName: { type: String },
                stageId: { type: String },
                url: { type: String },
                date: { type: Date },
                createdBy: { type: String },
                clinicId: { type: String },
                addedAt: { type: Number },
                addedById: { type: String },
                validation: [{ type: String }]
            }]
    },
});
exports.CDModel = mongoose.model(config_1.APP_CONFIG.mongoCollectionName, schema, config_1.APP_CONFIG.mongoCollectionName);
