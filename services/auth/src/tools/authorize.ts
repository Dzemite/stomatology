import { Request, Response } from "express";

import * as jwt from "jsonwebtoken";

export function authorize(key: string): (request: Request, response: Response, next: () => void) => void {
    return function(request: Request, response: Response, next: () => void) {
        const header: string | string[] = request.headers.authorization;
        const headerString: string = "" + (Array.isArray(header) ? header[0] : header);

        const tokenString: string = headerString.replace(/^Bearer /, "");
        if (!tokenString) {
            response.sendStatus(401);
            return;
        }

        console.log(request.headers);

        let token: any;
        try {
            token = jwt.decode(tokenString);
        } catch (error) {
            response.sendStatus(400);
            console.log(error);
            return;
        }
        jwt.verify(tokenString, key,{algorithms: ['RS256', 'HS256']}, (
            err: jwt.JsonWebTokenError | jwt.NotBeforeError | jwt.TokenExpiredError,
            decoded: object | string) => {
                if (!err) {
                    response.locals.user = token;
                    response.locals.token = tokenString;
                    next();
                } else {
                    switch(err.name) {
                        case "TokenExpiredError":
                            response.sendStatus(401);
                            break;
                        default:
                            console.log(err);
                            response.sendStatus(403);
                    }
                    return;
                }
        });
    }
}