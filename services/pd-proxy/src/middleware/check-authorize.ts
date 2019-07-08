import { Request, Response } from "express";
import { APP_CONFIG } from "../config";

const request = require("superagent");

export const checkAuthorize = (req: Request, res: Response, next: () => void) => {
    console.log('Start to check authorization.');
    const token: string = req.headers["authorization"] as string;

    if (typeof token !== 'undefined') {
        request.get(`${APP_CONFIG.authServiceUrl}/auth`)
        .set("Authorization", token)
        .end((err: Error, response: any) => {
            if (err){
                res.statusCode = 500;
                res.json({err});
            } else {
                res.locals.user = response.body;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}