import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { NgTubeStore, Video, nextVideo, previousVideo } from '../shared';

import { PlayState, RepeatState, SizeState, QualityState } from '../reducers';

declare var $: any;


@Component({
  moduleId: module.id,
  selector: 'navbar-footer',
  templateUrl: 'navbar-footer.component.html',
  styleUrls: ['navbar-footer.component.css']
})
export class NavbarFooterComponent implements OnInit, OnDestroy {

    play: PlayState;
    repeat: RepeatState;
    minimize: SizeState;
    quality: QualityState;
    cinemaMode: Observable<boolean>;
    mute: boolean;
    volume: number;
    currentVideo: Video;
    playlist: any[];
    
    disabled: boolean = true;
    subscriptions: any[] = [];
    
    
     qualities = [
            { value: QualityState.DEFAULT, text: 'Default' },
            { value: QualityState.SMALL, text: '240p' },
            { value: QualityState.MEDIUM, text: '360p' },
            { value: QualityState.LARGE, text: '480p' },
            { value: QualityState.HD720, text: '720p' },
            { value: QualityState.HD1080, text: '1080p' },
            { value: QualityState.HIGHRES, text: '4K' }
     ];
        
  
    constructor (private store: Store<NgTubeStore>) {
      
        this.subscriptions.push(
            
            store.select('currentVideo').subscribe((video: Video) => {
                
                this.currentVideo = video;
                
                if (video) {
                    this.disabled = false;
                }
                else if (!video) {
                    this.disabled = true;
                }
            }),
            
            store.select('play').subscribe((play: PlayState) => {
                
                this.play = play;
            }),
            
            store.select('repeat').subscribe((repeat: RepeatState) => {
                
                this.repeat = repeat;
            }),
            
            store.select('minimize').subscribe((minimize: SizeState) => {
                
                this.minimize = minimize;
            }),
            
            store.select('playlist').subscribe((playlist: any[]) => {
                
                this.playlist = playlist;  
            }),
            
            store.select('quality').subscribe((quality: QualityState) => {
                
                this.quality = quality;
            }),

            store.select('mute').subscribe((x: boolean) => {
                this.mute = x;
            }),
            
            store.select('volume').subscribe((x: number) => {
                this.volume = x;  
            })
        );
        
        this.cinemaMode = this.store.select('cinemaMode');
    }

    ngOnInit () {
    }
    
    ngOnDestroy () {
        
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  
    onPrevious () {
        
        const previous = previousVideo(this.currentVideo, this.playlist);
        this.changeVideo(previous);
    }
    
    onNext () {
                
        const next = nextVideo(this.currentVideo, this.playlist);
        this.changeVideo(next);
    }
    
    private changeVideo (video: Video) {
        
        this.store.dispatch({ type: 'PLAY_VIDEO', payload: {
            video: video
        }});
    }
    
    onCinemaMode () {
        
        this.store.dispatch({ type: 'TOGGLE_CINEMA_MODE' });
    }
  
    onPlay () {

        if (this.play === PlayState.PLAY) {
            this.store.dispatch({ type: 'PAUSE' });
        }
        else {
            this.store.dispatch({ type: 'PLAY', });
        }
    }
    
    onStop () {
        this.store.dispatch({ type: 'STOP' });
    }
    
    onMute () {
        
        if (this.mute) {
            this.store.dispatch({ type: 'UNMUTE' });
        }
        else {
            this.store.dispatch({ type: 'MUTE' });
        }
    }
    
    setVolume (volume: string) {
        
        this.store.dispatch({ type: 'SET_VOLUME', payload: { volume: parseInt(volume) }});
    }
    
    
    onRepeat () {
        
        const action = 'SET_REPEAT';
        const payload: any = {};
        switch (this.repeat) {
            
            case RepeatState.NONE:
                payload.repeat = RepeatState.ALL;
                break;
            case RepeatState.ALL:
                payload.repeat = RepeatState.ONE;
                break;
            case RepeatState.ONE:
                payload.repeat = RepeatState.NONE;
                break;
        }
        
        this.store.dispatch({ type: action, payload: payload });
    }
    
    onQuality (quality: QualityState) {
       
        this.store.dispatch({ type: 'SET_QUALITY', payload: { quality: quality } });
    }
    
    onMinimize () {
        
        if (this.minimize === SizeState.MINIMIZE) {
            this.store.dispatch({ type: 'MAXIMIZE' });
        }
        else {
            this.store.dispatch({ type: 'MINIMIZE' });
        }
    }
    
    // Zero or one is not a "real" playlist
    isRealPlaylist() {
        
        return this.playlist && this.playlist.length > 1;
    }
    
    isMinimize () {
        
        return this.minimize === SizeState.MINIMIZE;
    }
    
    isPlay () {
        
        return this.play === PlayState.PLAY;
    }
    
    isStop () {
        
        return this.play === PlayState.STOP;
    }
    
    isRepeatNone () {
        
        return this.repeat === RepeatState.NONE;
    }
    
    isRepeatOne () {
        
        return this.repeat === RepeatState.ONE;
    }
    
    isRepeatAll () {
        
        return this.repeat === RepeatState.ALL;
    }
    
    
    sidebar () {
        $('.button-collapse').sideNav();
    }
}
