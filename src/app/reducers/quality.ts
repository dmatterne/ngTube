import {Reducer, Action} from '@ngrx/store';

export enum QualityState {
    DEFAULT,
    HIGHRES,
    HD1080,
    HD720,
    LARGE,
    MEDIUM,
    SMALL
}

export const quality: Reducer<QualityState> = (state = QualityState.DEFAULT, action) => {
    
    switch (action.type) {
        case 'SET_QUALITY':
            return action.payload.quality;
        default:
            return state;
    }
}