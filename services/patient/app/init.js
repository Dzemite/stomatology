"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("./config");
console.log(`Connecting to MongoDB at address ${config_1.APP_CONFIG.mongoDbUrl}`);
mongoose.connect(config_1.APP_CONFIG.mongoDbUrl).then(() => {
    console.log("Connected");
})
    .catch((e) => {
    console.log("MongoDB connection error");
    console.log(e.stack);
});
