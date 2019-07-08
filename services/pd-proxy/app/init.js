"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("./config");
const pd_model_1 = require("./models/pd.model");
console.log(`Connecting to MongoDB at address ${config_1.APP_CONFIG.mongoDbUrl}`);
mongoose.connect(config_1.APP_CONFIG.mongoDbUrl)
    .then(() => {
    console.log("Connected");
    let superuserPromise = pd_model_1.PDModel.findOne({
        username: "superuser"
    })
        .then((user) => {
        if (user) {
            console.log("Superuser found");
            return user;
        }
        else {
            console.log("Superuser not found, creating");
            const PD = new pd_model_1.PDModel({
                username: "superuser",
                password: "U3VQZVJ1U2VS",
                displayName: "Суперпользователь",
                permissions: [],
                mail: "email@example.com"
            });
            return PD.save();
        }
    })
        .catch((e) => {
        console.log("MongoDB query error");
        console.log(e.stack);
        return null;
    });
})
    .catch((e) => {
    console.log("MongoDB connection error");
    console.log(e.stack);
});
