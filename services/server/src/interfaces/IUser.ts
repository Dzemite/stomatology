import { Entity } from "./entity";

export interface IUser extends Entity {
    username: string;
    password: string;

    displayName: string;
    permissions: string[];
    mail: string;    
}