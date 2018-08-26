import { Server } from "./classes/server";
import { APP_CONFIG } from "./config";

const server = new Server();

/**
 * Порт на котором сервис будет принимать запросы. По умолчанию 7070.
 */
const SERVICE_PORT: number = parseInt(process.env.SERVICE_PORT) || APP_CONFIG.port;

/**
 * Запускает сервер.
 */
(async function bootstrap() {
    try {
        await new Server().start(SERVICE_PORT);
        console.log("server started at port:  " + SERVICE_PORT);
    } catch (error) {
        console.log("Failed to start server.", error);
        process.exit(1);
    }
})();
