import { AuthStrategy } from "../enums/auth-strategy";
import { AdConfig } from "./ad-config";

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
     * Стратегия авторизации, возможные значения:
     * * AuthStrategy.local - локальная авторизация через константу с двумя тестовыми юзерами
     * * AuthStrategy.ad - авторизация через Active Directory
     */
    authStrategy: AuthStrategy;

    /**
     * Конфигурация ActiveDirectory
     */
    adConfig?: AdConfig;

    /**
     * Адрес подключения к mongoDb
     */
    mongoDbUrl: string;
}