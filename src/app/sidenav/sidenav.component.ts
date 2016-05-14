import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';

import { Video, NgTubeStore } from '../shared';
import { SidenavTileComponent } from '../sidenav-tile';

@Component({
  moduleId: module.id,
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
  viewProviders: [DragulaService],
  directives: [SidenavTileComponent, Dragula]
})
export class SidenavComponent implements OnInit, OnDestroy {

  videos: Video[];
  subscriptions: any[] = [];
 
  constructor(private store: Store<NgTubeStore>, private dragulaService: DragulaService) {
    this.subscriptions.push(
      this.store.select('playlist').subscribe((videos: any[]) => {
        this.videos = videos || [];
      })
    );
    
    dragulaService.setOptions('bag-one', {
      removeOnSpill: true
    });
  }

  ngOnInit() {
  }
  
  onClickTile(video: Video) {
        this.videos = this.videos.map(v => Object.assign({}, v, {selected: v.id === video.id}));
        this.store.dispatch({ type: 'PLAY_VIDEO', payload: { video: video } });
  }
  
  onClickDelete(video: Video) {
        this.store.dispatch({ type: 'REMOVE_FROM_PLAYLIST', payload: { video: video } });
  }
  
  clearPlaylist() {
        this.store.dispatch({ type: 'CLEAR_PLAYLIST', payload: {} });
  }
  
  ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  } 
}
