import { minimize } from './minimize';
import { repeat } from './repeat';
import { play } from './play';
import { playlist } from './playlist';
import { history } from './history';
import { search } from './search';
import { currentVideo } from './current-video';
import { cinemaMode } from './cinema-mode';
import { loading } from './loading';
import { currentQuality } from './current-quality';
import { qualities } from './qualities';
import { volume } from './volume';
import { mute } from './mute';

export * from './minimize';
export * from './repeat';
export * from './play';
export * from './playlist';
export * from './history';
export * from './search';
export * from './current-video';
export * from './cinema-mode';
export * from './loading';
export * from './current-quality';
export * from './qualities';
export * from './volume';
export * from './mute';

export const reducers = {
    minimize,
    repeat,
    play,
    playlist,
    history,
    search,
    currentVideo,
    cinemaMode,
    loading,
    currentQuality,
    qualities,
    volume,
    mute
}