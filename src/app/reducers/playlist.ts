import {Reducer, Action} from '@ngrx/store';
import { Video } from '../shared';
 
export const playlist: Reducer<Video[]> = (state = [], action) => {
    
    switch (action.type) {
        case 'MOVE_IN_PLAYLIST':
            return move(state, action.payload.direction, action.payload.video);
            
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

const move = (state = [], direction, video) => {
    const index = state.indexOf(video);
    switch (direction) {
        case 'up':
            return moveUp(state, index);
        case 'down':
            return moveDown(state, index);
        default:
            return state;
    }
}

const moveUp = (state: any[] = [], index: number) => {
    
    if (index === 0) {
        return state;
    }
    
    const firstPart = [...state.slice(0, index - 1)];
    
    const element = state[index];
    const secondElement = state[index - 1];
    const rest = index + 1 <= state.length - 1 ? state.slice(index + 1) : [];
    
    return [...firstPart, element, secondElement, ...rest];
}



const moveDown = (state: any[] = [], index: number) => {
    
    if (index >= state.length - 1) {
        return state;
    }
    
    const firstPart = state.slice(0, index);
    const element = state[index];
    const secondElement = state[index + 1];
    const rest = index + 2 <= state.length - 1  ? state.slice(index + 2) : [];
    
    
    
    return [...firstPart, secondElement, element, ...rest];
}

const addIfUnique = (state = [], video) => {
    const existingVideo = state.filter(v => v.id === video.id);
    
    if (existingVideo.length) {
        return state;
    } else {
        return [...state, video];
    }
}