import { Component, Input, HostListener  } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-sidenav-tile',
  templateUrl: 'sidenav-tile.component.html',
  styleUrls: ['sidenav-tile.component.css']
})
export class SidenavTileComponent {
  
  @Input() title: string;
  @Input() thumbnailUrl: string;
  @Input() duration: string;
  @Input() videoId: string;
  
  selected: boolean = false;

  @HostListener('mouseclick') onMouseClick() {
    //dispatch({PLAY});
  }
}
