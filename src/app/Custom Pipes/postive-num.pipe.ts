import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postiveNum'
})
export class PostiveNumPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return Math.abs(value);
  }

}
