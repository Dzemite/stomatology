import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(items: any[], str?: Array<string>): any {
    if (!items) { return null; }
    if (str.length < 1) { return items; }

    return items.filter(val => {
      const v = val.category.toUpperCase().indexOf(str[0].toUpperCase()) !== -1;
      return v;
    });
  }

}
