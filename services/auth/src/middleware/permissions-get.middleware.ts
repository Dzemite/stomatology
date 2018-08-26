import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user";
import { Permission } from "../interfaces/permission";
import { PermissionModel } from "../models/permission.model";

export const permissionsGet = (req: Request, res: Response, next: () => void) => {
    const currentUser: User = (res.locals.user || req.body) as User;
    if (!currentUser || !currentUser.username) {
        res.sendStatus(403);
    }
    return UserModel.findOne({
        username: currentUser.username
    })
    .then((user: User) => {
        user.permissions = user.permissions || [];
        return PermissionModel.find({
            _id: {
                $in: user.permissions
            }
        })
        .then((permissons: Permission[]) => {
            res.locals.permissions = permissons;
            next();
        })
        .catch((err: Error) => {
            console.error(err);
            res.sendStatus(500);
        });
    })
    .catch((err: Error) => {
        console.error(err);
        res.sendStatus(500);
    });
}