import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NgtubeAppComponent, environment, youtubePlayerProvider } from './app/';
import { provideStore } from '@ngrx/store';

if (environment.production) {
  enableProdMode();
}

bootstrap(NgtubeAppComponent, [
  youtubePlayerProvider(),
  provideStore({}, {})
]);
