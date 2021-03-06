import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Video, NgTubeStore } from '../shared';
import { SidenavTileComponent } from '../sidenav-tile';

@Component({
  moduleId: module.id,
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
  directives: [SidenavTileComponent]
})
export class SidenavComponent implements OnInit, OnDestroy {

  videos: Video[];
  currentVideo: Observable<Video>;
  subscriptions: any[] = [];
  
  constructor(private store: Store<NgTubeStore>) {
    this.subscriptions.push(
      this.store.select('playlist').subscribe((videos: any[]) => {
        this.videos = videos || [];
      })
    );
    
    this.currentVideo = this.store.select('currentVideo');
  }
  

  ngOnInit() {
  }
  
  onClickArrow(tile: any) {
    
    const {video, arrow} = tile;
    const index = this.videos.indexOf(video);
    
    this.store.dispatch({ type: 'MOVE_IN_PLAYLIST', payload: {direction: arrow, video: video}});
  }
  
  onClickTile(video: Video) {
      
      this.store.dispatch({ type: 'PLAY_VIDEO', payload: { video: video } });
      this.store.dispatch({ type: 'MAXIMIZE' });
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
