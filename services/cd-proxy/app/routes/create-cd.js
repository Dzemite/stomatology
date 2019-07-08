"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cd_model_1 = require("../models/cd.model");
exports.createCD = (req, res) => {
    if (res.locals.user.computedPermissions.indexOf("cd-proxy_write") === -1) {
        res.statusCode = 403;
        res.json({ msg: "Не хватает прав доступа для редактирования клинических данных." });
        return;
    }
    console.log("Start to create new cd.");
    const now = new Date().getTime();
    let cd = req.body;
    console.log("Check if cd with similar id is exist.");
    if (cd._id) {
        cd_model_1.CDModel.findOne({ _id: cd._id }, (err, cd) => {
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
    cd_model_1.CDModel.insertMany([cd])
        .then((cd) => {
        console.log("CD created.");
        res.statusCode = 200;
        res.json({ cd: cd });
        return;
    })
        .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
};
