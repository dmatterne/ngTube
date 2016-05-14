import { Component, Input, OnInit, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'thumbnail',
  template: `
      <div>
        <h5>{{title}}</h5>
        <div [style.position]="relative">
            <img  
                [src]="url"
                [style.opacity]="hover ? 0.4 : 1"
                [style.position]="relative"
                [style.z-index]="0"
                class="responsive-img"
            />
                
            <i 
                [hidden]="!hover" 
                [style.z-index]="1"
                class="material-icons medium icon-demo">
                play_arrow
            </i>
        </div>
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
    
    @HostListener('mouseClick') onMouseClick() {
        // TODO
    }
}