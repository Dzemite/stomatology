"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pd_model_1 = require("../models/pd.model");
exports.createPatient = (req, res) => {
    if (res.locals.user.computedPermissions.indexOf("pd-proxy_write") === -1) {
        res.statusCode = 403;
        res.json({ msg: "Не хватает прав доступа для редактирования пациентов." });
        return;
    }
    console.log("Start to create new patient.");
    const now = new Date().getTime();
    let patient = req.body;
    console.log("Check if patient with similar id is exist.");
    if (patient._id) {
        pd_model_1.PDModel.findOne({ _id: patient._id }, (err, patient) => {
            if (err) {
                res.statusCode = 500;
                res.json({ err });
            }
            if (patient) {
                res.json({ msg: `Пациент с указанным кодом ${patient._id} уже существует.` });
            }
        });
    }
    patient.version = 1;
    patient.createdAt = now;
    patient.createdById = res.locals.user.id;
    patient.updatedAt = now;
    patient.updatedById = res.locals.user.id;
    pd_model_1.PDModel.insertMany([patient])
        .then((patient) => {
        console.log("Patient created.");
        res.statusCode = 200;
        res.json({ pd: patient });
        return;
    })
        .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
};
