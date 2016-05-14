import { Component, Input } from '@angular/core';
import { Video } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'sidenav-tile',
  templateUrl: 'sidenav-tile.component.html',
  styleUrls: ['sidenav-tile.component.css']
})
export class SidenavTileComponent {
  
  @Input() video: Video;
}
