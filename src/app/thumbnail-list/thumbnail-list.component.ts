import { Component, OnInit, Input } from '@angular/core';

import { Video } from '../shared';
import { ThumbnailComponent } from '../thumbnail';

@Component({
  moduleId: module.id,
  selector: 'thumbnail-list',
  templateUrl: 'thumbnail-list.component.html',
  styleUrls: ['thumbnail-list.component.css'],
  directives: [ThumbnailComponent]
})

export class ThumbnailListComponent {
  @Input() videos: Video[]
  
  constructor() {}

}
