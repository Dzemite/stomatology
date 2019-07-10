import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../../src/app/classes/patient';
import { PatientsService } from '../../../../src/app/services/patients.service';
import { HttpHeaders } from '@angular/common/http';
import { EventBrokerService } from '../../../../src/app/services/event-brocker.service';
import { CaseService } from '../../../../src/app/services/case.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {

  patients: Patient[] = [];
  searchText: string;
  patientsLength: number;

  sortOptions: ISortOptions = {};
  searchOptions: ISearchOptions = {};

  constructor(
    private _patientsService: PatientsService,
    private _eventBrokerService: EventBrokerService,
    private _caseService: CaseService
  ) { }

  ngOnInit() {
    const headers: HttpHeaders = new HttpHeaders();
    this._patientsService.getPatientList(headers)
      .then(res => {
        this.patients = res.patients;
        this.patientsLength = res.length;

        // this.patients.forEach(pat => {
        //   this._caseService.getPatientCase(pat._id)
        //       .then((result) => {
        //         pat.mkb = result.mkb10;
        //       });
        // });
      });

    this._eventBrokerService.emit<number>('patients-list', 0);
  }

  getPatients(
    options: IHeaders
  ): Promise<{length: number, patients: Patient[]}> {
    const headers: IHeaders = {};
    if (options.offset) { headers.offset = options.offset; }
    if (options.limit) { headers.limit = options.limit; }
    if (options.search_field) { headers.search_field = options.search_field; }
    if (options.search_value) { headers.search_value = options.search_value; }
    if (options.sort_field) { headers.sort_field = options.sort_field; }
    if (options.sort_direction) { headers.sort_direction = options.sort_direction; }

    return this._patientsService.getPatientList(new HttpHeaders(headers))
      .then(patients => patients);
  }

  searchPat() {
    this.searchOptions = {
      search_field: 'firstName',
      search_value: encodeURI(this.searchText)
    };

    const headers: IHeaders = {};
    if (this.sortOptions.sort_field && this.sortOptions.sort_direction) {
      Object.assign(headers, this.searchOptions, this.sortOptions);
    } else {
      Object.assign(headers, this.searchOptions);
    }

    this.getPatients(this.searchOptions)
      .then(res => {
        this.patients = res.patients;
        this.patientsLength = res.length;

        // this.patients.forEach(pat => {
        //   this._caseService.getPatientCase(pat._id)
        //       .then((result) => {
        //         pat.mkb = result.mkb10;
        //       });
        // });
      });
  }

  sortPat(sortOptions: ISortOptions) {
    if (this.sortOptions.sort_field === sortOptions.sort_field && this.sortOptions.sort_direction === sortOptions.sort_direction) {
      this.sortOptions = {};
    } else {
      this.sortOptions = sortOptions;
    }

    const headers: IHeaders = {};
    if (this.searchOptions.search_field && this.searchOptions.search_value) {
      Object.assign(headers, this.sortOptions, this.searchOptions);
    } else {
      Object.assign(headers, this.sortOptions);
    }

    this.getPatients(headers)
      .then(res => {
        this.patients = res.patients;
        this.patientsLength = res.length;

        // this.patients.forEach(pat => {
        //   this._caseService.getPatientCase(pat._id)
        //       .then((result) => {
        //         pat.mkb = result.mkb10;
        //       });
        // });
      });
  }

  changePage(event: any) {
    const headers: IHeaders = {
      offset: '' + event.pageIndex,
      limit: '' + event.pageSize,
    };

    if (this.searchOptions.search_field && this.searchOptions.search_value) {
      Object.assign(headers, this.sortOptions, this.searchOptions);
    }
    if (this.sortOptions.sort_field && this.sortOptions.sort_direction) {
      Object.assign(headers, this.searchOptions, this.sortOptions);
    }

    this._patientsService.getPatientList(new HttpHeaders(headers))
    .then(res => {
      this.patients = res.patients;

      // this.patients.forEach(pat => {
      //   this._caseService.getPatientCase(pat._id)
      //       .then((result) => {
      //         pat.mkb = result.mkb10;
      //       });
      // });
    });
  }
}

interface IHeaders {
  offset?: string;
  limit?: string;
  search_field?: string;
  search_value?: string;
  sort_field?: string;
  sort_direction?: string;
  [key: string]: any;
}

interface ISortOptions {
  sort_field?: string;
  sort_direction?: string;
}
interface ISearchOptions {
  search_field?: string;
  search_value?: any;
}
