export interface IPatient {
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
    man = 'MAN',
    woman = 'WOMAN',
    undefined = ''
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
