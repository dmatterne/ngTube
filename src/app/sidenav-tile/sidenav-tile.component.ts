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
  
  @Output() clickDelete: EventEmitter<Video> = new EventEmitter();
  @Output() clickTile: EventEmitter<Video> = new EventEmitter();
  
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
}
