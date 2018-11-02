import { Request, Response } from "express";

export const authorizeRoute = (req: Request, res: Response) => {
    res.json(res.locals.tocken);
};