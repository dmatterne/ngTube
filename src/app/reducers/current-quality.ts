import {Reducer, Action} from '@ngrx/store';

export const currentQuality = (state = 'auto', action) => {
    
    switch (action.type) {
        
        case 'SET_QUALITY':
            return action.payload.quality;

        default:
            return state;
    }
}