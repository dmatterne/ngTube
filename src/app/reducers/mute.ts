import {Reducer, Action} from '@ngrx/store';

export const mute: Reducer<boolean> = (state: boolean = false, action) => {
    
    switch(action.type) {
        
        case 'MUTE':
            return true;
            
        case 'UNMUTE':
            return false;
            
        default: 
            return state;
    }
}