import { Request, Response } from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import { User } from "../interfaces/user";
import { APP_CONFIG } from "../config";
import { Permission } from "../interfaces/permission";

export const authRoute = (req: Request, res: Response) => {
    const user: User = req.body;
    const permissions: Permission[] = res.locals.permissions;
    user.computedPermissions = permissions.map(val => val.name);
    res.json({
        user: req.body,
        token: jwt.sign(req.body, APP_CONFIG.jwtSecret, {
            expiresIn: "8h"
        })
    });
};