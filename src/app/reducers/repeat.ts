import {Reducer, Action} from '@ngrx/store';

export const repeat: Reducer<string> = (state = 'NONE', action) => {
    switch (action.type) {
        case 'SET_REPEAT':
            return action.payload.repeat;
        default:
            return state;
    }
}