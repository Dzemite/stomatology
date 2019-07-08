import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { cd } from "../interfaces/cd";
import { CDModel } from "../models/cd.model";
import { ArchiveCDModel } from "../models/archive-cd.model";

export const updateCd = (req: Request, res: Response) => {
    console.log("Start to update new cd.");
    const now: number = new Date().getTime();

    if (res.locals.user.computedPermissions.indexOf("cd-proxy_write") === -1) {
        res.statusCode = 403;
        res.json({msg: "Не хватает прав доступа для редактирования клинических данных."});
        return;
    }

    let newClinicData = req.body;
    let cdId = newClinicData._id;
    delete newClinicData._id;

    if (Object.keys(newClinicData).length === 0) {
        res.statusCode = 400;
        res.json({ err: "Не переданы обновляемые поля клинических данных." });
        return;
    }
    if (!cdId) {
        res.statusCode = 400;
        res.json({ err: "Не передан код клинических данных." });
        return;
    }

    console.log("Find the cd in DB.");
    CDModel.findOne({ _id: cdId }, (err: MongoError, cd: cd) => {
        if (err) {
            res.statusCode = 404;
            res.json({ err: `Клинические даннык с кодом ${cdId} не найдены.` });
            return;
        }
        if (cd.deleted) {
            res.statusCode = 400;
            res.json({ msg: "Клинические данные были удалены и не могут быть обновлены." });
            return;
        }

        if (!cd.id) {
            cd.id = cd._id;
        }

        // delete cd._doc._id;  
        delete cd._id;  

        console.log("Insert to archive.");
        ArchiveCDModel.insertMany([cd])
            .then(() => {
                console.log("Configurate new cd.");
                for (const key in newClinicData) {
                    if (newClinicData.hasOwnProperty(key)) {
                        cd[key] = newClinicData[key];
                    }
                }
                cd.updatedAt = now;
                cd.updatedById = res.locals.user._id;
                cd.version += 1;

                console.log("Save new version of cd.");
                CDModel.updateOne({_id: cdId}, cd, (err: MongoError) => {
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