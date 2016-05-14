import { Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

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
    isMaximized: boolean = false;

    constructor(private store: Store<NgTubeStore>, private youtubeSearchService: YoutubeSearchService) {
        this.subscriptions.push(

            this.store.select('search').subscribe((search: string) => {
                search = search || 'Angular 2';
                this.subscriptions.push(this.search(search));
            }),
            
            this.store.select('minimize').subscribe((minimize: SizeState) => {
                minimize = minimize || SizeState.MINIMIZE;
                this.isMaximized = minimize === SizeState.MAXIMIZE;
            })
        );
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
