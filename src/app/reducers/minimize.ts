import {Reducer, Action} from '@ngrx/store';

export const minimize: Reducer<boolean> = (state = false,  action) => {
    switch (action.type) {
        case "SET_MINIMIZE":
            return action.payload.minimize;
        default:
            return state;
    }
}