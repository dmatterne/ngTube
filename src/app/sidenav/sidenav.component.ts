import { Component, OnInit} from '@angular/core';
import { SidenavTileComponent } from '../sidenav-tile';

@Component({
  moduleId: module.id,
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
  directives: [SidenavTileComponent]
})
export class SidenavComponent implements OnInit {

  videos: any[];
  
  constructor() {}

  ngOnInit() {
    this.videos = [
      {
        title: "title1"
      },
      {
        title: "title2"
      }
    ]
  }
  
  
}
