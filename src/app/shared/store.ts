import { SizeState, PlayState, RepeatState } from '../reducers';

export interface NgTubeStore {
    history: any[];     
    minimize: SizeState; 
    play: PlayState;    
    playlist: any[];    // to save
    repeat: RepeatState; // to save
    search: string; // to save
    currentVideo: string; // to save
}

export interface NgTubeStorage {
    playlist: any[];
    repeat: RepeatState;
    search: string;
    currentVideo: string;
}

export function mapToStorage (store: NgTubeStore): NgTubeStorage {
    
    return {
        playlist: store.playlist,
        repeat: store.repeat,
        search: store.search,
        currentVideo: store.currentVideo
    };
}