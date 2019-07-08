"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pd_model_1 = require("../models/pd.model");
const archive_pd_model_1 = require("../models/archive-pd.model");
exports.deletePatient = (req, res) => {
    console.log("Start to delete patient.");
    const patientId = '' + req.params.id;
    const now = new Date().getTime();
    if (res.locals.user.computedPermissions.indexOf("pd-proxy_write") === -1) {
        res.statusCode = 403;
        res.json({ msg: "Не хватает прав доступа для редактирования персональных данных." });
        return;
    }
    if (!patientId) {
        res.statusCode = 400;
        res.json({ err: `Не передан код пациента.` });
        return;
    }
    console.log(`Find patient with id ${patientId}`);
    pd_model_1.PDModel.findOne({ _id: patientId }, (err, patient) => {
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
        archive_pd_model_1.ArchivePDModel.insertMany([patient])
            .then(() => {
            console.log("Delete patient from BD.");
            pd_model_1.PDModel.deleteOne({ _id: patientId }, (err) => {
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
    });
};
