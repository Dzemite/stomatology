import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { APP_CONFIG } from "../config";
import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/IUser";

const jwt = require('jsonwebtoken');

export const authorize = (req: Request, res: Response, next: () => void) => {
    
    const userEnter = jwt.verify(req.params.jwt, APP_CONFIG.jwtSecret); 

    if (userEnter || userEnter.login || userEnter.password) {
        res.sendStatus(403);
        return;
    }

    return UserModel.findOne({
        username: userEnter.login
    })
    .then((user: IUser) => {
        if (user.password === userEnter.password) {
            jwt.sign({user: user}, APP_CONFIG.jwtSecret, (err: any, tocken: any) => {
                res.locals.tocken = tocken;
                next();
            });
        } else {
            res.sendStatus(403);
        }
    })
    .catch((err: MongoError) => {
        res.status(404);
        res.json({error: "User isn't found."});
    });
}