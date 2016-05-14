 import {Reducer, Action} from '@ngrx/store';

export const playlist: Reducer<any[]> = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PLAYLIST':
            return [action.payload.video, ...state];
        case 'REMOVE_PLAYLIST':
            return state.filter(video => video.id != action.payload.id);
        case 'PURGE_PLAYLIST':
            return [];
        default:
            return state;
    }
}