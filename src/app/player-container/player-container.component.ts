import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
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
  
    @HostBinding('class.minimize') minimize = false;
    @ViewChild(YoutubePlayerComponent) player: YoutubePlayerComponent;
    
    maximizeWidth: number = 960;
    maximizeHeight: number = 585;
    minimizeWidth: number = 240;
    minimizeHeight: number = 146.25;
    
    width: number = this.maximizeWidth;
    height: number = this.maximizeHeight;
    video: string = null;
    
    

    private subscriptions: any[] = [];

    constructor (private store: Store<NgTubeStore>) {
        
        this.subscriptions.push(
            this.store.select('currentVideo').subscribe((x: string) => {
                
                console.log(x);
                this.video = x;
            }),
            
            this.store.select('minimize').subscribe((x: SizeState) => {
                
                this.minimize = (x === SizeState.MINIMIZE);
                if (this.minimize) {
                    this.width = this.minimizeWidth;
                    this.height = this.minimizeHeight;
                }
                else {
                    this.width = this.maximizeWidth;
                    this.height = this.maximizeHeight;
                }
            }),
            
            this.store.select('play').subscribe((x: PlayState) => {
               
                if (!this.player) {
                    return;
                }
                
                switch (x) {
                    case PlayState.PLAY:
                        this.player.play();
                        break;
                    case PlayState.PAUSE:
                        this.player.pause();
                        break;
                    case PlayState.STOP:
                        this.player.stop();
                        break;
                } 
            })
        );
        
       
    }
    
    stateChange (state: number) {
        
        console.log(state);
        switch (state) {
            case 1: 
                this.store.dispatch({ type: 'PLAY' });
                break;
            case 2: 
                this.store.dispatch({ type: 'PAUSE' });
                break;
            case 0:
                this.store.dispatch({ type: 'STOP' });
                break;
        }
    }

    ngOnInit() {
        
    }
    
    ngOnDestroy () {
        
        this.subscriptions.forEach((x) => x.unsubscribe());
    }
}
