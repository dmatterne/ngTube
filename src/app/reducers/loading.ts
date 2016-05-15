import {Reducer, Action} from '@ngrx/store';

export const loading: Reducer<boolean> = (state: boolean = false,  action) => {
    
    switch (action.type) {
        
        case 'SET_LOADING':
            return action.payload.value;
            
        default:
            return state;
    }
}