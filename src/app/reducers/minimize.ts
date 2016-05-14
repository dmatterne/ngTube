import {Reducer, Action} from '@ngrx/store';

export const minimize: Reducer<boolean> = (state = false, action) => {
    switch (action.type) {

        default:
            return state;
    }
}