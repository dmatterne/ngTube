import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Video } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'sidenav-tile',
  templateUrl: 'sidenav-tile.component.html',
  styleUrls: ['sidenav-tile.component.css']
})
export class SidenavTileComponent {
  
  @Input() video: Video;
  
  @Output() clickDelete: EventEmitter<Video> = new EventEmitter();
  @Output() clickTile: EventEmitter<Video> = new EventEmitter();


  onClickTile() {
    this.clickTile.emit(this.video);
  }
  
  onClickDelete() {
    this.clickDelete.emit(this.video);
  }
}
