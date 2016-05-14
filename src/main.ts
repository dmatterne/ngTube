import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NgtubeAppComponent, environment, youtubePlayerProvider } from './app/';
import { provideStore } from '@ngrx/store';
import { history, minimize, play, playlist, repeat, search } from './app/reducers';

if (environment.production) {
  enableProdMode();
}

bootstrap(NgtubeAppComponent, [
  youtubePlayerProvider(),
  provideStore({history, minimize, play, playlist, repeat, research})
]);
