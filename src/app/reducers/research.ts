import {Reducer, Action} from '@ngrx/store';

export const research: Reducer<string[]> = (state = [], action) => {
    switch(action.type) {
        case 'ADD_SEARCH':
            return [action.payload.search, ...state];
        case 'PURGE_SEARCH':
            return [];
        default: 
            return state;
    }
}