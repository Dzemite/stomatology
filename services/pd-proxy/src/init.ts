import * as mongoose from "mongoose";
import { APP_CONFIG } from "./config";
import { MongoError } from "mongodb";
import { pd } from "./interfaces/pd";
import { PDModel } from "./models/pd.model";

console.log(`Connecting to MongoDB at address ${APP_CONFIG.mongoDbUrl}`);
mongoose.connect(APP_CONFIG.mongoDbUrl)
    .then(() => {
        console.log("Connected");

        let superuserPromise: Promise<pd> = PDModel.findOne({
            username: "superuser"
        })
        .then((user: pd) => {
            if (user) {
                console.log("Superuser found");
                return user;
            } else {
                console.log("Superuser not found, creating");
                const PD = new PDModel({
                    username: "superuser",
                    password: "U3VQZVJ1U2VS",
                    displayName: "Суперпользователь",
                    permissions: [],
                    mail: "email@example.com"
                });
                return PD.save();
            }
        })
        .catch(
            (e: MongoError) => {
                console.log("MongoDB query error");
                console.log(e.stack);
                return null;
            }
        );
    })
    .catch((e: MongoError) => {
        console.log("MongoDB connection error");
        console.log(e.stack);
    });