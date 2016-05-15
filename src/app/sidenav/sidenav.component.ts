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
    
    if (arrow === 'up' && index > 0) { 
        this.videos = [
          ...this.videos.slice(0, index - 1),
          this.videos[index],
          this.videos[index - 1],
          ...this.videos.slice(index + 1)
        ]
    }
    else if (arrow === 'down' && index < this.videos.length - 1) {
        this.videos = [
          ...this.videos.slice(0, index),
          this.videos[index + 1],
          this.videos[index],
          ...this.videos.slice(index + 2)
        ]
    }
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
