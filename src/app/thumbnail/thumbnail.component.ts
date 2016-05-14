import { Component, Input, OnInit, HostListener, HostBinding, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'thumbnail',
  templateUrl: 'thumbnail.component.html',
  styleUrls: ['thumbnail.component.css']
})

export class ThumbnailComponent implements OnInit {
    @Input() id: string;
    @Input() title: string;
    @Input() url: string;
    
    @Output() clickThumbnail: EventEmitter<string> = new EventEmitter();
    @Output() clickTitle: EventEmitter<string> = new EventEmitter();
    
    label: string;
    hover: boolean = false;
    
    ngOnInit() {
        this.label = this.title;
    }
    
    onThumbnailClick() {
        this.clickThumbnail.emit(this.id);
    }
    
    onThumbnailEnter() {
        this.hover = true;
    }
    
    onThumbnailLeave() {
        this.hover = false;
    }
    
    onTitleClick() {
        this.clickTitle.emit(this.id);
    }
    onTitleMouseEnter() {
        this.label = 'Add to playlist';
    }
    
    onTitleMouseLeave() {
        this.label = this.title;
    }
    
    constructor() {
        
    }
}