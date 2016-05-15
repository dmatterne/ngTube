import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'isoToHMS'
})
export class IsoToHMSPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const duration: moment.Duration = moment.duration(value);
    
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    
    let minutesFmt: string = minutes.toString();
    if (minutesFmt.length < 2)
      minutesFmt = `0${minutes}`;

    let secondsFmt: string = seconds.toString();
    if (secondsFmt.length < 2)
      secondsFmt = `0${seconds}`;

    return `${hours}:${minutesFmt}:${secondsFmt}`;
  }

}
