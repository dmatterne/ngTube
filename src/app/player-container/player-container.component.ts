import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { YoutubePlayerComponent } from '../youtube-player';

import { Store } from '@ngrx/store';
import { NgTubeStore } from '../shared';
import { RepeatState, PlayState, SizeState } from '../reducers';
 
@Component({
  moduleId: module.id,
  selector: 'player-container',
  templateUrl: 'player-container.component.html',
  styleUrls: ['player-container.component.css'],
  directives: [YoutubePlayerComponent]
})
export class PlayerContainerComponent implements OnInit {
  
  
    width: number = 960;
    height: number = 585;
    
    video: string = null;

    private subscriptions: any[] = [];

    constructor (private store: Store<NgTubeStore>) {
        
        const subscription = this.store.select('currentVideo').subscribe((x: string) => {
            
            this.video = x;
        });
        
        this.subscriptions.push(subscription);
    }

    ngOnInit() {
        
    }
}
