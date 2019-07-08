import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Application } from "express";
import { APP_CONFIG } from "../config";
import * as mongoose from "mongoose";
import { createPatient } from "../routes/create-patient";
import { checkAuthorize } from "../middleware/check-authorize";
import { updatePatient } from "../routes/update-patient";
import { deletePatient } from "../routes/delete-patient";
import { versionList } from "../routes/version-list";
import { patientsList } from "../routes/patients-list";

export class Server {

    private _app: Application;

    public start(): void {
        console.log("start server");

        console.log(`Connecting to MongoDB at address ${APP_CONFIG.mongoDbUrl}`);
        mongoose.connect(APP_CONFIG.mongoDbUrl)
            .then(() => {
                console.log("Connected")
                this._app.listen(APP_CONFIG.port);
                console.log(`Server started at port ${APP_CONFIG.port}`);
            })
            .catch((err: Error) => {
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

        this._app.all("*", checkAuthorize);

        /**
        * Просмотр списка (подразумевает поддержку поиска по параметрам, постраничный вывод, сортировку),
        * создание,
        * изменение,
        * удаление,
        * просмотр списка версий (подразумевает указание автора и момента времени изменения).
        */

        this._app.get("/pd-list", patientsList);
        this._app.post("/create", createPatient);
        this._app.post("/update", updatePatient);
        this._app.delete("/delete/:id", deletePatient);
        this._app.get("/version-list/:id", versionList);
    }
}