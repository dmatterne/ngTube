import {Reducer, Action} from '@ngrx/store';

export const play: Reducer<string> = (state = 'STOP', action) => {
    switch(action.type) {
        case 'PLAY':
        case 'PAUSE':
        case 'STOP':
            return action.payload.play;
        default: 
            return state;
    }
}