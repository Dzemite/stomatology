export interface ICase {
    [key: string]: any;
    _id: string;
    version: number;
    createdAt: number;
    createdById: string;
    updatedAt: number;
    updatedById: string;

    patientId: string;

    kpis: IKpi[];

    events: IEvent[];

    documents: IDocument[];
}

export interface IKpi {
    id: string;
    values: IValue[];
    name?: string;
    type?: string;
}


export interface IValue {
    id: string;
    eventId: string;
    documentId: string;
    stageId: string;
    value: string | number | boolean;
    unit: string;
    date: Date;
}

export interface IEvent {
    id: string;
    documentId: string;
    stageId: string;
    date: number;
    startDate: number;
    endDate: number;
    clinicId: string;
    parameters: IParameter[];
}

export interface IParameter {
    id: string;
    value: string;
}

export interface IDocument {
    id: string;
    typeId: string;
    displayName: string;
    stageId: string;
    url: string;
    date: Date;
    createdBy: string;
    clinicId: string;
    addedAt: number;
    addedById: string;
    validation: string[];
}
