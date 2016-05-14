import { minimize } from './minimize';
import { repeat } from './repeat';
import { play } from './play';
import { playlist } from './playlist';
import { history } from './history';
import { search } from './search';
import { currentVideo } from './current-video';
import { cinemaMode } from './cinema-mode';

export * from './minimize';
export * from './repeat';
export * from './play';
export * from './playlist';
export * from './history';
export * from './search';
export * from './current-video';
export * from './cinema-mode';

export const reducers = {
    minimize,
    repeat,
    play,
    playlist,
    history,
    search,
    currentVideo,
    cinemaMode
}