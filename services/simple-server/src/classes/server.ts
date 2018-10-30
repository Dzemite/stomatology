import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { Application, Request, Response } from "express";
import { APP_CONFIG } from "../config";
import * as mongoose from "mongoose";

export class Server {

    private _app: Application;

    private _connectToDb(): Promise<any> {
        return mongoose.connect(APP_CONFIG.mongoDbUrl);
    }
    
    public start(): void {
        console.log('start server');
        this._app.listen(APP_CONFIG.port);
        console.log("server started at port " + APP_CONFIG.port);
        
        // console.log(`Connecting to MongoDB at address ${APP_CONFIG.mongoDbUrl}`);
        // this._connectToDb().then(() => {
        //     console.log("Connected")
        //     this._app.listen(APP_CONFIG.port);
        //     console.log("server started at port " + APP_CONFIG.port);
        // })
        // .catch((err: Error) => {
        //     console.error(err);
        // });
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
        this._app.get("/data", (req: Request, res: Response) => {res.json({message: 'hello'})});
        // this._app.post("/auth", passport.authenticate(APP_CONFIG.authStrategy, {
        //     session: false
        // }));
        // this._app.post("/auth", permissionsGet);
        // this._app.post(
        //     "/auth",
        //     authRoute);
        // this._app.get(
        //     "/auth",
        //     authorize(APP_CONFIG.jwtSecret));
        // this._app.get(
        //     "/auth",
        //     authenticateRoute);

        // this._app.get("/permissions", authorize(APP_CONFIG.jwtSecret));
        // this._app.get("/permissions", permissionsGet);
        // this._app.get("/permissions", getUserPermissions);

        // this._app.use("/rest/*", authorize(APP_CONFIG.jwtSecret));
        // this._app.use("/rest/*", permissionsGet);
        // this._app.use("/rest", (new PermissionChecker()).router);
        // this._app.use(
        //     "/rest/users", (new MongooseHandler<User>(UserModel, "username")).getRouter());

        // this._app.use(
        //     "/rest/permissions", (new MongooseHandler<Permission>(PermissionModel, "name")).getRouter());
    }
}