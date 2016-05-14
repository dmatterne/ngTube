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

  videos: Video[];
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
        id: "oBbHo8b4FDc",
        title: "title1",
        thumbnailUrl: "https://i.ytimg.com/vi/oBbHo8b4FDc/default.jpg",
        duration: 212
      },
      {
        id: "SWEYLpG70AI",
        title: "PNL - Oh Lala [Clip Officiel]",
        thumbnailUrl: "https://i.ytimg.com/vi/SWEYLpG70AI/default.jpg",
        duration: 212
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
