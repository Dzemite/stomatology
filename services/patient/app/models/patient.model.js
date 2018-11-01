"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
    },
    secondName: {
        type: String,
        required: true,
        minlength: 1
    },
    gender: {
        type: String,
        required: true,
        minlength: 1
    },
    birthDate: {
        type: String,
        required: true,
        minlength: 1
    },
    identifierMPI: {
        type: String,
        required: true,
        minlength: 1
    },
    identifierPassport: {
        type: String,
        required: true,
        minlength: 1
    },
    address: {
        type: String,
        required: true,
        minlength: 1
    },
});
exports.PatientModel = mongoose.model('Patient', schema, 'patient');
