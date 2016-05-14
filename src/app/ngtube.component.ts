import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar';
import { SidenavComponent } from './sidenav';
import { ThumbnailListComponent } from './thumbnail-list';
import { Video } from './shared';
import { YoutubePlayerComponent } from './youtube-player';
import { YoutubePlayerService } from './youtube-player.service';

@Component({
  moduleId: module.id,
  selector: 'ngtube-app',
  templateUrl: 'ngtube.component.html',
  styleUrls: ['ngtube.component.css'],
  directives: [NavbarComponent, SidenavComponent, YoutubePlayerComponent, ThumbnailListComponent]
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