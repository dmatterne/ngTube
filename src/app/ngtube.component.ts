import { Component } from '@angular/core';
import { ThumbnailComponent } from './thumbnail';
@Component({
  moduleId: module.id,
  selector: 'ngtube-app',
  template: `<h1>
    {{title}}
    </h1>
    <thumbnail 
        title="Kaaris - Le bruit de mon âme" 
        url="https://i.ytimg.com/vi/LBr3HjsUZBg/default.jpg">
    </thumbnail>
    `,
  styleUrls: ['ngtube.component.css'],
  directives: [ThumbnailComponent]
})
export class NgtubeAppComponent {
  title = 'ngtube works!';
}
