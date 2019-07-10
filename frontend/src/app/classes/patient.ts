import { IPatient, Sex, Address } from '../interfaces/i-patient';


export class Patient {
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

    constructor(patient: IPatient) {
        if (patient._id) {
            this._id = patient._id;
        } else {
            this._id = null;
        }

        if (patient.version) {
            this.version = patient.version;
        } else {
            this.version = null;
        }

        if (patient.lastName) {
            this.lastName = patient.lastName;
        } else {
            this.lastName = null;
        }

        if (patient.firstName) {
            this.firstName = patient.firstName;
        } else {
            this.firstName = null;
        }

        if (patient.middleName) {
            this.middleName = patient.middleName;
        } else {
            this.middleName = null;
        }

        if (patient.sex) {
            this.sex = patient.sex;
        } else {
            this.sex = null;
        }

        if (patient.dateOfBirth) {
            this.dateOfBirth = patient.dateOfBirth;
        } else {
            this.dateOfBirth = null;
        }

        if (patient.omsSeriesAndNumber) {
            this.omsSeriesAndNumber = patient.omsSeriesAndNumber;
        } else {
            this.omsSeriesAndNumber = null;
        }

        if (patient.snilsNumber) {
            this.snilsNumber = patient.snilsNumber;
        } else {
            this.snilsNumber = null;
        }

        if (patient.createdAt) {
            this.createdAt = patient.createdAt;
        } else {
            this.createdAt = null;
        }

        if (patient.createdById) {
            this.createdById = patient.createdById;
        } else {
            this.createdById = null;
        }

        if (patient.updatedAt) {
            this.updatedAt = patient.updatedAt;
        } else {
            this.updatedAt = null;
        }

        if (patient.updatedById) {
            this.updatedById = patient.updatedById;
        } else {
            this.updatedById = null;
        }

        if (patient.externalId) {
            this.externalId = patient.externalId;
        } else {
            this.externalId = null;
        }

        if (patient.address) {
            this.address = patient.address;
        } else {
            this.address = null;
        }
    }
}
