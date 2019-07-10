import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Patient } from '../classes/patient';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  protected _path_: string;
  protected _context_: string;
  constructor(
    protected _http: HttpClient,
    private _constantsService: ConstantsService
  ) { }

  get(id: string) {

    if (Array.isArray(id)) {
      id = id.join(',');
    }

    return this._http.get(this._context_ + this._path_ + '/' + id, {
      observe: 'response',
      responseType: 'json',
      headers: { Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyI1ZDA4OTZlZDc1ZWNiNjAwMWE1NmUxZTciXSwiZ3JvdXBzIjpbIjViZjg0NWUzMzA4NmViMDAxM2EyZmU4NSJdLCJfaWQiOiI1YmY4NDVlMzMwODZlYjAwMTNhMmZlODEiLCJsZGFwSWQiOiIiLCJ1c2VybmFtZSI6InN1cGVydXNlciIsImRpc3BsYXlOYW1lIjoi0KHRg9C_0LXRgNC_0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCIsImRlcGFydGFtZW50RGlzcGxheU5hbWUiOiLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgNGLINGB0LjRgdGC0LXQvNGLIiwibWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwiX192IjoxLCJpZCI6IjViZjg0NWUzMzA4NmViMDAxM2EyZmU4MSIsImNvbXB1dGVkUGVybWlzc2lvbnMiOlsibWV0YWRhdGFfYXR0cmlidXRlLXR5cGVzX3Jvb3RfY3JlYXRlLWVudGl0aWVzIiwibWV0YWRhdGFfYXR0cmlidXRlLXR5cGVzX3Jvb3RfY3JlYXRlLWJyYW5jaGVzIiwibWV0YWRhdGFfYXR0cmlidXRlLXR5cGVzX3Jvb3RfbGlzdC1jb250ZW50cyIsIm1ldGFkYXRhX29iamVjdC10eXBlc19yb290X2xpc3QtY29udGVudHMiLCJtZXRhZGF0YV9vYmplY3QtdHlwZXNfcm9vdF9jcmVhdGUtZW50aXRpZXMiLCJtZXRhZGF0YV9vYmplY3QtdHlwZXNfcm9vdF9jcmVhdGUtYnJhbmNoZXMiLCJtZXRhZGF0YV9hdHRyaWJ1dGUtdHlwZXMiLCJtZXRhZGF0YV9vYmplY3QtdHlwZXMiLCJyZWFkX3VzZXIiLCJyZWFkX3Blcm1pc3Npb25zIiwiYWRtaW5fdXNlcnMiLCJhZG1pbl9wZXJtaXNzaW9ucyIsImFkbWluX2dyb3VwcyIsInJlYWRfZ3JvdXBzIiwiYWdncmVnYXRvcl9hY2Nlc3MiLCJjZC1wcm94eV9yZWFkIiwiY2QtcHJveHlfd3JpdGUiLCJwZC1wcm94eV9yZWFkIiwicGQtcHJveHlfd3JpdGUiXSwiaWF0IjoxNTYyNjU0NDc4LCJleHAiOjE1NjI2ODMyNzh9.Y0CxuCa-1EiuztfFBPtBp19PjwDaE9NpOJ07aaild2X0ZtOzPC557eA7WrRVrkIN2juk7IjgM0J59tWU9XPFfA' }
    })
      .toPromise()
      .then((res: HttpResponse<any>) => {
        return res.body;
      })
      .catch((err: HttpErrorResponse) => {
        return Promise.reject(err);
      });
  }

  getList(headers: HttpHeaders): Promise<{ length: number, patients: Patient[] }> {
    return this._http.get(this._context_ + this._path_ + '/list', {
      observe: 'response',
      responseType: 'json',
      headers: headers
    })
      .toPromise()
      .then((res: HttpResponse<any>) => {
        return res.body;
      })
      .catch((err: HttpErrorResponse) => {
        return Promise.reject(err);
      });
  }
}
