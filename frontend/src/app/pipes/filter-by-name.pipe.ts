import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: any[], str?: string): any {
    if (!items) { return null; }
    if (!str) { return items; }

    return items.filter(val => {
      const v = val.title.toUpperCase().indexOf(str.toUpperCase()) !== -1;
      return v;
    });
  }

}
