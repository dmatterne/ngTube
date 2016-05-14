import { Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combinelatest';

import { Video, SearchResult, NgTubeStore } from '../shared';
import { ThumbnailComponent } from '../thumbnail';
import { YoutubeSearchService } from '../youtube-search.service';
import { PlayState } from '../reducers/play';
import { SizeState } from '../reducers/minimize';


@Component({
    moduleId: module.id,
    selector: 'thumbnail-list',
    templateUrl: 'thumbnail-list.component.html',
    styleUrls: ['thumbnail-list.component.css'],
    directives: [ThumbnailComponent]
})

export class ThumbnailListComponent {


    subscriptions: any[] = [];
    searchResults: SearchResult[] = [];
    show: Observable<boolean>;

    constructor(private store: Store<NgTubeStore>, private youtubeSearchService: YoutubeSearchService) {
        this.subscriptions.push(

            this.store.select('search').subscribe((search: string) => {
                search = search || 'Angular 2';
                this.subscriptions.push(this.search(search));
            })
            
        );
        
        
        
        this.show = Observable.combineLatest(this.store.select('minimize'),
                                             this.store.select('currentVideo'), 
                                             (minimize, currentVideo) => {
            
            const hasVideo = currentVideo !== null;
            
            if ((hasVideo && minimize) || (!hasVideo)) {
                return true;
            }
            
            return false;
        });
    }

    search(search: string) {

        this.youtubeSearchService.findAll(search).subscribe(
            (response: any) => {

                this.searchResults = [];
                const json = response.json();
                if (json && json.items) {
                    this.searchResults = json.items.map((item) => new SearchResult(item));
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    onClick(videoId: string) {

        this.store.dispatch({ type: 'PLAY_VIDEO', payload: { video: videoId } });
    }

}
