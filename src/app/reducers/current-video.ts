import {Reducer, Action} from '@ngrx/store';
import { Video } from '../shared';

export const currentVideo: Reducer<Video> = (state: Video = null,  action) => {
    
    switch (action.type) {
        
        case 'PLAY_VIDEO':
            return action.payload.video;
            
        case 'STOP_VIDEO':
            return null;
            
        default:
            return state;
    }
}