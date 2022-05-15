import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noComma'
})
export class NoCommaPipe implements PipeTransform {

  transform(value: number): unknown {
    if (value !== undefined && value !== null) {
      return value.toString().replace(/,/g, " ").replace(/\./g, ",");
    } else {
      return "";
    }
  }

}
