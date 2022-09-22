import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats the createdAt date sttribute of news to no of days ago
 * eg: createdAt is 19/09/2022 and today's date is 23/09/2022 
 * it will return 3 days ago
 */
@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    // 1 day has 24 hours * 60 min * 60 secs * 1000 ms 
    const timeToDays = 1000 * 60 * 60 * 24;
    var currentDate = new Date();
    var newsDate = new Date(value);
    var diffInTime = currentDate.getTime() - newsDate.getTime();
    var diffInDays = Math.round(diffInTime / timeToDays);
    return diffInDays === 0 ? 'few hours ago' : `${diffInDays} days ago`;
  }

}
