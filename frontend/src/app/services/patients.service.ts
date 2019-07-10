import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Patient } from '../classes/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  protected _crudService: CrudService;

  constructor(
    private _http: HttpClient,
    private _constantsService: ConstantsService,
  ) {
    this._crudService = this._getCrudService('/patients', this._constantsService.PATIENTS_SERVICE_CONTEXT);
  }

  private _getCrudService(path, context): CrudService {
    const http = this._http;
    const constants = this._constantsService;
    return new class extends CrudService {
      constructor() {
        super(http, constants);
        this._path_ = path;
        this._context_ = context;
      }
    };
  }

  public async getPatientList(headers: HttpHeaders): Promise<{length: number, patients: Patient[]}> {
    try {
      const res: {length: number, patients: Patient[]} = await this._crudService.getList(headers);
      const patients: Patient[] = [];
      for (const patient of res.patients) {
        patients.push(new Patient(patient));
      }
      return {length: res.length, patients: patients};
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
