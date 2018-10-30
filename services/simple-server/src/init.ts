import * as mongoose from "mongoose";
import { APP_CONFIG } from "./config";
import { MongoError } from "mongodb";

console.log(`Connecting to MongoDB at address ${APP_CONFIG.mongoDbUrl}`);
mongoose.connect(APP_CONFIG.mongoDbUrl).then(() => {
    console.log("Connected");
})
.catch((e: MongoError) => {
    console.log("MongoDB connection error");
    console.log(e.stack);
});