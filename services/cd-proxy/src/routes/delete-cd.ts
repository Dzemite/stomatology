import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { cd } from "../interfaces/cd";
import { CDModel } from "../models/cd.model";
import { ArchiveCDModel } from "../models/archive-cd.model";

export const deleteCd = (req: Request, res: Response) => {
    console.log("Start to delete cd.");
    const cdId: string = ''+req.params.id;
    const now: number = new Date().getTime();

    if (res.locals.user.computedPermissions.indexOf("cd-proxy_write") === -1) {
        res.statusCode = 403;
        res.json({msg: "Не хватает прав доступа для редактирования клинических данных."});
        return;
    }

    if (!cdId) {
        res.statusCode = 400;
        res.json({ err: `Не передан код клинических данных.` });
        return;
    }

    console.log(`Find cd with id ${cdId}`);
    CDModel.findOne({ _id: cdId }, (err: MongoError, cd: cd) => {
        if (err) {
            res.statusCode = 404;
            res.json({ err: `Клинические данные с кодом ${cdId} не найден.` });
            return;
        }
        if (cd.deleted) {
            res.statusCode = 400;
            res.json({ msg: `Клинические данные с id ${cdId} уже удален.` });
            return;
        }

        if (!cd.id) {
            cd.id = cd._id;
        }

        // delete cd._doc._id;
        delete cd._id;

        cd.updatedAt = now;
        cd.updatedById = res.locals.user._id;
        cd.deleted = true;

        console.log("Insert to archive.");
        ArchiveCDModel.insertMany([cd])
            .then(() => {

                console.log("Save new version of cd.");
                CDModel.deleteOne({_id: cdId}, (err: MongoError) => {
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