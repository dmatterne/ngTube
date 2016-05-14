import { Component, OnInit, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { NavbarComponent } from './navbar';
import { NavbarFooterComponent } from './navbar-footer';
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
  directives: [NavbarComponent, 
               SidenavComponent,
               NavbarFooterComponent,
               YoutubePlayerComponent,
               ThumbnailListComponent
  ]
})
export class NgtubeAppComponent implements OnInit {
    research: Video[];

    ngOnInit() {
        
        this.research = [
          {
              title: "Kaaris - Le bruit de mon âme",
              url: "http://img.youtube.com/vi/bQVoAWSP7k4/0.jpg"
          },
          {
              title: "Booba feat Kaaris - Kalash",
              url: "http://img.youtube.com/vi/bQVoAWSP7k4/0.jpg"
          },
          {
              title: "Booba feat Kaaris - Kalash & roses & volkswagen",
              url: "http://img.youtube.com/vi/bQVoAWSP7k4/0.jpg"
          },
          {
              title: "Kaaris - Le bruit de mon âme",
              url: "http://img.youtube.com/vi/bQVoAWSP7k4/0.jpg"
          },
          {
              title: "Booba feat Kaaris - Kalash",
              url: "http://img.youtube.com/vi/bQVoAWSP7k4/0.jpg"
          },
          {
              title: "Booba feat Kaaris - Kalash & roses & volkswagen",
              url: "http://img.youtube.com/vi/bQVoAWSP7k4/0.jpg"
          }
        ];
    }
}