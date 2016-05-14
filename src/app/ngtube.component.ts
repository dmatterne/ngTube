import { Component, OnInit, OnDestroy, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { NgTubeStore, mapToStorage, config, APP_CONFIG } from './shared';
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
    private isCinemaMode: boolean;
    
    constructor(private store: Store<NgTubeStore>, private localStorageService: LocalStorageService) {
        
        this.subscriptions.push(
            this.store.map((state: NgTubeStore) => mapToStorage(state)).subscribe((state) => {
                this.localStorageService.set('ngtube', state);
            }),
        
            this.store.select('minimize').subscribe((minimize: SizeState) => {
                minimize = minimize || SizeState.MINIMIZE;
                this.isCinemaMode = minimize === SizeState.MAXIMIZE;
            })
        );
    }
    
    ngOnInit() {
    }
    
    ngOnDestroy() {
        
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}