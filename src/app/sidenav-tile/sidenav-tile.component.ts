import { Component, Input, EventEmitter, Output, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Video } from '../shared';
import { IsoToHMSPipe } from '../iso-to-hms.pipe';

@Component({
  moduleId: module.id,
  selector: 'sidenav-tile',
  templateUrl: 'sidenav-tile.component.html',
  styleUrls: ['sidenav-tile.component.css'],
  pipes: [IsoToHMSPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  
  moveForward($event: Event) {
    $event.stopPropagation();
    this.emitArrow(this.video, 'down');
  }
  
  moveBackward($event: Event) {
    $event.stopPropagation();
    this.emitArrow(this.video, 'up');
    
  }
  
  emitArrow(video: Video, arrow: string) {
    this.clickArrow.emit({
      video,
      arrow
    });
  }
}
