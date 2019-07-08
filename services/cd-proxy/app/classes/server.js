"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config_1 = require("../config");
const mongoose = require("mongoose");
const check_authorize_1 = require("../middleware/check-authorize");
const version_list_1 = require("../routes/version-list");
const cd_list_1 = require("../routes/cd-list");
const create_cd_1 = require("../routes/create-cd");
const update_cd_1 = require("../routes/update-cd");
const delete_cd_1 = require("../routes/delete-cd");
class Server {
    start() {
        console.log("start server");
        console.log(`Connecting to MongoDB at address ${config_1.APP_CONFIG.mongoDbUrl}`);
        mongoose.connect(config_1.APP_CONFIG.mongoDbUrl)
            .then(() => {
            console.log("Connected");
            this._app.listen(config_1.APP_CONFIG.port);
            console.log(`Server started at port ${config_1.APP_CONFIG.port}`);
        })
            .catch((err) => {
            console.error(err);
        });
    }
    constructor() {
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));
        this._app.use(cors({
            origin: "*",
            exposedHeaders: [
                "Content-Range"
            ]
        }));
        this._app.options("*", cors());
        this._app.all("*", check_authorize_1.checkAuthorize);
        /**
        * Просмотр списка (подразумевает поддержку поиска по параметрам, постраничный вывод, сортировку),
        * создание,
        * изменение,
        * удаление,
        * просмотр списка версий (подразумевает указание автора и момента времени изменения).
        */
        this._app.get("/cd-list", cd_list_1.cdList);
        this._app.post("/create", create_cd_1.createCD);
        this._app.post("/update", update_cd_1.updateCd);
        this._app.delete("/delete/:id", delete_cd_1.deleteCd);
        this._app.get("/version-list/:id", version_list_1.versionList);
    }
}
exports.Server = Server;
