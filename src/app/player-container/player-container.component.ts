import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { YoutubePlayerComponent } from '../youtube-player';

import { Store } from '@ngrx/store';
import { NgTubeStore, Video, nextVideo } from '../shared';
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
    video: Video = null;
    playlist: Video[];
    
    repeat: RepeatState;
    cinemaMode: Observable<boolean>;
    

    private subscriptions: any[] = [];

    constructor (private store: Store<NgTubeStore>) {
        
        this.subscriptions.push(
            this.store.select('currentVideo').subscribe((x: Video) => {
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
                        this.player.destroy();
                        this.store.dispatch({ type: 'STOP_VIDEO' });
                        break;
                } 
            }),
            
            this.store.select('repeat').subscribe((x: RepeatState) => {
                this.repeat = x;  
            }),
            
            this.store.select('playlist').subscribe((x: Video[]) => {
                this.playlist = x;
            })
        );
        
        this.cinemaMode = this.store.select('cinemaMode');
        
       
    }
    
    private changeVideo (video: Video) {
        
        this.store.dispatch({ type: 'PLAY_VIDEO', payload: {
            video: video
        }});
    }
    
    stateChange (state: number) {
        
        switch (state) {
            case 0:
                if (this.repeat === RepeatState.NONE) {
                    this.store.dispatch({ type: 'STOP' });
                }
                
                if (this.repeat === RepeatState.ALL) {
                    const next = nextVideo(this.video, this.playlist);
                    this.changeVideo(next);
                }
                
                if (this.repeat === RepeatState.ONE) {
                    this.player.play();
                }
                
                break;
            case 1: 
                this.store.dispatch({ type: 'PLAY' });
                break;
            case 2: 
                this.store.dispatch({ type: 'PAUSE' });
                break;
        }
    }

    ngOnInit() {
        
    }
    
    ngOnDestroy () {
        
        this.subscriptions.forEach((x) => x.unsubscribe());
    }
}
