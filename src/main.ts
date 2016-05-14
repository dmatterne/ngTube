import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NgtubeAppComponent, environment, youtubePlayerProvider } from './app/';
import { provideStore } from '@ngrx/store';
import { reducers } from './app/reducers';

if (environment.production) {
  enableProdMode();
}

let initialStore;
if (localStorage.getItem('ngtube')) {
  initialStore = JSON.parse(localStorage.getItem('ngtube'));
}

bootstrap(NgtubeAppComponent, [
  youtubePlayerProvider(),
  provideStore(reducers, initialStore)
]);
