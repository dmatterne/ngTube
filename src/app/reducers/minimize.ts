import {Reducer, Action} from '@ngrx/store';

export enum SizeState {
    MINIMIZE,
    MAXIMIZE
}

export const minimize: Reducer<SizeState> = (state: SizeState = SizeState.MINIMIZE,  action) => {
    
    switch (action.type) {
        
        case 'MINIMIZE':
            return SizeState.MINIMIZE;
            
        case 'MAXIMIZE':
            return SizeState.MAXIMIZE;
            
        default:
            return state;
    }
}