import { Video } from './video';

const getData = function (video: Video, playlist: Video[]): any {
    
    const length = playlist.length;
    const ids = playlist.map((x) => x.id);
    const index = ids.indexOf(video.id);
    
    return { length, ids, index };
}

export function nextVideo (video: Video, playlist: Video[] = []): Video {
    
    if (playlist.length === 0) {
        return video;
    }
    
    const { length, ids, index } = getData(video, playlist);
    
    if (index === -1) {
        return playlist[0];
    }
    
    const last = (index === length - 1);
    let next;
    if (last) {
        next = playlist[0];
    }
    else {
        next = playlist[index + 1];
    }
    
    return next;
}

export function previousVideo (video: Video, playlist: Video[] = []): Video {
    
    if (playlist.length === 0) {
        return video;
    }
    
    const { length, ids, index } = getData(video, playlist);
    
    if (index === -1) {
        return playlist[0];
    }
    
    const first = (index === 0);
    let previous;
    if (first) {
        previous = playlist[length - 1];
    }
    else {
        previous = playlist[index - 1];
    }
    
    return previous;
}

