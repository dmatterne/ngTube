import {Reducer, Action} from '@ngrx/store';

export const quality: Reducer<string[]> = (state = [], action) => {
    
    switch (action.type) {
        case 'SET_QUALITY':
            return ;
        case 'SET_QUALITIES':
            return action.payload.qualities;
        default:
            return state;
    }
}