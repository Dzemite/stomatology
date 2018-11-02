import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { APP_CONFIG } from "../config";
import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/IUser";

import jwt = require('jsonwebtoken');

export const createUser = (req: Request, res: Response, next: () => void) => {
    
    if (!req.params.jwt) {
        return;
    }
    
    const userEnter = jwt.verify(req.params.jwt, APP_CONFIG.jwtSecret); 

    // if (userEnter || userEnter.login || userEnter.password) {
    //     res.sendStatus(403);
    //     return;
    // }

    res.json({a : 'a'});
    
}