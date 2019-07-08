"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
console.log("loading config...");
exports.APP_CONFIG = JSON.parse(fs.readFileSync(`${__dirname}/../config/config.json`).toString());
