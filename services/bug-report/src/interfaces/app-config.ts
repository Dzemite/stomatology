export interface AppConfig {
    /**
     * Номер порта, число
     */
    port: number;

    /**
     * URL для авторизации в Forms
     */
    authUrl: string;

    /**
     * 
     */
    jwtSecret: string;

    /**
     * Host для подключения к Jira
     */    
    jiraHost: string;

    /**
     * Данные авторизации в Jira
     */
    jiraAuthConfig: iJiraAuthConfig;

    /**
     * Дефолтные настройки для отправки бага(таски) в Jira
     */
    defaultJiraConfig: iDefaultJiraConfig;

    /**
     * Название инстанса на котором развернут сервис
     */
    instanceName: string;
}

export interface iDefaultJiraConfig {
    serviceDeskId: string,
    requestTypeId: string,
    requestFieldValues: iRequestFieldValues,
    requestParticipants: Array<String>,
    raiseOnBehalfOf: string
}

interface iRequestFieldValues {
    summary: string,
    description: string
}
interface iJiraAuthConfig {
    username: string;
    password: string;
}