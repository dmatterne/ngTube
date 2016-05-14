import { Component } from '@angular/core';
import { NavbarComponent } from './navbar';
import { SidenavComponent } from './sidenav';

@Component({
  moduleId: module.id,
  selector: 'ngtube-app',
  templateUrl: 'ngtube.component.html',
  styleUrls: ['ngtube.component.css'],
  directives: [NavbarComponent, SidenavComponent]
})
export class NgtubeAppComponent {
  
}
