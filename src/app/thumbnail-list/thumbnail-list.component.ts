import { Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/pluck';

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
    videos: Video[] = [];
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

            if ((hasVideo && minimize === SizeState.MINIMIZE) || (!hasVideo)) {
                return true;
            }
            
            return false;
        });
    }

    search (search: string, thumbnailQuality: string = 'medium') {
        
        this.youtubeSearchService.findIds(search).map((res) => res.json()).pluck('id', 'videoId').subscribe(
            (ids: string[]) => {
                if (ids.length === 0) {
                    return;
                }
                
                this.youtubeSearchService.findByIds(ids)
                            .map((res) => res.json())
                            .pluck('items')
                            .map((res: any) => {
                                return {
                                    id: res.id,
                                    title: res.snippet.title,
                                    thumbnailUrl: res.snippet.thumbnails[thumbnailQuality].url,
                                    duration: res.contentDetails.duration
                                }
                            })
                            .subscribe(
                    (response: any) => {
                        
                        this.videos = response;
                        
                    }
                )
            }
        )

        // this.youtubeSearchService.findAll(search).subscribe(
        //     (response: any) => {

        //         this.searchResults = [];
        //         const json = response.json();
        //         if (json && json.items) {
        //             this.searchResults = json.items.map((item) => new SearchResult(item));
        //         }
        //     }
        // );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    onClick(videoId: string) {

        this.store.dispatch({ type: 'PLAY_VIDEO', payload: { video: videoId } });
    }

}
