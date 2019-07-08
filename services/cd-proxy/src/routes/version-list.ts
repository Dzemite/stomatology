import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { cd } from "../interfaces/cd";
import { CDModel } from "../models/cd.model";
import { ArchiveCDModel } from "../models/archive-cd.model";

export const versionList = (req: Request, res: Response) => {

    if (res.locals.user.computedPermissions.indexOf("cd-proxy_read") === -1) {
        res.statusCode = 403;
        res.json({msg: "Не хватает прав доступа для просмотра клинических данных."});
        return;
    }

    console.log("Start to get versions of cd.");
    const cdId: string = '' + req.params.id;

    let history: any[] = [];

    if (!cdId) {
        res.statusCode = 400;
        res.json({ err: `Не передан код клинических данных.` });
        return;
    }

    ArchiveCDModel.find({ id: cdId }, (err: MongoError, patients: cd[]) => {
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

        CDModel.findOne({ _id: cdId }, (err: MongoError, patient: cd) => {
            if (err) {
                res.statusCode = 404;
                res.json({ err: `Клинические данные с кодом ${cdId} не найден.` });
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