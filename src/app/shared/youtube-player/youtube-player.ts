import { Subject } from 'rxjs/Subject';

export class YoutubePlayer {
    
    static events: string[] = [
        'ready',
        'stateChange',
        'playbackQualityChange',
        'playbackRateChange',
        'error',
        'apiChange'
    ];
    
    
    public ytPlayer: any;
    public on: any = {};
    private _subjects: any = {};
 
    constructor (private YTPlayer, id: string, options: any) {
      
        options.events = {};
        
        if (!this.YTPlayer) {
            console.error('Youtube IFrame API not loaded...');
            return;
        }
        
        YoutubePlayer.events.forEach((event) => {
            
            this._subjects[event] = new Subject<any>();
            this.on[event] = this._subjects[event].asObservable();
            const onEvent = 'on' + event.slice(0, 1).toUpperCase() + event.slice(1);
            
            options.events[onEvent] = (value) => {
                
                this._emit(event, value);
            };
        });
        
        this.ytPlayer = new this.YTPlayer(id, options);
    }
    
    setSize (width: number, height: number) {
        this.ytPlayer.setSize(width, height);
    }
    
    loadVideoById (id: string) {
        
        this.ytPlayer.loadVideoById(id);
    }
    
    play () {
        
        this.ytPlayer.playVideo();
    }
    
    pause () {
        
        this.ytPlayer.pauseVideo();
    }
    
    stop () {
        
        this.ytPlayer.stopVideo();
    }
    
    destroy () {
        
        this.ytPlayer.destroy();
    }
    
    mute (value: boolean) {
        
        if (value) {
            this.ytPlayer.mute();
        }
        else {
            this.ytPlayer.unMute();
        }
    }
    
    setVolume (volume: number) {
        
        this.ytPlayer.setVolume(volume);
    }
    
    setPlaybackQuality (quality: string) {
        
        this.ytPlayer.setPlaybackQuality(quality);
    }
    
    private _emit (event: string, value: any) {
        
        if (this._subjects[event]) {
            this._subjects[event].next(value);
        }
    }
    
}
