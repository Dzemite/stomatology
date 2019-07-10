import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Patient } from '../classes/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  protected _crudService: CrudService;

  constructor(
    private _http: HttpClient,
    private _constantsService: ConstantsService,
  ) {
    this._crudService = this._getCrudService('/patient', this._constantsService.PATIENTS_SERVICE_CONTEXT);
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

  public getPatient(id: string): Promise<Patient> {
    return this._crudService.get(id)
      .then((res) => {
        return new Patient(res);
      })
      .catch((err: Error) => Promise.reject(err));
  }
}
