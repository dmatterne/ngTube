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
console.log(video);
    switch (direction) {
        case 'up':
            return moveUp(state, index);
        case 'down':
            return moveDown(state, index);
        default:
            return state;
    }
}

const moveUp = (state = [], index) => {
    return (index > 0)
        ? [ ...state.slice(0, index - 1),
            state[index],
            state[index - 1],
            ...(state.slice(index + 1).filter(video => video)) ]
        : state;
}

const moveDown = (state = [], index) => {
    return (index < state.length - 1)
        ? [ ...state.slice(0, index),
            state[index + 1],
            state[index],
            ...(state.slice(index + 2).filter(video => video)) ]
        : state;
}

const addIfUnique = (state = [], video) => {
    const existingVideo = state.filter(v => v.id === video.id);
    
    if (existingVideo.length) {
        return state;
    } else {
        return [...state, video];
    }
}