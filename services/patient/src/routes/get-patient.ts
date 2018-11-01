import { Request, Response } from "express";

export const getPatient = (req: Request, res: Response) => {
    res.json(res.locals.patient);
};