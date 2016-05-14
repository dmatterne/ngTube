import {Reducer, Action} from '@ngrx/store';

export enum RepeatState {
    NONE,
    ONE,
    ALL
}

export const repeat: Reducer<RepeatState> = (state = RepeatState.ALL, action) => {
    
    switch (action.type) {
        case 'SET_REPEAT':
            return action.payload.repeat;
        default:
            return state;
    }
}