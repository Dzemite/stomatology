import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { pd } from "../interfaces/pd";
import { PDModel } from "../models/pd.model";
import { ArchivePDModel } from "../models/archive-pd.model";

export const deletePatient = (req: Request, res: Response) => {
    console.log("Start to delete patient.");
    const patientId: string = ''+req.params.id;
    const now: number = new Date().getTime();

    if (res.locals.user.computedPermissions.indexOf("pd-proxy_write") === -1) {
        res.statusCode = 403;
        res.json({msg: "Не хватает прав доступа для редактирования персональных данных."});
        return;
    }

    if (!patientId) {
        res.statusCode = 400;
        res.json({ err: `Не передан код пациента.` });
        return;
    }

    console.log(`Find patient with id ${patientId}`);
    PDModel.findOne({ _id: patientId }, (err: MongoError, patient: pd) => {
        if (err) {
            res.statusCode = 404;
            res.json({ err: `Пациент с кодом ${patientId} не найден.` });
            return;
        }
        if (patient.deleted) {
            res.statusCode = 400;
            res.json({ msg: `Пациент с id ${patientId} уже удален.` });
            return;
        }

        if (!patient.id) {
            patient.id = patient._id;
        }

        delete patient._doc._id;

        patient.updatedAt = now;
        patient.updatedById = res.locals.user._id;
        patient._doc.deleted = true;

        console.log("Insert to archive.");
        ArchivePDModel.insertMany([patient])
            .then(() => {

                console.log("Delete patient from BD.");
                PDModel.deleteOne({_id: patientId}, (err: MongoError) => {
                    if (err) {
                        res.statusCode = 500;
                        res.json({ err });
                        return;
                    }

                    res.sendStatus(200);
                    return;
                });
            })
            .catch((err) => {
                res.statusCode = 500;
                res.json({ err });
                return;
            });

    })
}