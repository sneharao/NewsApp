import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const timeToDays = 1000 * 60 * 60 * 24;
    var currentDate = new Date();
    var newsDate = new Date(value);
    var diffInTime = currentDate.getTime() - newsDate.getTime();
    var diffInDays = Math.round(diffInTime / timeToDays);
    return diffInDays === 0 ? 'few hours ago' : `${diffInDays} days ago`;
  }

}
