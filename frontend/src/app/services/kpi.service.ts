import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  protected _crudService: CrudService;

  constructor(
    private _http: HttpClient,
    private _constantsService: ConstantsService,
  ) {
    this._crudService = this._getCrudService(this._constantsService.OBJECTS_KPI_PATH, this._constantsService.OBJECTS_SERVICE_CONTEXT);
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

  getKpi(id: string): Promise<any> {
    return this._crudService.get(id)
      .then((res) => {
        return res;
      })
      .catch((err: Error) => {
        return Promise.reject(err);
      });
  }
}
