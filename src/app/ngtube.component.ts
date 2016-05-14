import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {ngTubeStore} from './shared';
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
    playlist: Observable<any[]>;
    
    constructor(private store: Store<ngTubeStore>) {
        console.log(store);
        //playlist = store.select('playlist');
    }
    
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