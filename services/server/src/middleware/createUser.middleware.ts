import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { APP_CONFIG } from "../config";
import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/IUser";

import jwt = require('jsonwebtoken');

export const createUser = (req: Request, res: Response, next: () => void) => {

    if (!req.body.jwt) {
        // res.sendStatus(400);
        console.log(req.body.jwt);
        return;
    }

    // const userEnter = jwt.verify(req.body.jwt, APP_CONFIG.jwtSecret); 

    // if (userEnter || userEnter.login || userEnter.password) {
    //     res.sendStatus(403);
    //     return;
    // }

    UserModel.findOne({
        username: 'superuser'
    })
        .then(user => {
            console.log({user});
            const token =  jwt.sign({user}, APP_CONFIG.jwtSecret);
            res.json({ token });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });

}