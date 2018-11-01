"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config_1 = require("../config");
const mongoose = require("mongoose");
const patient_get_middleware_1 = require("../middleware/patient-get.middleware");
const get_patient_1 = require("../routes/get-patient");
class Server {
    _connectToDb() {
        return mongoose.connect(config_1.APP_CONFIG.mongoDbUrl);
    }
    start() {
        console.log('start server');
        console.log(`Connecting to MongoDB at address ${config_1.APP_CONFIG.mongoDbUrl}`);
        this._connectToDb()
            .then(() => {
            console.log("Connected");
            this._app.listen(config_1.APP_CONFIG.port);
            console.log("server started at port " + config_1.APP_CONFIG.port);
        })
            .catch((err) => {
            console.error(err);
        });
    }
    constructor() {
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.use(cors({
            origin: "*",
            exposedHeaders: [
                'Content-Range'
            ]
        }));
        this._app.options("*", cors());
        this._app.use(cookieParser());
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));
        this._app.get("/patient/:id", patient_get_middleware_1.patientGet);
        this._app.get("/patient/:id", get_patient_1.getPatient);
        // this._app.use("/rest/*", authorize(APP_CONFIG.jwtSecret));
        // this._app.use("/rest/*", permissionsGet);
        // this._app.use("/rest", (new PermissionChecker()).router);
        // this._app.use(
        //     "/rest/users", (new MongooseHandler<User>(UserModel, "username")).getRouter());
        // this._app.use(
        //     "/rest/permissions", (new MongooseHandler<Permission>(PermissionModel, "name")).getRouter());
    }
}
exports.Server = Server;
