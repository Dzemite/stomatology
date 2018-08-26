import { Entity } from "./entity";

export interface User extends Entity {
    username: string;
    displayName: string;
    permissions: string[];
    departamentDisplayName?: string;
    computedPermissions?: string[];
    mail: string;
}