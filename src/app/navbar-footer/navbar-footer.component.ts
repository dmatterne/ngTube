import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NgTubeStore } from '../shared';

import { PlayState, RepeatState, SizeState } from '../reducers';

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
    cinemaMode: Observable<boolean>;
    
    disabled: boolean = true;
    
    subscriptions: any[] = [];
  
    constructor (private store: Store<NgTubeStore>) {
      
        this.subscriptions.push(
            
            store.select('currentVideo').subscribe((video: string) => {
                
                if (video) {
                    this.disabled = false;
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
        
    }
    
    onNext () {
        
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
    
    onVolume () {
        
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
    
    onMinimize () {
        
        if (this.minimize === SizeState.MINIMIZE) {
            this.store.dispatch({ type: 'MAXIMIZE' });
        }
        else {
            this.store.dispatch({ type: 'MINIMIZE' });
        }
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
}
