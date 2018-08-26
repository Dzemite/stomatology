import { Request, Response } from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import { User } from "../interfaces/user";
import { APP_CONFIG } from "../config";

export const authenticateRoute = (req: Request, res: Response) => {
    if (!res.locals.user) {
        res.sendStatus(401);
    } else {
        res.json(res.locals.user);
    }
};