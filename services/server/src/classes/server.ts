import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { Application, Request, Response } from "express";
import { APP_CONFIG } from "../config";
import * as mongoose from "mongoose";
import { patientGet } from "../middleware/patient-get.middleware";
import { getPatient } from "../routes/get-patient";
import { jwtCheck } from "../middleware/jwt-check.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { authorizeRoute } from "../routes/authorize.route";
import { createUser } from "../middleware/createUser.middleware";

export class Server {

    private _app: Application;

    private _connectToDb() {
        return mongoose.connect(APP_CONFIG.mongoDbUrl);
    }

    public start(): void {
        console.log('start server');

        console.log(`Connecting to MongoDB at address ${APP_CONFIG.mongoDbUrl}`);
        this._connectToDb()
            .then(() => {
                console.log("Connected")
                this._app.listen(APP_CONFIG.port);
                console.log("server started at port " + APP_CONFIG.port);
            })
            .catch((err: Error) => {
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

        this._app.post("/auth", authorize);
        this._app.post("/auth", authorizeRoute);
        
        this._app.post("/createUser", createUser);


        this._app.all('/api/*', jwtCheck);

        this._app.get("/api/patient/:id", patientGet);
        this._app.get("/api/patient/:id", getPatient);

        // this._app.use("/rest/*", authorize(APP_CONFIG.jwtSecret));
        // this._app.use("/rest/*", permissionsGet);
        // this._app.use("/rest", (new PermissionChecker()).router);
        // this._app.use(
        //     "/rest/users", (new MongooseHandler<User>(UserModel, "username")).getRouter());

        // this._app.use(
        //     "/rest/permissions", (new MongooseHandler<Permission>(PermissionModel, "name")).getRouter());
    }
}