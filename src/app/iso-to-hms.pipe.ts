import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'isoToHMS'
})
export class IsoToHMS implements PipeTransform {

  transform(value: string, args?: any): string {
    const duration: moment.Duration = moment.duration(value);
    
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    
    return `${hours}:${minutes}:${seconds}`;
  }

}
