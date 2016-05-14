import { OpaqueToken, provide, Injectable, Inject  } from '@angular/core';
import { YoutubePlayer } from './shared';

export const YT_PLAYER_API: OpaqueToken = new OpaqueToken('YT_PLAYER_API');

export function youtubePlayerProvider () {
  
    return provide(YT_PLAYER_API, { useValue: window['YT'] });
}

@Injectable()
export class YoutubePlayerService {
    
    constructor (@Inject(YT_PLAYER_API) private ytPlayerApi) {
    }
    
    create (id: string, options: any) {
        
        return new YoutubePlayer(this.ytPlayerApi.Player, id, options);
    }
}