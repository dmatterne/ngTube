import { Component, Input, Output, Inject, AfterViewInit, EventEmitter } from '@angular/core';
import { YoutubePlayerService } from '../youtube-player.service';
import { YoutubePlayer } from '../shared'; 

@Component({
    selector: 'youtube-player',
    template: `
        <div class="video-contaner">
            <div [id]="playerId"></div>
        </div>
    `,
    providers: [YoutubePlayerService]
})
export class YoutubePlayerComponent implements AfterViewInit {
    
    private _width: number = 390;
    private _height: number = 180;
    
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
    
    private player: YoutubePlayer;
    
    private _subscriptions: any[] = [];
    
    constructor (private ytPlayerService: YoutubePlayerService) {}
   
    
    ngAfterViewInit () {
        
        this.player = this.ytPlayerService.create(this.playerId, {
            width: this.width,
            height: this.height,
            videoId: 'M7lc1UVf-VE',
            playerVars: {
                autoplay: this.autoplay ? 1 : 0,
                frameborder: 0
            }
        });
        
        YoutubePlayer.events.forEach((event) => {
            
            this._subscriptions.push(
                this.player.on[event].subscribe((value) => {
                    this[event].emit(value); 
                })
            )
        });
    }
    
    ngOnDestroy () {
        
        this._subscriptions.forEach((subscription) => {
            
            if (subscription) {
                subscription.unsubscribe();
            }
        })
    }
}

