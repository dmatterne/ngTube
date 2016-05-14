import {Reducer, Action} from '@ngrx/store';
import { Video } from '../shared';

export const history: Reducer<Video[]> = (state = [], action) => {
    switch (action.type) {
        case 'ADD_HISTORY':
            return [action.payload.video, ...state];
        case 'REMOVE_HISTORY':
            return state.filter(video => video.id != action.payload.id);
        case 'CLEAR_HISTORY':
            return [];
        default:
            return state;
    }
}