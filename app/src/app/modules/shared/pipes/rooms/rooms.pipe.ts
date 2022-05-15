import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rooms'
})
export class RoomsPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 1) {
      return value + ' pokój';
    } else if (value < 5) {
      return value + ' pokoje';
    } else {
      return value + ' pokoi';
    }
  }

}
