import { SizeState, PlayState, RepeatState } from '../reducers';
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
    currentQuality: string;
    qualities: string[];
}

export interface NgTubeStorage {
    playlist: any[];
    repeat: RepeatState;
    search: string;
    currentVideo: Video;
    cinemaMode: boolean;
    mute: boolean;
    volume: number;
}

export function mapToStorage (store: NgTubeStore): NgTubeStorage {
    
    return {
        playlist: store.playlist,
        repeat: store.repeat,
        search: store.search,
        currentVideo: store.currentVideo,
        cinemaMode: store.cinemaMode,
        mute: store.mute,
        volume: store.volume
    };
}
