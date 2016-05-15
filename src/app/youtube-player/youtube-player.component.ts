import { Component, Input, Output, Inject, AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { YoutubePlayerService } from '../youtube-player.service';
import { YoutubePlayer } from '../shared'; 

@Component({
    selector: 'youtube-player',
    template: `
        <div>
            <div [id]="playerId"></div>
        </div>
    `,
    providers: [YoutubePlayerService]
})
export class YoutubePlayerComponent implements AfterViewInit, OnInit {
    
    private _width: number = 390;
    private _height: number = 180;
    private _videoId: string = null;
    private viewInit = false;
    
    private player: YoutubePlayer;
    
    @Input() set width (value) {
        
        this._width = value;
        if (this.player) {
            this.player.setSize(this.width, this.height);
        }
    }
    
    get width (): number {
        
        return this._width;
    }
    
    @Input()
    set height (value) {
        
        this._height = value;
        if (this.player) {
            this.player.setSize(this.width, this.height);
        }
    }
    
    get height (): number {
        
        return this._height;
    }
    
    @Input() set videoId (videoId: string) {
        
        this._videoId = videoId;
        
        if (this.viewInit && !this.player) {
            this.initPlayer();
        }
        else if (this.viewInit && this.player) {
            this.player.loadVideoById(videoId);
        }
    }
    
    get videoId (): string {
        
        return this._videoId;
    }
    
    @Input()
    playerId: string = 'player';
    
    @Input()
    autoplay: boolean = false;
    
    @Output()
    ready = new EventEmitter<any>();
    
    @Output()
    stateChange = new EventEmitter<any>();
    
    @Output()
    playbackQualityChange = new EventEmitter<any>();
    
    @Output()
    playbackRateChange = new EventEmitter<any>();
    
    @Output()
    error = new EventEmitter<any>();
    
    @Output()
    apiChange = new EventEmitter<any>();
    
    
    
    private subscriptions: any[] = [];
    
    constructor (private ytPlayerService: YoutubePlayerService) {}
    
    public play () {
        
        if (this.player) {
            this.player.play();
        }
    }
    
    public pause () {
        
        if (this.player) {
            this.player.pause();
        }
    }
    
    public stop () {
        
        if (this.player) {
            this.player.stop();
        }
    }
    
    public mute (value: boolean) {
        
        if (this.player) {
            this.player.mute(value);
        }
    }
    
    public setVolume(volume: number) {
        
        if (this.player) {
            this.player.setVolume(volume);
        }
    }
    
    public setPlaybackQuality(quality: string) {
        
        if (this.player) {
            this.player.setPlaybackQuality(quality);
        }
    }
    
    public destroy () {
        
        if (this.player) {
            this.stop();
            this.player.destroy();
        }
    }
   
    ngOnInit () {
        
        if (!this.videoId) {
            throw new Error('Missing video id');
        }
    }
    
    ngAfterViewInit () {
        
        this.viewInit = true;
        
        if (this.videoId) {
            this.initPlayer();
        }
    }
    
    initPlayer () {
        
        this.player = this.ytPlayerService.create(this.playerId, {
            width: this.width,
            height: this.height,
            videoId: this.videoId,
            playerVars: {
                autoplay: this.autoplay ? 1 : 0,
                frameborder: 0
            }
        });
        
        YoutubePlayer.events.forEach((event) => {
            
            this.subscriptions.push(
                this.player.on[event].subscribe((value) => {
                    this[event].emit(value); 
                })
            )
        });
    }
    
    unsubscribe () {
        
        
        this.subscriptions.forEach((subscription) => {
            
            if (subscription) {
                subscription.unsubscribe();
            }
        })
    }
    
    ngOnDestroy () {
        
        this.unsubscribe();
    }
}

