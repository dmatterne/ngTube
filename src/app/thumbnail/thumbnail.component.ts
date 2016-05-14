import { Component, Input, OnInit, HostListener, HostBinding } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'thumbnail',
  templateUrl: 'thumbnail.component.html',
  styleUrls: ['thumbnail.component.css']
})

export class ThumbnailComponent {
    @Input() title: string;
    @Input() url: string;

    hover: boolean = false;
    
    @HostListener('mouseenter') onMouseEnter() {
        this.hover = true;
    }
    
    @HostListener('mouseleave') onMouseLeave() {
        this.hover = false;
    }
    
    constructor(private store: Store<NgTubeStore>) {
        
    }
}