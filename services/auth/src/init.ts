import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { APP_CONFIG } from "./config";
import { MongoError } from "mongodb";
import { UserModel } from "./models/user.model";
import { User } from "./interfaces/user";
import { Permission } from "./interfaces/permission";
import { PermissionModel } from "./models/permission.model";

console.log(`Connecting to MongoDB at address ${APP_CONFIG.mongoDbUrl}`);
mongoose.connect(APP_CONFIG.mongoDbUrl).then(() => {
    console.log("Connected");
    console.log("Searching for superuser");
    let superuserPromise: Promise<User> = UserModel.findOne({
        username: "superuser"
    })
    .then((user: User) => {
        console.log("Superuser found");
        if (user) {
            return user;
        } else {
            console.log("Superuser not found, creating");
            const newUserModel = new UserModel({
                ldapId: "superUser",
                username: "superuser",
                displayName: "Суперпользователь",
                permissions: [],
                departamentDisplayName: "Администраторы системы",
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
    superuserPromise.then((superuser: User) => {
        const permissionsPromises: Promise<Permission>[] = [];
        console.log("searching for permissions...")
        PermissionModel.find({
            name: {
                $in: [
                    'admin_users',
                    'admin_permissions',
                    'system.objects.object-types',
                    'system.objects.object-types.root-write',
                    'system.objects.attribute-types',
                    'system.objects.attribute-types.root-write'
                ]
            }
        }).then((permissions: Permission[]) => {
            console.log("permissions found", permissions.map(val => val.name));
            let permissionsToAdd: Permission[] = [new PermissionModel({
                name: "admin_users",
                displayName: "Управление пользователями",
                entityName: "users",
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true
            }), new PermissionModel({
                name: "admin_permissions",
                displayName: "Управление пермиссиями",
                entityName: "permissions",
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true
            }), new PermissionModel({
                name: "system.objects.object-types",
                displayName: "Просмотр типов объектов",
                entityName: "object-types",
                canCreate: false,
                canRead: true,
                canUpdate: false,
                canDelete: false
            }), new PermissionModel({
                name: "system.objects.object-types.root-write",
                displayName: "Редактирование типов объектов",
                entityName: "object-types",
                canCreate: true,
                canRead: false,
                canUpdate: true,
                canDelete: true
            }), new PermissionModel({
                name: "system.objects.attribute-types",
                displayName: "Просмотр аттрибутов объектов",
                entityName: "attribute-types",
                canCreate: false,
                canRead: true,
                canUpdate: false,
                canDelete: false
            }), new PermissionModel({
                name: "system.objects.attribute-types.root-write",
                displayName: "Редактирование аттрибутов объектов",
                entityName: "attribute-types",
                canCreate: true,
                canRead: false,
                canUpdate: true,
                canDelete: true
            })];
            permissionsToAdd = permissionsToAdd.filter(val => !permissions.some(permission => permission.name === val.name));
            console.log('adding permissions ', permissionsToAdd.map(val => val.name));
            return PermissionModel.insertMany(permissionsToAdd).then((newPermissons: Permission[]) => {
                superuser.permissions = superuser.permissions || [];
                newPermissons.forEach((perm: Permission) => {
                    if (!superuser.permissions.some(val => val === perm.id)) {
                        superuser.permissions.push(perm.id);
                    }
                });
                permissions.forEach((perm: Permission) => {
                    if (!superuser.permissions.some(val => val === perm.id)) {
                        superuser.permissions.push(perm.id);
                    }
                });
                superuser.save().then(() => {
                    console.log("finished");
                })
                .catch((e: MongoError) => {
                    console.log("MongoDB query error");
                    console.log(e.stack);
                    return null;
                });
            })
            .catch(
                (e: MongoError) => {
                    console.log("MongoDB query error");
                    console.log(e.stack);
                    return null;
                }
            )
        })
        .catch((e: MongoError) => {
            console.log("MongoDB query error");
            console.log(e.stack);
            return null;
        });
    })
    .catch((e: MongoError) => {
        console.log("MongoDB query error");
        console.log(e.stack);
    });
})
.catch((e: MongoError) => {
    console.log("MongoDB connection error");
    console.log(e.stack);
});