import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NgtubeAppComponent } from '../app/ngtube.component';

beforeEachProviders(() => [NgtubeAppComponent]);

describe('App: Ngtube', () => {
  it('should create the app',
      inject([NgtubeAppComponent], (app: NgtubeAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ngtube works!\'',
      inject([NgtubeAppComponent], (app: NgtubeAppComponent) => {
    expect(app.title).toEqual('ngtube works!');
  }));
});
