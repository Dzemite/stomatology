import * as express from "express";
import * as cors from "cors";
import * as logger from "morgan";
import * as http from "http";
import { Application, Request, Response } from "express";
import { APP_CONFIG } from "../config";
import { verifyToken } from "../middleware/verify-token";
import { sendTaskToJira } from "../functions/send-task";
import { permissionCheck } from "../middleware/permission-check";

export class Server {
    private _application: express.Application;
    private jwtSecret: string = APP_CONFIG.jwtSecret;

    public start( port: number): Promise<Server> {
        const self: Server = this;
        
        self._application = express();
        
        return new Promise<Server>((resolve, reject) => {
            const server = http.createServer(self._application);
            server.on("error", (error: Error) => {
                reject(error);
            });
            server.on("listening", () => {
                resolve(self);
            });    

            this._application.use(cors({
                origin: "*",
                exposedHeaders: [
                    'Content-Range'
                ]
            }));
            this._application.options("*", cors());
    
            self._application.use(express.json());
            self._application.use(logger("dev"));

            self._application.get("*", verifyToken(this.jwtSecret));
            self._application.post("*", verifyToken(this.jwtSecret));
            self._application.put("*", verifyToken(this.jwtSecret));
            self._application.delete("*", verifyToken(this.jwtSecret));
            self._application.patch("*", verifyToken(this.jwtSecret));

            self._application.get("*", permissionCheck);
            self._application.post("*", permissionCheck);
            self._application.put("*", permissionCheck);
            self._application.delete("*", permissionCheck);
            self._application.patch("*", permissionCheck);

            self._application.post("/report/bug/", sendTaskToJira);

            server.listen(port);
        });
    }
}

// FORMS project id = "10615"