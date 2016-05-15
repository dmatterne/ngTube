import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUrl'
})
export class ReplaceUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    if (typeof value !== 'string') {
      return value;
    }
    
    const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return value.replace(regex, '<a target="_blank" href="$1">$1</a>'); 
  }

}
