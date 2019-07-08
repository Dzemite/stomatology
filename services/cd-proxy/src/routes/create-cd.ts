import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { cd } from "../interfaces/cd";
import { CDModel } from "../models/cd.model";

export const createCD = (req: Request, res: Response) => {

    if (res.locals.user.computedPermissions.indexOf("cd-proxy_write") === -1) {
        res.statusCode = 403;
        res.json({msg: "Не хватает прав доступа для редактирования клинических данных."});
        return;
    }

    console.log("Start to create new cd.");
    const now: number = new Date().getTime();

    let cd: cd = req.body as cd;

    console.log("Check if cd with similar id is exist.");
    if (cd._id) {
        CDModel.findOne({ _id: cd._id }, (err: Error, cd: cd) => {
            if (err) {
                res.statusCode = 500;
                res.json({ err });
            }
            if (cd) {
                res.json({ msg: `Клинические данные с указанным кодом ${cd._id} уже существуют.` });
            }
        });
    }

    cd.version = 1;
    cd.createdAt = now;
    cd.createdById = res.locals.user.id;
    cd.updatedAt = now;
    cd.updatedById = res.locals.user.id;

    CDModel.insertMany([cd])
    .then((cd) => {
        console.log("CD created.");

        res.statusCode = 200;
        res.json({cd: cd});
        return;
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}