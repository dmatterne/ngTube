import { Component, Input, OnInit, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'thumbnail',
  template: `
      <div>
        <h5>{{title}}</h5>
        <img 
            [src]="url"
            class="responsive-img"
        >
        </img>
      </div>
    `,
   styles: ['.hover { opacity: 0:4 }']
})
export class ThumbnailComponent {
    @Input() title: string;
    @Input() url: string;

    @HostBinding('class.hover')
    hover: boolean = false;
    
    @HostListener('mouseenter') onMouseEnter() {
        this.hover = true;
    }
    
    @HostListener('mouseleave') onMouseLeave() {
        this.hover = false;
    }
}