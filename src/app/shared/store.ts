import { SizeState, PlayState, RepeatState, QualityState } from '../reducers';
import { Video } from './video';

export interface NgTubeStore {
    history: any[];     
    minimize: SizeState; 
    play: PlayState;    
    playlist: any[];    // to save
    repeat: RepeatState; // to save
    search: string; // to save
    currentVideo: Video; // to save,
    cinemaMode: boolean;
    mute: boolean;
    loading: boolean;
    volume: number;
    quality: QualityState;
}

export interface NgTubeStorage {
    playlist: any[];
    repeat: RepeatState;
    search: string;
    cinemaMode: boolean;
    mute: boolean;
    volume: number;
}

export function mapToStorage (store: NgTubeStore): NgTubeStorage {
    
    return {
        playlist: store.playlist,
        repeat: store.repeat,
        search: store.search,
        cinemaMode: store.cinemaMode,
        mute: store.mute,
        volume: store.volume
    };
}
