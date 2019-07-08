"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pd_model_1 = require("../models/pd.model");
const archive_pd_model_1 = require("../models/archive-pd.model");
exports.versionList = (req, res) => {
    if (res.locals.user.computedPermissions.indexOf("pd-proxy_read") === -1) {
        res.statusCode = 403;
        res.json({ msg: "Не хватает прав доступа для просмотра персональных данных." });
        return;
    }
    console.log("Start to get versions of patient.");
    const patientId = '' + req.params.id;
    let history = [];
    if (!patientId) {
        res.statusCode = 400;
        res.json({ err: `Не передан код пациента.` });
        return;
    }
    archive_pd_model_1.ArchivePDModel.find({ id: patientId }, (err, patients) => {
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
        pd_model_1.PDModel.findOne({ _id: patientId }, (err, patient) => {
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
            res.json(history);
            1;
        });
    });
};
