import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Video, SearchResult, NgTubeStore } from '../shared';
import { ThumbnailComponent } from '../thumbnail';
import { YoutubeSearchService } from '../youtube-search.service';


@Component({
  moduleId: module.id,
  selector: 'thumbnail-list',
  templateUrl: 'thumbnail-list.component.html',
  styleUrls: ['thumbnail-list.component.css'],
  directives: [ThumbnailComponent]
})

export class ThumbnailListComponent {
  subscriptions: any[] = [];

  constructor(public store: Store<NgTubeStore>, public youtubeSearchService: YoutubeSearchService) {
    this.subscriptions.push(

      store.select('search').subscribe((search: string) => {
        this.youtubeSearchService.findAll(search).subscribe(
          (response) => {
            this.searchResults = [];
            let json = response.json();
            if (json && json.items) {
              json.items.forEach(item => {
                let searchResult = new SearchResult(item);
                this.searchResults.push(searchResult);
              });
            }
          }
        )
      })
      
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  
  public searchResults: SearchResult[];
}
