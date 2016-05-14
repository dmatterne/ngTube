import {Reducer, Action} from '@ngrx/store';

export const repeated: Reducer<string> = (state = 'NONE', action) => {
    switch (action.type) {
        case 'ONE':
            return Object.assign({}, state, repeated: 'ONE');
        case 'PLAYLIST':
            return Object.assign({}, state, repeated: 'PLAYLIST');
        case 'NONE':
            return Object.assign({}, state, repeated: 'NONE');
        default:
            return state;
    }
}