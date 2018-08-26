import { Request, Response } from "express";

export function permissionCheck(request: Request, response: Response, next: () => void) {
    // TODO: проверить есть ли у пользователя пермиссии на отправку жука
    console.log("Check permission for reporting to service desk.");

    next();
}