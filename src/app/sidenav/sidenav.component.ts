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
  }
  
  onClick(id: string) {
        this.store.dispatch({ type: 'PLAY_VIDEO', payload: { video: id } });
        this.store.dispatch({ type: 'SELECT_ITEM', payload: { video: id } });
  }
  
  ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  } 
}
