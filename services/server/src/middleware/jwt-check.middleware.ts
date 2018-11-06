import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { APP_CONFIG } from "../config";

export const jwtCheck = (req: Request, res: Response, next: () => void) => {
    let token: string = req.headers["x-dontiatros-jwt"] as string;

    if (typeof token !== 'undefined') {
        token = token.split(' ')[1];

        if (!token && !jwt.verify(token, APP_CONFIG.jwtSecret)) {
            res.status(403);
            res.redirect("/");
        } else {
            res.locals.token = token;
            next();
        }

    } else {
        res.sendStatus(403);
        res.redirect("/");
    }
}