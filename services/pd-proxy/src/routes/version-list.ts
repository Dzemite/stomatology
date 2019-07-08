import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { pd } from "../interfaces/pd";
import { PDModel } from "../models/pd.model";
import { ArchivePDModel } from "../models/archive-pd.model";

export const versionList = (req: Request, res: Response) => {

    if (res.locals.user.computedPermissions.indexOf("pd-proxy_read") === -1) {
        res.statusCode = 403;
        res.json({msg: "Не хватает прав доступа для просмотра персональных данных."});
        return;
    }

    console.log("Start to get versions of patient.");
    const patientId: string = '' + req.params.id;

    let history: any[] = [];

    if (!patientId) {
        res.statusCode = 400;
        res.json({ err: `Не передан код пациента.` });
        return;
    }

    ArchivePDModel.find({ id: patientId }, (err: MongoError, patients: pd[]) => {
        if (err) {
            res.statusCode = 500;
            res.json({ err });
            return;
        }

        patients.forEach((pat) => {
            history.push({
                updatedAt: pat.updatedAt,
                updatedById: pat.updatedById,
                version: pat.version
            });
        });

        PDModel.findOne({ _id: patientId }, (err: MongoError, patient: pd) => {
            if (err) {
                res.statusCode = 404;
                res.json({ err: `Пациент с кодом ${patientId} не найден.` });
                return;
            }

            history.push({
                updatedAt: patient.updatedAt,
                updatedById: patient.updatedById,
                version: patient.version
            });

            res.statusCode = 200;
            res.json(history); 1
        });
    })
}