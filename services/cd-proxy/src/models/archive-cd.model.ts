import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { cd } from "../interfaces/cd";
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
    patientId: {
        type: String
    },
    kpis: {
        type: [{
            id: {type: String},
            values: {
                type: [{
                    id: {type: String},
                    eventId: {type: String},
                    documentId: {type: String},
                    stageId: {type: String},
                    value: {type: Schema.Types.Mixed},
                    unit: {type: String},
                    date: {type: String, required: true}
                }] 
            }
        }]
    },
    events: {
        type: [{
            id: {type: String},
            documentId: {type: String},
            stageId: {type: String},	
            date: {type: Date},		
            startDate: {type: Date},	
            endDate: {type: Date},
            clinicId: {type: String},
            parameters: {type: [{
                id: {type: String},
                value: {type: String},
            }]}
        }]
    },
    documents: {
        type: [{
            id: {type: String},
            typeId: {type: String},
            displayName: {type: String},
            stageId: {type: String},
            url: {type: String},
            date: {type: Date},
            createdBy: {type: String},
            clinicId: {type: String},
            addedAt: {type: Number},
            addedById: {type: String},
            validation: [{type: String}]
        }]
    },
});

export const ArchiveCDModel = mongoose.model<cd>(APP_CONFIG.mongoArchiveCollectionName, schema, APP_CONFIG.mongoArchiveCollectionName);