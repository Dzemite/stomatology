"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pd_model_1 = require("../models/pd.model");
const archive_pd_model_1 = require("../models/archive-pd.model");
exports.updatePatient = (req, res) => {
    console.log("Start to update new patient.");
    const now = new Date().getTime();
    if (res.locals.user.computedPermissions.indexOf("pd-proxy_write") === -1) {
        res.statusCode = 403;
        res.json({ msg: "Не хватает прав доступа для редактирования персональных данных." });
        return;
    }
    let newPatientData = req.body;
    let patientId = newPatientData._id;
    delete newPatientData._id;
    if (Object.keys(newPatientData).length === 0) {
        res.statusCode = 400;
        res.json({ err: "Не переданы обновляемые поля пациента." });
        return;
    }
    if (!patientId) {
        res.statusCode = 400;
        res.json({ err: "Не передан код пациента." });
        return;
    }
    console.log("Find the patient in DB.");
    pd_model_1.PDModel.findOne({ _id: patientId }, (err, patient) => {
        if (err) {
            res.statusCode = 404;
            res.json({ err: `Пациент с кодом ${patientId} не найден.` });
            return;
        }
        if (patient.deleted) {
            res.statusCode = 400;
            res.json({ msg: "Пациент был удален и не может быть обновлен." });
            return;
        }
        if (!patient.id) {
            patient.id = patient._id;
        }
        delete patient._doc._id;
        console.log("Insert to archive.");
        archive_pd_model_1.ArchivePDModel.insertMany([patient])
            .then(() => {
            console.log("Configurate new patient.");
            for (const key in newPatientData) {
                if (newPatientData.hasOwnProperty(key)) {
                    patient[key] = newPatientData[key];
                }
            }
            patient.updatedAt = now;
            patient.updatedById = res.locals.user._id;
            patient.version += 1;
            console.log("Save new version of patient.");
            pd_model_1.PDModel.updateOne({ _id: patientId }, patient, (err) => {
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