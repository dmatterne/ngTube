import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'isoToHMS'
})
export class IsoToHMSPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const duration: moment.Duration = moment.duration(value);
    
    const hours:   string = this.twoDigitsFormat(duration.hours());
    const minutes: string = this.twoDigitsFormat(duration.minutes());
    const seconds: string = this.twoDigitsFormat(duration.seconds());
 
    return `${hours}:${minutes}:${seconds}`;
  }

  twoDigitsFormat(time: number) {
    return `${time < 10 ? '0' : ''}${time}`;
  }
}
