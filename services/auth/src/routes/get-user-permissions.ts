import { Request, Response } from "express";

export const getUserPermissions = (req: Request, res: Response) => {
    res.json(res.locals.permissions);
};