import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, group, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-patients-route',
  templateUrl: './patients-route.component.html',
  styleUrls: ['./patients-route.component.scss'],
  animations: [
    trigger('slider', [
      transition(':decrement', group([
        query(':enter', [
          style({
            left: '100%'
          }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({
            left: '-100%'
          }))
        ])
      ])),
      transition(':increment', group([
        query(':enter', [
          style({
            left: '-100%'
          }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({
            left: '100%'
          }))
        ])
      ])),
    ])
  ],
})
export class PatientsRouteComponent implements OnInit {

  private _data: any;

  @Input()
  curentState: number;

  @Input()
  koef: Array<any>;

  get data() {
    return this._data;
  }

  @Input()
  set data(newData: any) {
    if (newData[0] === undefined) {
      this._data = [];
      this.state = 0;
      return;
    }

    this._data = newData;
    this.state = this._data[this.curentState];

    if (this._data[0][0]) {
      this.showMonthes = this.generateMonthes(this._data);
    }
  }

  @Output()
  items = new EventEmitter<any>();

  panelOpenState = false;

  state: any;

  returnTo: number;

  scale = 1;

  monthes = ['янв', 'фев', 'мар', 'апр', 'май', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек'];
  showMonthes = [];

  constructor() { }

  ngOnInit() {
    this.state = this._data[this.curentState];
  }

  zoomIn(): void {
    if (this.scale > 0) {
      this.scale--;
    }

    this.returnTo = undefined;
  }
  zoomOut(): void {
    if (this.returnTo) {
      this.scale = this.returnTo;
    } else
      if (this.scale < 2) {
        this.scale++;
      }

    this.returnTo = undefined;
  }

  selectCase(index: number, items: any): void {
    this.returnTo = this.scale;

    this.curentState = index;
    this.state = this._data[this.curentState];
    this.scale = 0;

    this.items.emit(items);
  }

  cutString(str: string, len: number): string {
    if (!str) { return; }
    if (str.length > len) {
      return `${str.slice(0, len)}...`;
    }
    return str;
  }

  formatDate(date: any): string {
    if (date instanceof Date) {
    } else {
      try {
        date = new Date(date);
      } catch (error) {
        console.error(`This string is in incorect format. -> ${date}. ERROR: ${error}`);
        return;
      }
    }

    const day = date.getDate();
    const monthIndex = date.getMonth();

    return day + ' ' + this.monthes[monthIndex];
  }

  getYearFromDate(date: Date) {
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

  generateMonthes(data: any): Array<string> {
    let currentYear = new Date(data[0][0].date).getFullYear();
    let currentMonth = new Date(data[0][0].date).getMonth();
    const lastYear = new Date(data[data.length - 1][data[data.length - 1].length - 1].date).getFullYear();
    const lastMonth = new Date(data[data.length - 1][data[data.length - 1].length - 1].date).getMonth();

    const monthArray = [];

    while (currentMonth <= lastMonth && currentYear === lastYear) {
      monthArray.push(monthesMap[currentMonth]);

      currentMonth++;

      if (currentMonth === 12 && currentYear !== lastYear) {
        currentMonth = 0;
        currentYear++;
      }

    }

    return monthArray;
  }
}


const monthesMap = {
  0: 'янв',
  1: 'фев',
  2: 'мар',
  3: 'апр',
  4: 'май',
  5: 'июнь',
  6: 'июль',
  7: 'авг',
  8: 'сент',
  9: 'окт',
  10: 'нояб',
  11: 'дек'
};
