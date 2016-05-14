import {Reducer, Action} from '@ngrx/store';

export const cinemaMode: Reducer<boolean> = (state: boolean = false,  action) => {
    
    switch (action.type) {
        
        case 'TOGGLE_CINEMA_MODE':
            return !state;
            
        default:
            return state;
    }
}