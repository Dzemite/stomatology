import { ICase, IDocument, IKpi, IEvent } from '../interfaces/i-case';


export class Case implements ICase {
    _id: string;
    version: number;
    createdAt: number;
    createdById: string;
    updatedAt: number;
    updatedById: string;

    patientId: string;

    kpis: IKpi[];

    events: IEvent[];

    documents: Array<IDocument>;

    constructor(_case: ICase) {
        if (_case._id) {
            this._id = _case._id;
        } else {
            this._id = null;
        }
        if (_case.version) {
            this.version = _case.version;
        } else {
            this.version = null;
        }
        if (_case.createdAt) {
            this.createdAt = _case.createdAt;
        } else {
            this.createdAt = null;
        }
        if (_case.createdById) {
            this.createdById = _case.createdById;
        } else {
            this.createdById = null;
        }
        if (_case.updatedAt) {
            this.updatedAt = _case.updatedAt;
        } else {
            this.updatedAt = null;
        }
        if (_case.updatedById) {
            this.updatedById = _case.updatedById;
        } else {
            this.updatedById = null;
        }
        if (_case.patientId) {
            this.patientId = _case.patientId;
        } else {
            this.patientId = null;
        }
        if (_case.kpis) {
            this.kpis = _case.kpis;
        } else {
            this.kpis = null;
        }
        if (_case.events) {
            this.events = _case.events;
        } else {
            this.events = null;
        }
        if (_case.documents) {
            this.documents = _case.documents;
        } else {
            this.documents = null;
        }

    }
}
