import {Reducer, Action} from '@ngrx/store';

export enum PlayState {
    PLAY,
    PAUSE,
    STOP
}

export const play: Reducer<PlayState> = (state = PlayState.STOP, action) => {
    
    switch(action.type) {
        case 'PLAY':
            return PlayState.PLAY;
        case 'PAUSE':
            return PlayState.PAUSE;
        case 'STOP':
            return PlayState.STOP;
        default: 
            return state;
    }
}