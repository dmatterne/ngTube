import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

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
  subscriptions: any[] = [];
  
  overflowHidden: boolean = true;
  
  @HostListener('mouseenter')
  showOverflow() {
    this.overflowHidden = false;
  }
  
  @HostListener('mouseleave')
  hideOverflow() {
    this.overflowHidden = true;
  }
  
  constructor(private store: Store<NgTubeStore>) {
    this.subscriptions.push(
      this.store.select('playlist').subscribe((videos: any[]) => {
        this.videos = videos || [];
        console.log(this.videos);
      })
    );
  }

  ngOnInit() {
  }
  
  onClick (video: Video) {
        this.store.dispatch({ type: 'SELECT_ITEM', payload: { video: video.id }});
        this.store.dispatch({ type: 'PLAY_VIDEO', payload: { video: video } });
  }
  
  clear_playlist() {
        this.store.dispatch({ type: 'CLEAR_PLAYLIST', payload: {} });
  }
  
  ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  } 
}
