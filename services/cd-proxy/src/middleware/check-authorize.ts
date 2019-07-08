import { Request, Response } from "express";
import { APP_CONFIG } from "../config";
import { MongoError } from "mongodb";

const request = require("superagent");

export const checkAuthorize = (req: Request, res: Response, next: () => void) => {
    console.log('Start to check authorization.');
    const token: string = req.headers["authorization"] as string;

    if (typeof token !== 'undefined') {
        request.get(`${APP_CONFIG.authServiceUrl}/auth`)
        .set("Authorization", token)
        .end((err: any, response: any) => {
            if (err){
                res.statusCode = err.status ? err.status : 500;
                res.json({err});
            } else {
                console.log('User found.');
                res.locals.user = response.body;
                next();
            }
        });
    } else {
        console.log("Can't find authorization header.");
        res.sendStatus(403);
    }
}