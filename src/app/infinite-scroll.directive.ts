import { Directive, ElementRef,
         Input, Output, EventEmitter, 
         OnInit, OnDestroy } from '@angular/core';
         
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[infinite-scroll]'
})
export class InfiniteScroll {

    constructor() {
    
    }

}
