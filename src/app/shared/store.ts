import { SizeState, PlayState, RepeatState } from '../reducers';

export interface NgTubeStore {
    history: any[];
    minimize: SizeState;
    play: PlayState;
    playlist: any[];
    repeat: RepeatState;
    search: string;
    currentVideo: string;
}