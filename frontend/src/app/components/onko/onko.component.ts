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
  selector: 'app-onko',
  templateUrl: './onko.component.html',
  styleUrls: ['./onko.component.scss']
})
export class OnkoComponent implements OnInit {


  @ViewChild('body', { read: ViewContainerRef, static: false })
  body: ViewContainerRef;
  @ViewChild('diagnosis', { read: ViewContainerRef, static: false })
  diagnosis: ViewContainerRef;

  private history = [];
  private historyForRoute = [];

  historyForView = [];

  hisCaseFilter = [];
  hisPeriodFilter = [];
  hisNameFilter = '';

  koef = [];
  patient: IPatient;
  patientID: string;
  age: number;

  patientBody: string;

  documentsUrl: string;

  dataSource = [];
  dates = [];

  mkb10: string;
  mkbName: string;
  kpis: IKpi[];

  /**
   *  Массив из массивов структур [ [ {} ... ] ... ].
   *
   *  Струкрура вида:
   *      color: string;      // Цвет отображения позиции
   *      category: string;   // Диагностика/Адьютивная терапия...
   *      name: string;       // Название
   *      signature: string;  // Подпись под названием
   *      date: string;       // Дата документа
   *      violation: string;  // Если есть нарушение
   *      current: boolean;   // Текущая позиция
   *      endState: boolean;  // Конечноя позиция
   */
  routeData: Array<Array<any>> = [[]];

  today = new Date();

  hisName = '';
  hisDate = '';

  constructor(
    private patientService: PatientService,
    private caseService: CaseService,
    private route: ActivatedRoute,
    private constantsService: ConstantsService,
    private _eventBrokerService: EventBrokerService,
    private _kpiService: KpiService,
    private preloadersServise: PreloadersService,

    private _compiler: Compiler,
    private _injector: Injector,
    private _m: NgModuleRef<any>
  ) { }

  ngOnInit() {
    this.patientID = this.route.snapshot.params.id;

    if (this.patientID) {
      this.caseService.getPatientCase(this.patientID)
        .then((result) => {
          this.patient = new Patient(result.patient);
          this.age = this.getPatientAge(this.patient.dateOfBirth);

          const caze: ICase = result.case;

          this.historyForRoute = JSON.parse(JSON.stringify(caze.documents));
          this.history = caze.documents.reverse();

          this.routeData = this.convertForRoute(this.historyForRoute);
          this.historyForView = this.history;

          const promises = [];
          this.kpis = caze.kpis;
          this.kpis.forEach(kpi => {
            promises.push(this._kpiService.getKpi(kpi.id)
              .then(entity => {
                kpi.name = entity.displayName;
                kpi.type = entity.type;
              })
              .catch(err => {
                console.error(err);
              })
            );
          });

          // this.mkbName = this.constantsService.MKB_10[this.mkb10];

          // this.patientBody = this.patient.sex === 'MAN' ? `${this.mkb10.slice(0, 3)}-M` : `${this.mkb10.slice(0, 3)}-F`;

          if (this.constantsService.registeredBodyIcons.indexOf(this.patientBody) === -1) {
            this.patientBody = this.patient.sex === 'MAN' ? `basic-M` : `basic-F`;
          }

          // if (this.kpis) {
          //   if (this.kpis.tnm.value.indexOf('T3Nx') !== -1) {
          //     this.dataSource.push(DATA[0]);
          //   }
          //   if (this.kpis.tnm.value.indexOf('T3N2') !== -1) {
          //     this.dataSource.push(DATA[1]);
          //   }
          // }

          this.koef = this.generateParams(caze.documents, this.routeData);

          this.documentsUrl = this.constantsService.documentsUrl;

          this._eventBrokerService.emit<number>('clear', null);

          this.preloadersServise.setGlobalPreloaderPromise(Promise.all(promises).then(() => {
            this.dates = this.kpis.filter(kpi => kpi.type === 'date');
            this.kpis = this.kpis.filter(kpi => kpi.type !== 'date');

            /**
             * Создание нового ангуляровского модуля с компонентами по темплейту.
             */
            const body = result.config.leftColumnKpis[0].visualizer;
            const diagnosis = result.config.rightColumnKpis[0].visualizer;

            const scope = this;
            const bodyCmp = Component({ template: body, selector: 'body-cmp' })(class { scope = scope; });
            const diagnosisCmp = Component({ template: diagnosis, selector: 'diag-cmp' })(class { scope = scope; });
            const TmpModule = NgModule({
              declarations: [
                bodyCmp,
                diagnosisCmp
              ],
              imports: [
                Icons,
                MaterialLibsModule,
                FlexLayoutModule
              ]
            })(class { });

            this._compiler.compileModuleAndAllComponentsAsync(TmpModule)
              .then((factories) => {
                const fBody = factories.componentFactories.filter(fact => fact.selector === 'body-cmp')[0];
                const cmpRefBody = fBody.create(this._injector, [], null, this._m);
                cmpRefBody.instance.name = 'body';
                this.body.insert(cmpRefBody.hostView);

                const fDiagnosis = factories.componentFactories.filter(fact => fact.selector === 'diag-cmp')[0];
                const cmpRefDiagnosis = fDiagnosis.create(this._injector, [], null, this._m);
                cmpRefDiagnosis.instance.name = 'diagnosis';
                this.diagnosis.insert(cmpRefDiagnosis.hostView);
              })
              .catch((err) => {
                console.error(err);
              });
          }));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // color: string;
  // category: string;
  // title: string;
  // clinic: string;
  // date: string;
  // violation: string;
  // current: boolean;
  // endState: boolean;
  convertForRoute(data: Array<any>): Array<Array<any>> {
    const routeArr: Array<Array<any>> = [[]];
    let category = '';
    let categoryNumber = -1;

    for (const doc of data) {
      if (category !== doc.category) {
        category = doc.category;
        categoryNumber++;
        routeArr.push([]);
      }
      doc.color = typesColor[doc.category];

      routeArr[categoryNumber].push(doc);
    }

    routeArr.pop();

    /** If you want to put violation in circle your self. */
    // if (routeArr[1]) {
    //   routeArr[1][0].violation = 'сроки по 223-р';
    // }

    return routeArr;
  }
  correctDirForRouteData(data: Array<any>) {
    const startDate = new Date(data[0].date);
    const endDate = new Date(data[data.length - 1].date);

    if (startDate.getMilliseconds()) {

    }
  }

  setHisCaseFilter(filter: Array<string>) {
    this.hisCaseFilter = filter;
  }
  setHisPeriodFilter(filter: Array<string>) {
    this.hisPeriodFilter = filter;
  }

  clicked() {
    console.log('Clicked!');
  }

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

  declOfNum(num: number, titles: Array<any>) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
  }

  cutString(str: string, len: number): string {
    if (!str) { return; }
    if (str.length > len) {
      return `${str.slice(0, len)}...`;
    }
    return str;
  }

  itemsGet(items: any) {
    this.hisCaseFilter = items[0].category;
    this.hisPeriodFilter.push(items[0].date);
    this.hisPeriodFilter.push(items[items.length - 1].date);
  }

  getDateDiff(period: any): number {
    const startDate = new Date(period[0].date).getTime();
    const lastDate = new Date(period[period.length - 1].date).getTime();

    return Math.abs(lastDate - startDate);
  }

  generateParams(allData: any, periodicData: any): Array<any> {
    let allDiff = 0;
    const periodicDiffs = [];

    for (let i = 0; i < periodicData.length; i++) {
      const diff = this.getDateDiff(periodicData[i]);
      diff === 0 ? periodicDiffs.push(86400) : periodicDiffs.push(diff);
      allDiff = allDiff + periodicDiffs[periodicDiffs.length - 1];
    }

    for (let i = 0; i < periodicDiffs.length; i++) {
      periodicDiffs[i] = Math.floor((periodicDiffs[i] * 100) / allDiff);
      periodicDiffs[i] < 1 ? periodicDiffs[i] = 1 : periodicDiffs[i] = periodicDiffs[i];
    }

    return periodicDiffs;
  }

  acceptFilters(filters: { cases: any, dates: [] }) {
    this.hisCaseFilter = [];

    for (const key in filters.cases) {
      if (filters.cases.hasOwnProperty(key)) {
        if (filters.cases[key]) {
          this.hisCaseFilter.push(key);
        }
      }
    }
    this.hisPeriodFilter = filters.dates;

    this.filterHistory();
  }

  inputFilterKeyUp() {
    this.filterHistory();
  }

  filterHistory() {
    this.historyForView = new FilterByCategoryPipe().transform(this.history, this.hisCaseFilter);
    this.historyForView = new FilterByDatePipe().transform(this.historyForView, this.hisPeriodFilter);
    this.historyForView = new FilterByNamePipe().transform(this.historyForView, this.hisNameFilter);

    this.routeData = new FilterByCategoryPipe().transform(this.historyForRoute, this.hisCaseFilter);
    this.routeData = new FilterByDatePipe().transform(this.routeData, this.hisPeriodFilter);
    this.routeData = new FilterByNamePipe().transform(this.routeData, this.hisNameFilter);

    this.routeData = this.convertForRoute(this.routeData);
  }
}

const typesColor = {
  'Неизвестно': 'light-sea-blue',
  'Подозрение': 'yellow',
  'Диагностика': 'blue',
  'Хирургическое лечение': 'perple',
  'Адъювантная терапия': 'green',
  'Онкологически здоров': 'sea-blue',
  'Диагноз подтвержден': 'brown',
  'Неоадъювантное лечение': 'orange',
  'Адъювантное лечение': 'red',
  'Паллиативное лечение': 'dark-green',
  'Симптоматическое лечение': 'light-orange',
  'Наблюдение': 'light-blue',
  'Лечение рецидива': 'pinc',
  'Рецидив подтвержден': 'light-green'
};

const DATA = [
  { dash: 'Хирургическое лечение - гемиколэктомия', ref: '/assets/files/Rec_1.pdf', lib: 'lib', b: 'B' },
  { dash: 'Адьювантное химиотерапевтическое лечение', ref: '/assets/files/Rec_2.pdf', lib: 'lib', b: 'B' },
];
