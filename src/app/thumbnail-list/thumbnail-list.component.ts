import { Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchResult, Video, NgTubeStore } from '../shared';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';

import { ThumbnailComponent } from '../thumbnail';
import { YoutubeSearchService } from '../youtube-search.service';
import { PlayState } from '../reducers/play';
import { SizeState } from '../reducers/minimize';

import { InfiniteScrollDirective } from '../infinite-scroll.directive';


@Component({
    moduleId: module.id,
    selector: 'thumbnail-list',
    templateUrl: 'thumbnail-list.component.html',
    styleUrls: ['thumbnail-list.component.css'],
    directives: [ThumbnailComponent, InfiniteScrollDirective]
})



export class ThumbnailListComponent implements OnDestroy {

    subscriptions: any[] = [];
    videos: Video[] = [];
    current: Video;
    show: Observable<boolean>;
    loading: Observable<boolean>;
    nextPageToken: string;
    searchField: string;
    searchChange: boolean = false;
   
    constructor(private store: Store<NgTubeStore>, private youtubeSearchService: YoutubeSearchService) {
        this.subscriptions.push(

            this.store.select('search').subscribe((search: string) => {
                this.searchField = search || 'Angular 2';
                this.searchChange = true;
                this.nextPageToken = null;
                this.search();
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
    
    nextPage () {
        
        if (this.nextPageToken) {
            this.searchChange = false;
            this.search(this.nextPageToken);
        }
    }


    search (pageToken?: string, thumbnailQuality: string = 'medium') {
        
        this.store.dispatch({ type: 'SET_LOADING', payload: { value: true } });
        this.youtubeSearchService.findIds(this.searchField, { pageToken: pageToken })
                    .map((res) => res.json())
                    .do((res) => {
                        if (res.nextPageToken) {
                            this.nextPageToken = res.nextPageToken;
                        }
                        else {
                            this.nextPageToken = null;
                        }
                        
                        return res;
                    })
                    .pluck('items')
                    .subscribe(
                
            (items: any) => {
                const ids = items.map((x: any) => x.id.videoId);
                if (ids.length === 0) {
                    this.setVideos();
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
                        
                        this.setVideos(
                            items.map((x) => {
                                    return {
                                        id: x.id,
                                        title: x.snippet.title,
                                        thumbnailUrl: x.snippet.thumbnails[thumbnailQuality].url,
                                        duration: x.contentDetails.duration
                                    }
                            })
                        );
                    }
                )
            }
        )
    }
    
    private setVideos (videos: Video[] = []) {
        
        if (this.searchChange) {
            this.videos = videos;
        }
        else {
            this.videos = [...this.videos, ...videos];
        }
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
