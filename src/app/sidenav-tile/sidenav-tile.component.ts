import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { Video } from '../shared';
import { IsoToHMSPipe } from '../iso-to-hms.pipe';

@Component({
  moduleId: module.id,
  selector: 'sidenav-tile',
  templateUrl: 'sidenav-tile.component.html',
  styleUrls: ['sidenav-tile.component.css'],
  pipes: [IsoToHMSPipe]
})
export class SidenavTileComponent {
  
  @Input() video: Video;
  @Input() first: boolean = false;
  @Input() last: boolean = false;
  
  
  @Output() clickDelete: EventEmitter<Video> = new EventEmitter();
  @Output() clickTile: EventEmitter<Video> = new EventEmitter();
  @Output() clickArrow: EventEmitter<any> = new EventEmitter();
  
  private hover: boolean = false;
  
  @HostListener('mouseenter') onMouseEnter() {
    this.hover = true;
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.hover = false;
  }


  onClickTile() {
    this.clickTile.emit(this.video);
  }
  
  onClickDelete() {
    this.clickDelete.emit(this.video);
  }
  
  moveForward() {
    this.clickArrow.emit({
      video: this.video,
      arrow: 'down'
    });
  }
  
  moveBackward() {
    this.clickArrow.emit({
      video: this.video,
      arrow: 'up'
    });
  }
}
