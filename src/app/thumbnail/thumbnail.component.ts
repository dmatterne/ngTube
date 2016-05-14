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
    
    title: boolean = true;
    
    @Output() clickThumbnail: EventEmitter<Video> = new EventEmitter();
    @Output() clickTitle: EventEmitter<Video> = new EventEmitter();
    
    hover: boolean = false;
    
    ngOnInit() {
    }
    
    onThumbnailClick() {
        this.clickThumbnail.emit(this.video);
    }
    
    onThumbnailEnter() {
        this.hover = true;
    }
    
    onThumbnailLeave() {
        this.hover = false;
    }
    
    onTitleClick() {
        this.clickTitle.emit(this.video);
    }
    
    onTitleMouseEnter () {
        
        this.title = false;
    }
    
    onTitleMouseLeave () {
        
        this.title = true;
    }
    
    constructor() {
        
    }
}