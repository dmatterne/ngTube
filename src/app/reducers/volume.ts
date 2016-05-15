import {Reducer, Action} from '@ngrx/store';

export const volume: Reducer<number> = (state: number = 100, action) => {
    
    switch(action.type) {
        case 'SET_VOLUME':
            return action.payload.volume;
            
        default: 
            return state;
    }
}