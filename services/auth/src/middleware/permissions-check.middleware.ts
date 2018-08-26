import { Request, Response, Router } from "express";
import * as express from "express";
import { User } from "../interfaces/user";
import { Permission } from "../interfaces/permission";
import { PermissionModel } from "../models/permission.model";
import { UserModel } from "../models/user.model";

export class PermissionChecker {
    public get router(): Router {
        const router: Router = express.Router();
        router.get('/:entityName', this._hasPermissionForList.bind(this));
        return router;
    }

    protected _hasPermissionForList(req: Request, res: Response, next: () => void) {
        if ((res.locals.permissions as Permission[]).some(val => val.entityName === req.params.entityName && !val.objectId && val.canRead)) {
            next();
        } else {
            res.sendStatus(403);
        }
    }
}