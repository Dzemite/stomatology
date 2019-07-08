import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { pd } from "../interfaces/pd";
import { PDModel } from "../models/pd.model";

export const createPatient = (req: Request, res: Response) => {
    
    if (res.locals.user.computedPermissions.indexOf("pd-proxy_write") === -1) {
        res.statusCode = 403;
        res.json({msg: "Не хватает прав доступа для редактирования пациентов."});
        return;
    }

    console.log("Start to create new patient.");
    const now: number = new Date().getTime();

    let patient: pd = req.body;

    console.log("Check if patient with similar id is exist.");
    if (patient._id) {
        PDModel.findOne({ _id: patient._id }, (err: Error, patient: pd) => {
            if (err) {
                res.statusCode = 500;
                res.json({ err });
            }
            if (patient) {
                res.json({ msg: `Пациент с указанным кодом ${patient._id} уже существует.` });
            }
        });
    }

    patient.version = 1;
    patient.createdAt = now;
    patient.createdById = res.locals.user.id;
    patient.updatedAt = now;
    patient.updatedById = res.locals.user.id;

    PDModel.insertMany([patient])
    .then((patient) => {
        console.log("Patient created.");
        
        res.statusCode = 200;
        res.json({pd: patient});
        return;
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}