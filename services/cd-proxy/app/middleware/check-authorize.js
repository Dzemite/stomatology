"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const request = require("superagent");
exports.checkAuthorize = (req, res, next) => {
    console.log('Start to check authorization.');
    const token = req.headers["authorization"];
    if (typeof token !== 'undefined') {
        request.get(`${config_1.APP_CONFIG.authServiceUrl}/auth`)
            .set("Authorization", token)
            .end((err, response) => {
            if (err) {
                res.statusCode = err.status ? err.status : 500;
                res.json({ err });
            }
            else {
                console.log('User found.');
                res.locals.user = response.body;
                next();
            }
        });
    }
    else {
        console.log("Can't find authorization header.");
        res.sendStatus(403);
    }
};
