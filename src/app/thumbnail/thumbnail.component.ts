import { Component, Input, OnInit, HostListener, HostBinding, EventEmitter, Output } from '@angular/core';
import { Video } from '../shared';
import { IsoToHMSPipe } from '../iso-to-hms.pipe';

@Component({
  moduleId: module.id,
  selector: 'thumbnail',
  templateUrl: 'thumbnail.component.html',
  styleUrls: ['thumbnail.component.css'],
  pipes: [IsoToHMSPipe]
})

export class ThumbnailComponent implements OnInit {
    
    @Input() video: Video;
    
    showTitle: boolean = true;
    hovering: any;
    
    @Output() clickThumbnail: EventEmitter<Video> = new EventEmitter();
    @Output() clickTitle: EventEmitter<Video> = new EventEmitter();
    
    hover: boolean = false;
    
    ngOnInit() {
    }
    
   
    onThumbnailClick () {
        
        this.clickThumbnail.emit(this.video);
    }
    
    addToPlaylist () {
        this.clickTitle.emit(this.video);
    }
    
    @HostListener('mouseenter') onMouseEnter () {
        
        if (this.hovering) {
            clearTimeout(this.hovering);
        }
        
        this.hover = true;
        this.showTitle = false;
    }
    
    @HostListener('mouseleave') onMouseLeave () {
        
        this.hovering = setTimeout(() => {
            this.showTitle = true;
            this.hover = false;
            this.hovering = null;
        }, 300);
    }
    
    constructor() {
        
    }
}