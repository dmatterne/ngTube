import { Component } from '@angular/core';
import { NavbarComponent } from './navbar';
import { SidenavComponent } from './sidenav';
import { YoutubePlayerComponent } from './youtube-player';
import { YoutubePlayerService } from './youtube-player.service';


@Component({
  moduleId: module.id,
  selector: 'ngtube-app',
  templateUrl: 'ngtube.component.html',
  styleUrls: ['ngtube.component.css'],
  directives: [NavbarComponent, SidenavComponent, YoutubePlayerComponent]
})
export class NgtubeAppComponent {
  
}
