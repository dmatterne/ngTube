import { Component, OnInit } from '@angular/core';
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

  constructor (private store: Store<NgTubeStore>) {}

  ngOnInit() {
    
  }
}
