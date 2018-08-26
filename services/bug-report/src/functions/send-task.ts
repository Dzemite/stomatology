import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { APP_CONFIG } from "../config";
import { iDefaultJiraConfig } from "../interfaces/app-config";

const request = require("superagent");

/**
 * Отправляет задачу в Jira от лица пользователя FORMS
 */
export function sendTaskToJira(req: Request, response: Response) {

    const agent: any = req.headers["user-agent"];
    const authJiraConfig: string = "Basic " + 
        Buffer.from(`${APP_CONFIG.jiraAuthConfig.username}:${APP_CONFIG.jiraAuthConfig.password}`).toString('base64');
    const jiraConfig: iDefaultJiraConfig = APP_CONFIG.defaultJiraConfig as iDefaultJiraConfig;
    const userMail: string = response.locals.user.mail;
    const userName: string = response.locals.user.displayName;

    if(!userMail){
        sendErrorMessage(response, BAD_REQUEST, "Не указана почта в профиле.");
        return;
    };
    jiraConfig.raiseOnBehalfOf = userMail;

    if (req.query["summary"])
        jiraConfig.requestFieldValues.summary = req.query["summary"];

    jiraConfig.requestFieldValues.description = req.query["description"] + "\n\n" +
        "User agent: " + agent + "\n" +
        "Пользователь: " + response.locals.user.displayName + "\n" +
        "Отдел: " + response.locals.user.departamentDisplayName + "\n" +
        "Инстанс: " + APP_CONFIG.instanceName;

    return request.post("https://jira.teh-lab.ru/rest/servicedeskapi/request")
    .send(JSON.stringify(jiraConfig))
    .set("Content-Type", "application/json")
    .set("Authorization", authJiraConfig)
    .end((err: Error, res: Response) => {
        if (err){
            sendErrorMessage(response, BAD_REQUEST, "Баг не отправлен. " + err);
        } else {
            response.statusCode = 200;
            response.json({
                jiraResponse: res
            });
        }
    });    
}

/**
     * Отправляет в ответе указанный код статуса HTTP и сообщение.
     *
     * @param response Объект с ответом на HTTP запрос.
     * @param code Код статуса HTTP.
     * @param message Сообщение для пользователя.
     */
    function sendErrorMessage(response: Response, code: number, message: String): void {
        response.statusCode = code;
        response.json({
            name: null,
            message: message,
            stack: null
        });
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
