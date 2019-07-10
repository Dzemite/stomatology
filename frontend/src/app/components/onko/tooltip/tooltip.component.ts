import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  Input
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  exportAs: 'tooltip',
  animations: [
    trigger('tooltip', [
      state('void', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      transition('void <=> *', [
        style({
          opacity: 1
        }),
        animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ])
    ])
  ]
})
export class TooltipComponent implements AfterViewInit {

  @Input()
  data: any;

  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;

  constructor(public dir: Directionality) { }

  ngAfterViewInit() {

  }

  cutString(str: string, len: number): string {
    if (str.length > len) {
      return `${str.slice(0, len)}...`;
    }
    return str;
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
}
