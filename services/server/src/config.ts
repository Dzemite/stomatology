import { AppConfig } from "./interfaces/app-config";
import * as fs from "fs";

console.log("loading config...");
export const APP_CONFIG: AppConfig = JSON.parse(fs.readFileSync(`${__dirname}/../config/config.json`).toString());