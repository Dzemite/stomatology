import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { APP_CONFIG } from "../config";
import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/IUser";

const jwt = require('jsonwebtoken');

export const authorize = (req: Request, res: Response, next: () => void) => {

    const userEnter = jwt.verify(req.body.token, APP_CONFIG.jwtSecret);
 
    if (userEnter || userEnter.username || userEnter.password) {
        res.sendStatus(403);
        return;
    }
 
    return UserModel.findOne({
        username: userEnter.username
    })
        .then((user: IUser) => {
            if (user.password === userEnter.password) {
                jwt.sign({ user: user }, APP_CONFIG.jwtSecret, (err: any, token: any) => {
                    res.locals.token = token;
                    next();
                });
            } else {
                res.sendStatus(403);
            }
        })
        .catch((err: MongoError) => {
            res.status(404);
            res.json({ error: "User isn't found." });
        });
}