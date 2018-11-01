import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Patient } from '../interfaces/patient';

const schema = new Schema({
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

export const PatientModel = mongoose.model<Patient>('Patient', schema, 'patient');