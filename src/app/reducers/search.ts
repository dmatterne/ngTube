import {Reducer, Action} from '@ngrx/store';

export const search: Reducer<string> = (state: string = '', action) => {
    
    switch(action.type) {
        case 'SEARCHED':
            return action.payload.search;
            
        case 'CLEARED_SEARCH':
            return '';
            
        default: 
            return state;
    }
}