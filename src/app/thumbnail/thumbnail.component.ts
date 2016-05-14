import { Component, Input, OnInit, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'thumbnail',
  template: `
      <div>
        <h5>{{title}}</h5>
        <img 
            [src]="url"
            [style.opacity]="hover ? 0.4 : 1"
            class="responsive-img"
        />
      </div>
    `
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
}