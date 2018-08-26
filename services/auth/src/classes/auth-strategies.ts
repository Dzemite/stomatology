import * as passport from "passport";
import { AppConfig } from "../interfaces/app-config";

let WindowsStrategy = require("passport-windowsauth");
import { Strategy as LocalStrategy, VerifyFunction, IVerifyOptions} from "passport-local";
import { User } from "../interfaces/user";
import { APP_CONFIG } from "../config";
import { UserModel } from "../models/user.model";
import { Document, Model } from "mongoose";
import { AuthStrategy } from "../enums/auth-strategy";
import { Request } from "express";

export class AuthStrategies{
    public static initStatrategies(): void {
        passport.use(new LocalStrategy(
            {
                usernameField: "login",
                passwordField: "password",
                passReqToCallback: true
            },
            (req: Request, username: string, password: string, done: any) => {
                UserModel.findOne({
                    username: username
                })
                .then((user: User) => {
                    if (user) {
                        req.body = user.toJSON();
                        return done(null, user.toJSON());
                    } else {
                        return done(null, false);
                    }
                });
            }
        ));
        if (APP_CONFIG.authStrategy === AuthStrategy.ad) {
            passport.use(new WindowsStrategy({
                integrated: false,
                usernameField: "login",
                passwordField: "password",
                ldap: APP_CONFIG.adConfig,
                passReqToCallback: true
              }, function (req: Request, profile: any, done: any) {
                  if (!profile) {
                    return done(null, false);
                  }
                if (profile) {
                    const ldapProfileId = profile.id || profile._json.uid;
                    const ldapProfileDepartment = profile._json.department || profile._json.ou;
                    const ldapProfileDisplayName = profile.displayName || profile._json.cn;
                    const ldapProfileUserName = profile._json.sAMAccountName || profile._json.uid;
                    const ldapProfileUserMail = profile._json.mail || profile._json.userPrincipalName || `${ldapProfileUserName}@nomail.com`;
                    UserModel.findOne({
                        ldapId: ldapProfileId
                    }).then((model: User) => {
                        if (model) {
                            req.body = model.toJSON();
                            return done(null, model.toJSON());
                        } else {
                            const newModel = new UserModel({
                                ldapId: ldapProfileId,
                                username: ldapProfileUserName,
                                displayName: ldapProfileDisplayName,
                                departamentDisplayName: ldapProfileDepartment,
                                permissions: [],
                                mail: ldapProfileUserMail
                            });
                            newModel.save().then((model: User) => {
                                req.body = model.toJSON();
                                return done(null, model.toJSON());
                            })
                            .catch((err: Error) => {
                                done(err, false);
                            });
                        }
                    })
                    .catch((err: Error) => {
                        done(err, false);
                    });
                } else {
                    return done(null, false);
                }
              }));
        }
    }
}