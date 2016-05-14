import { Component, OnInit, OnDestroy } from '@angular/core';
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

  videos: any[];
  subscriptions: any[] = [];
  
  constructor(private store: Store<NgTubeStore>) {
    this.subscriptions.push(
      this.store.select('playlist').subscribe((videos: any[]) => {
        this.videos = videos || [];
      })
    );
  }

  ngOnInit() {
    this.videos = [
      {
        title: "title1",
        thumbnailUrl: "https://i.ytimg.com/vi/oBbHo8b4FDc/default.jpg",
        duration: "3:32"
      },
      {
        title: "title1",
        thumbnailUrl: "https://i.ytimg.com/vi/oBbHo8b4FDc/default.jpg",
        duration: "3:32"
      }
    ]
  }
  
  onClick(videoId: string) {
        this.store.dispatch({ type: 'PLAY_VIDEO', payload: { video: videoId } });
  }
  
  ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  } 
}
