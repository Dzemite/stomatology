import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { APP_CONFIG } from "../config";

export const jwtCheck = (req: Request, res: Response, next: () => void) => {
    const token: string = req.headers["x-forms-jwt"] as string;
    if (!token || !jwt.verify(token, APP_CONFIG.jwtSecret)) {
        res.status(403);
        res.send();
    } else {
        next();
    }
}