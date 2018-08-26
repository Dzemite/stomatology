import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

/**
 * Осуществляет проверку переданного JSON Web Token. Токен проверяется на наличие, правильную структуру и
 * на корректность подписи. В случае, если проверка не про
 *
 * @param key Секретный ключ, которым должен быть подписан (зашифрован хеш) токен.
 */
export function verifyToken(key: string): (request: Request, response: Response, next: () => void) => void {
    return function(request: Request, response: Response, next: () => void) {
        const header: string | string[] = request.headers.authorization;
        const headerString: string = "" + (Array.isArray(header) ? header[0] : header);

        const tokenString: string = headerString.replace(/^Bearer /, "");
        if (!tokenString) {
            sendErrorMessage(response, UNAUTHORIZED, "Не передан аутентификационный токен.");
            return;
        }

        let token: any;
        try {
            token = jwt.decode(tokenString);
        } catch (error) {
            sendErrorMessage(response, BAD_REQUEST,
                    "Не удается разобрать переданный аутентификационный токен, вероятно у него нарушена структура.");
            return;
        }

        try {
            jwt.verify(tokenString, key);
        } catch (error) {
            sendErrorMessage(response, BAD_REQUEST,
                    "Не удается разобрать переданный аутентификационный токен, некорректная подпись.");
            return;
        }

        response.locals.user = token;
        response.locals.token = tokenString;

        next();
    }

    /**
     * Отправляет в ответе указанный код статуса HTTP и сообщение.
     *
     * @param response Объект с ответом на HTTP запрос.
     * @param code Код статуса HTTP.
     * @param message Сообщение для пользователя.
     */
    function sendErrorMessage(response: Response, code: number, message: string): void {
        response.statusCode = code;
        response.json({
            name: null,
            message: message,
            stack: null
        });
    }
}

/**
 * Код статуса HTTP в случае некорректно-составленного запроса.
 */
const BAD_REQUEST: number = 400;
/**
 * Код статуса HTTP в случае отсутвия авторизационных данных.
 */
const UNAUTHORIZED = 401;
/**
 * Код статуса HTTP в случае некорректных авторизационных данных.
 */
const FORBIDDEN = 403;
