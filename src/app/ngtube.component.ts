import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar';
import { SidenavComponent } from './sidenav';
import { ThumbnailListComponent } from './thumbnail-list';
import { Video } from './shared';

@Component({
  moduleId: module.id,
  selector: 'ngtube-app',
  templateUrl: 'ngtube.component.html',
  styleUrls: ['ngtube.component.css'],
  directives: [NavbarComponent, SidenavComponent, ThumbnailListComponent]
})
export class NgtubeAppComponent implements OnInit {
    research: Video[];

    ngOnInit() {
        
        this.research = [
          {
              title: "Kaaris - Le bruit de mon âme",
              url: "https://i.ytimg.com/vi/LBr3HjsUZBg/default.jpg"
          },
          {
              title: "Booba feat Kaaris - Kalash",
              url: "https://i.ytimg.com/vi/oBbHo8b4FDc/default.jpg"
          }
        ];
    }
}
