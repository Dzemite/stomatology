import { Component, OnInit, Compiler, Injector, NgModuleRef, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { PatientService } from '../../../../src/app/services/patient.service';
import { IPatient } from '../../../../src/app/interfaces/i-patient';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../../../src/app/classes/patient';
import { CaseService } from '../../../../src/app/services/case.service';
import { FilterByCategoryPipe } from '../../../../src/app/pipes/filter-by-category.pipe';
import { FilterByDatePipe } from '../../../../src/app/pipes/filter-by-date.pipe';
import { FilterByNamePipe } from '../../../../src/app/pipes/filter-by-name.pipe';
import { ConstantsService } from '../../../../src/app/services/constants.service';
import { EventBrokerService } from '../../../../src/app/services/event-brocker.service';
import { MaterialLibsModule } from '../../modules/material-libs/material-libs.module';
import { Icons } from '../../icons.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IKpi, ICase } from '../../../../src/app/interfaces/i-case';
import { KpiService } from '../../../../src/app/services/kpi.service';
import { PreloadersService } from '../../../../src/app/services/preloaders.service';

@Component({
  selector: 'app-stom',
  templateUrl: './stom.component.html',
  styleUrls: ['./stom.component.scss']
})
export class StomComponent implements OnInit {

  today = new Date();

  constructor() { }

  ngOnInit() { }

  formatDate(date: any): string {
    const monthNumbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    if (date instanceof Date) {
    } else {
      try {
        date = new Date(date);
      } catch (error) {
        console.error(`This string is in incorect format. -> ${date}. ERROR: ${error}`);
        return;
      }
    }

    let day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    if (('' + day).length === 1) {
      day = '0' + day;
    }

    return day + '.' + monthNumbers[monthIndex] + '.' + year;
  }

  getDay(date: any): string {
    if (date instanceof Date) {
    } else {
      try {
        date = new Date(date);
      } catch (error) {
        console.error(`This string is in incorect format. -> ${date}. ERROR: ${error}`);
        return;
      }
    }

    return date.getDay();
  }

  getDate(date: any): string {
    if (date instanceof Date) {
    } else {
      try {
        date = new Date(date);
      } catch (error) {
        console.error(`This string is in incorect format. -> ${date}. ERROR: ${error}`);
        return;
      }
    }

    return date.getDate();
  }

  getMonth(date: any): string {
    const monthes = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    if (date instanceof Date) {
    } else {
      try {
        date = new Date(date);
      } catch (error) {
        console.error(`This string is in incorect format. -> ${date}. ERROR: ${error}`);
        return;
      }
    }

    return monthes[date.getMonth()];
  }

  getYear(date: any): string {
    if (date instanceof Date) {
    } else {
      try {
        date = new Date(date);
      } catch (error) {
        console.error(`This string is in incorect format. -> ${date}. ERROR: ${error}`);
        return;
      }
    }

    return date.getFullYear();
  }

  getPatientAge(dateBirth: Date): number {
    if (dateBirth instanceof Date) {
    } else {
      dateBirth = new Date(dateBirth);
    }

    const age = this.today.getFullYear() - dateBirth.getFullYear();

    return this.today.setFullYear(this.today.getFullYear()) < dateBirth.setFullYear(dateBirth.getFullYear()) ? age - 1 : age;
  }

  cutString(str: string, len: number): string {
    if (!str) { return; }
    if (str.length > len) {
      return `${str.slice(0, len)}...`;
    }
    return str;
  }

  getDateDiff(period: any): number {
    const startDate = new Date(period[0].date).getTime();
    const lastDate = new Date(period[period.length - 1].date).getTime();

    return Math.abs(lastDate - startDate);
  }
}
