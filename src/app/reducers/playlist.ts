import {Reducer, Action} from '@ngrx/store';
import { Video } from '../shared';
 
export const playlist: Reducer<Video[]> = (state = [], action) => {
    
    switch (action.type) {
        
        case 'SELECT_ITEM':
            return state.map((video) => selectItem(video, action.payload.id));
            
        case 'ADD_TO_PLAYLIST':
            return [...state, action.payload.video];
            
        case 'REMOVE_FROM_PLAYLIST':
            if (action.payload.video) {
                return state.filter((video) => video.id !== action.payload.video.id);
            }
            else {
                return state.filter((video) => video.id != action.payload.id);
            }
            
        case 'CLEAR_PLAYLIST':
            return [];
            
        default:
            return state;
    }
}

const selectItem = (state: Video, id: string) => {
    
    if (state.id === id) {
        return Object.assign({}, state, { selected: true });
    } else {
        return state;
    }
}