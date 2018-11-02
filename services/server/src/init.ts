import * as mongoose from "mongoose";
import { APP_CONFIG } from "./config";
import { MongoError } from "mongodb";
import { IUser } from "./interfaces/IUser";
import { UserModel } from "./models/user.model";

console.log(`Connecting to MongoDB at address ${APP_CONFIG.mongoDbUrl}`);
mongoose.connect(APP_CONFIG.mongoDbUrl)
    .then(() => {
        console.log("Connected");

        let superuserPromise: Promise<IUser> = UserModel.findOne({
            username: "superuser"
        })
        .then((user: IUser) => {
            if (user) {
                console.log("Superuser found");
                return user;
            } else {
                console.log("Superuser not found, creating");
                const newUserModel = new UserModel({
                    username: "superuser",
                    password: "U3VQZVJ1U2VS",
                    displayName: "Суперпользователь",
                    permissions: [],
                    mail: "email@example.com"
                });
                return newUserModel.save();
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