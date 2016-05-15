import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quality'
})
export class Quality implements PipeTransform {

  transform(value: any, args?: any): any {
    
    switch (value) {
      case 'auto':
        return 'Default';
        
      case 'tiny':
        return '144p';
        
      case 'small':
        return '240p';
        
      case 'medium':
        return '360p';
        
      case 'large':
        return '480p';
        
      case 'hd720':
        return '720p';
        
      case 'hd1080':
        return '1080p';
        
      case 'highres':
        return '4K';
        

      default:
        return '';
    }
  }

}
