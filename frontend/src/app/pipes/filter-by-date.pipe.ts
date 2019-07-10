import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {

  transform(items: any[], period?: Array<string>): any {
    if (!items) { return null; }
    if (!period.length) { return items; }
    if (period.length < 2) { return items; }

    let firstDate: Date;
    let secondDate: Date;

    if (period[0] === undefined || period[0] === null) {
      firstDate = new Date(items[items.length - 1].date);
    } else {
      firstDate = new Date(period[0]);
    }
    if (period[1] === undefined || period[1] === null) {
      secondDate = new Date(items[0].date);
    } else {
      secondDate = new Date(period[1]);
    }

    if (firstDate > secondDate) {
      const tmpField: Date = firstDate;
      firstDate = secondDate;
      secondDate = tmpField;
    }

    return items.filter( val => {
      const itemDate = new Date(val.date);
      return (itemDate >= firstDate) && (itemDate <= secondDate);
    });
  }

}
