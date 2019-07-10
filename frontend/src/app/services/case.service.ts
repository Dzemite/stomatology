import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Case } from '../classes/case';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  protected _crudService: CrudService;

  constructor(
    private _http: HttpClient,
    private _constantsService: ConstantsService,
  ) {
    this._crudService = this._getCrudService('/caze', this._constantsService.PATIENTS_SERVICE_CONTEXT);
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

  public getPatientCase(id: string): Promise<any> {
    return this._crudService.get(id)
      .then((res) => {
        return {
          patient: res.patient[0],
          case: new Case(res.caze),
          config: res.configuration,
        };
      })
      .catch((err: Error) => {
        return Promise.reject(err);
      });
  }
}
