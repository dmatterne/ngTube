import { Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchResult, Video, NgTubeStore } from '../shared';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/pluck';

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

export class ThumbnailListComponent implements OnDestroy {

    subscriptions: any[] = [];
    videos: Video[] = [];
    current: Video;
    show: Observable<boolean>;
    loading: Observable<boolean>;

    constructor(private store: Store<NgTubeStore>, private youtubeSearchService: YoutubeSearchService) {
        this.subscriptions.push(

            this.store.select('search').subscribe((search: string) => {
                search = search || 'Angular 2';
                this.subscriptions.push(this.search(search));
            }),
            this.store.select('currentVideo').subscribe((video: Video) => {
                this.current = video;
            })
            
        );
        
        this.loading = this.store.select('loading');
        
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
        
        this.store.dispatch({ type: 'SET_LOADING', payload: { value: true } });
        this.youtubeSearchService.findIds(search).map((res) => res.json())
                    .pluck('items').subscribe(
                
            (items: any) => {
                const ids = items.map((x: any) => x.id.videoId);
                if (ids.length === 0) {
                    this.videos = [];
                    this.store.dispatch({ type: 'SET_LOADING', payload: { value: false } });
                    return;
                }
                
                this.youtubeSearchService.findByIds(ids)
                            .map((res) => res.json())
                            .pluck('items')
                            .finally(() => {
                                this.store.dispatch({ type: 'SET_LOADING', payload: { value: false } });
                            })
                            .subscribe(
                    (items: any) => {
                        this.videos = items.map((x) => {
                                return {
                                    id: x.id,
                                    title: x.snippet.title,
                                    thumbnailUrl: x.snippet.thumbnails[thumbnailQuality].url,
                                    duration: x.contentDetails.duration
                                }
                        });
                    }
                )
            }
        )
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    onThumbnailClick (video: Video) {
        
        this.store.dispatch({ type: 'ADD_HISTORY', payload: { video: video } });
        this.store.dispatch({ type: 'PLAY_VIDEO', payload: { video: video } });
        this.store.dispatch({ type: 'MAXIMIZE' });
    }
    
    addToPlaylist (video: Video) {
        this.store.dispatch({ type: 'ADD_TO_PLAYLIST', payload: { video: video } });
    }
}
