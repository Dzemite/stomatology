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
}