"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cd_model_1 = require("../models/cd.model");
const archive_cd_model_1 = require("../models/archive-cd.model");
exports.versionList = (req, res) => {
    if (res.locals.user.computedPermissions.indexOf("cd-proxy_read") === -1) {
        res.statusCode = 403;
        res.json({ msg: "Не хватает прав доступа для просмотра клинических данных." });
        return;
    }
    console.log("Start to get versions of cd.");
    const cdId = '' + req.params.id;
    let history = [];
    if (!cdId) {
        res.statusCode = 400;
        res.json({ err: `Не передан код клинических данных.` });
        return;
    }
    archive_cd_model_1.ArchiveCDModel.find({ id: cdId }, (err, patients) => {
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
        cd_model_1.CDModel.findOne({ _id: cdId }, (err, patient) => {
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
            res.json(history);
            1;
        });
    });
};
