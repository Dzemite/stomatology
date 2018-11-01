"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatient = (req, res) => {
    res.json(res.locals.patient);
};
