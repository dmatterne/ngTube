import {Reducer, Action} from '@ngrx/store';

export const currentVideo: Reducer<string> = (state: string = null,  action) => {
    
    switch (action.type) {
        
        case 'PLAY_VIDEO':
            return action.payload.video;
            
        default:
            return state;
    }
}