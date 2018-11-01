"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patient_model_1 = require("../models/patient.model");
exports.patientGet = (req, res, next) => {
    const patientId = req.params.id;
    if (!patientId) {
        res.sendStatus(403);
    }
    return patient_model_1.PatientModel.findOne({
        _id: patientId
    })
        .then((patient) => {
        if (patient) {
            console.log("patient found");
            res.locals.patient = patient;
            next();
        }
        else {
            console.log("Error: Patient not found");
            res.sendStatus(500);
        }
    })
        .catch((e) => {
        console.log("MongoDB query error");
        console.log(e.stack);
        res.sendStatus(500);
    });
};
