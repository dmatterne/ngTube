import { Directive, ElementRef,
         Input, Output, EventEmitter, 
         OnInit, OnDestroy } from '@angular/core';
         
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Directive({
    selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {

    @Input() infiniteScrollDistance: number = 100;
    @Input() infiniteScrollThrottle: number = 0;
    
    private enabled: boolean = true;
    
    @Input() set infiniteScrollEnabled (value: boolean) {
        
        this.enabled = value;
        if (this.scrollSubscription && !value) {
            this.unsubscribe();
        }
        else if (!this.scrollSubscription && this.scrollEvent && value) {
            this.subscribe();
        }
    }
    
    get infiniteScrollEnabled (): boolean {
        
        return this.enabled;
    }
    
    @Output() next = new EventEmitter<any>();

    private scrollEvent: Observable<any>;
    private scrollSubscription: any;
    private container: any;
    private windowElement: any;

    constructor (private element: ElementRef) {
        
        this.container = window;
        this.windowElement = window;
    }
    
    ngOnInit () {
        
        this.scrollEvent = Observable.fromEvent(this.container, 'scroll')
            .debounceTime(this.infiniteScrollDistance)
            .distinctUntilChanged();
            
        this.subscribe();
    }
    
    ngOnDestroy () {
        
        this.unsubscribe();
    }
    
    private unsubscribe () {
        
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
            this.scrollSubscription = null;
        }
    }
    
    private subscribe() {
        
        this.scrollSubscription = this.scrollEvent.subscribe(() => {
            this.scroll(); 
        });
    }
    
    private scroll () {
        
        if (!this.infiniteScrollEnabled) {
            return;
        }
        
        const containerBottom = this.height(this.container) + this.pageYOffset(this.container.document.documentElement);
        const elementBottom = this.offsetTop(this.element.nativeElement) + this.height(this.element.nativeElement);
        const remaining = elementBottom - containerBottom;
        if (remaining <= this.infiniteScrollDistance) {
            this.onScroll();
        }
    }

    private onScroll () {
        
        this.next.emit({});
    }
    
    private height (elem: any) {
        
        if (isNaN(elem.offsetHeight)) {
            return elem.document.documentElement.clientHeight;
        }
        else {
            return elem.offsetHeight;
        }
    }
    
    private offsetTop (elem) {
        
        if (!elem.getBoundingClientRect) {
            return;
        }
        
        return elem.getBoundingClientRect().top + this.pageYOffset(elem);
    }
    
    private pageYOffset (elem) {
        
        if (isNaN(window.pageYOffset)) {
            return elem.document.documentElement.scrollTop;
        }
        
        return elem.ownerDocument.defaultView.pageYOffset;
    }
}
