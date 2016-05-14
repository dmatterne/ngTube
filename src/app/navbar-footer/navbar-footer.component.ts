import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NgTubeStore } from '../shared';

import { PlayState, RepeatState } from '../reducers';

@Component({
  moduleId: module.id,
  selector: 'navbar-footer',
  templateUrl: 'navbar-footer.component.html',
  styleUrls: ['navbar-footer.component.css']
})
export class NavbarFooterComponent implements OnInit, OnDestroy {

    play: PlayState;
    repeat: RepeatState;
    
    subscriptions: any[] = [];
  
    constructor (private store: Store<NgTubeStore>) {
      
        this.subscriptions.push(
            
            store.select('play').subscribe((play: PlayState) => {
                
                this.play = play;
            }),
            
            store.select('repeat').subscribe((repeat: RepeatState) => {
                
                this.repeat = repeat;
            })
        )
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
  
    onPlay () {

        if (this.play === PlayState.PLAY) {
            this.store.dispatch({ type: 'PAUSE' });
        }
        else {
            this.store.dispatch({ type: 'PLAY', })
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
        
        this.store.dispatch({ type: action, payload: payload })
    }
    
    isPlay () {
        
        return this.play === PlayState.PLAY;
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
