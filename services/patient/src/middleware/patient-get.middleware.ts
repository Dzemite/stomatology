import { Patient } from "../interfaces/patient";
import { PatientModel } from "../models/patient.model";
import { Request, Response } from "express";
import { MongoError } from "mongodb";

export const patientGet = (req: Request, res: Response,  next: () => void) => {
    const patientId = req.params.id;

    if (!patientId) {
        res.sendStatus(403);
    }

    return PatientModel.findOne({
        _id: patientId
    })
        .then((patient: Patient) => {
            if (patient) {
                console.log("patient found");
                res.locals.patient = patient;
                next();
            } else {
                console.log("Error: Patient not found");
                res.sendStatus(500);
            }
        })
        .catch(
            (e: MongoError) => {
                console.log("MongoDB query error");
                console.log(e.stack);
                res.sendStatus(500);
            }
        )
}
