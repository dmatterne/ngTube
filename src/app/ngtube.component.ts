import { Component, OnInit, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { NavbarComponent } from './navbar';
import { SidenavComponent } from './sidenav';
import { ThumbnailListComponent } from './thumbnail-list';
import { Video } from './shared';
import { YoutubePlayerComponent } from './youtube-player';
import { YoutubePlayerService } from './youtube-player.service';
import { YoutubeSearchService } from './youtube-search.service';
import { config, APP_CONFIG } from './shared';

@Component({
  moduleId: module.id,
  selector: 'ngtube-app',
  templateUrl: 'ngtube.component.html',
  providers: [
      provide(APP_CONFIG, { useValue: config }),
      HTTP_PROVIDERS,
      YoutubeSearchService
  ],
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