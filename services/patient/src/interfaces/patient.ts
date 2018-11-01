import { Entity } from "./entity";

export interface Patient extends Entity {
    name: string;
    lastName: string;
    secondName: string;
    gender: string;
    birthDate: string;
    identifierMPI: string;
    identifierPassport: string;
    address: string;
}