import {Reducer, Action} from '@ngrx/store';

export const qualities: Reducer<string[]> = (state = [], action) => {
    
    switch (action.type) {
        case 'ADD_QUALITY':
            return [
                ...state,
                action.payload.quality
            ];
            
        case 'SET_QUALITIES':
            return action.payload.qualities;
            
        default:
            return state;
    }
}