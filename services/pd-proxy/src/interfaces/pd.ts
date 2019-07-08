import { Entity } from "./entity";

export interface pd extends Entity {
    _id: string;
    version: number;
    createdAt: number;
    createdById: string;
    updatedAt: number;
    updatedById: string;

    externalId: number;

    firstName: string;
    lastName: string;
    middleName: string;

    sex: Sex;
    dateOfBirth: Date;

    omsSeriesAndNumber: string;
    snilsNumber: string;

    address: Address;

    [key: string]: any;
}

export enum Sex {
    MAN,
    WOMAN,
    UNDEFINED
}

export interface Address {
    region: string;
    area: string;
    locality: string;
    street: string;
    building: string;
    apartment: string;
    postcode: string;
}