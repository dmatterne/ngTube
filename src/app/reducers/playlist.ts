import {Reducer, Action} from '@ngrx/store';
import { Video } from '../shared';
 
export const playlist: Reducer<Video[]> = (state = [], action) => {
    
    switch (action.type) {
        
        case 'SELECT_ITEM':
            return state.map((video) => Object.assign({}, video, { selected: video.id === action.payload.id }));
            
        case 'ADD_TO_PLAYLIST':
            return addIfUnique(state, action.payload.video);
            
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

const addIfUnique = (state = [], video) => {
    const existingVideo = state.filter(v => v.id === video.id);
    
    if (existingVideo.length) {
        return state;
    } else {
        return [...state, video];
    }
}