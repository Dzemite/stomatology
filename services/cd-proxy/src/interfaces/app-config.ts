export interface AppConfig {
    /**
     * Номер порта, число
     */
    port: number;

    /**
     * Ключик для кодирования/декодирования jwt
     */
    jwtSecret: string;

    /**
     * Адрес подключения к mongoDb
     */
    mongoDbUrl: string;
    
    /**
     * Настройки для mongodb
     */
    mongoCollectionName: string;

    /**
     * Архив для хранения предыдущих версий персональных данных пациента.
     */
    mongoArchiveCollectionName: string;

    /**
     * Адрес сервиса авторизации.
     */
    authServiceUrl: string;

    /**
     * Токен авторизации в данном сервисе.
     */
    authToken?: string;
}