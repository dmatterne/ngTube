import { Component, OnInit, Input } from '@angular/core';

import { Video } from '../shared';
import { ThumbnailComponent } from '../thumbnail';

@Component({
  moduleId: module.id,
  selector: 'thumbnail-list',
  template: `
    <div>
        <ul>
            <li *ngFor="let video of videos">
                <thumbnail
                    [title]="video.title"
                    [url]="video.url"
                ></thumbnail>
            </li>
        </ul>
    </div>
  `,
  directives: [ThumbnailComponent],
  styleUrls: ['thumbnail-list.component.css']
})
export class ThumbnailListComponent {
  @Input() videos: Video[]
  
  constructor() {}

}
