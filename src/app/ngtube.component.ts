import { Component, OnInit, OnDestroy, provide, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { NgTubeStore, mapToStorage, config, APP_CONFIG, Video } from './shared';
import { NavbarComponent } from './navbar';
import { NavbarFooterComponent } from './navbar-footer';
import { SidenavComponent } from './sidenav';
import { ThumbnailListComponent } from './thumbnail-list';
import { PlayerContainerComponent } from './player-container';
import { YoutubePlayerService } from './youtube-player.service';
import { YoutubeSearchService } from './youtube-search.service';
import { LocalStorageService } from './local-storage.service';
import { SizeState } from './reducers/minimize';

@Component({
  moduleId: module.id,
  selector: 'ngtube-app',
  templateUrl: 'ngtube.component.html',
  providers: [
      provide(APP_CONFIG, { useValue: config }),
      HTTP_PROVIDERS,
      YoutubeSearchService,
      LocalStorageService
  ],
  styleUrls: ['ngtube.component.css'],
  directives: [NavbarComponent, 
               SidenavComponent,
               NavbarFooterComponent,
               PlayerContainerComponent,
               ThumbnailListComponent
  ]
})
export class NgtubeAppComponent implements OnInit, OnDestroy {
    
    private subscriptions: any[] = [];
    cinemaMode: Observable<boolean>;
    minimize: Observable<boolean>;
    loading: Observable<boolean>;
    
    constructor(private store: Store<NgTubeStore>, 
                private localStorageService: LocalStorageService,
                private title: Title) {
        
        this.subscriptions.push(
            this.store.map((state: NgTubeStore) => mapToStorage(state)).subscribe((state) => {
                this.localStorageService.set('ngtube', state);
            }),
            
            this.store.select('currentVideo').subscribe((x: Video) => {
                const title = `Ngtube ${x ? `- ${x.title}` : ''}`
                this.title.setTitle(title); 
            })
        );
        
        this.cinemaMode = this.store.select('cinemaMode');
        this.loading = this.store.select('loading');
        this.minimize = this.store.select('minimize').map((x) => x === SizeState.MINIMIZE);
    }
    
    ngOnInit() {}
    
    ngOnDestroy() {
        
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}