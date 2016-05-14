import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { YoutubeSearchService } from './youtube-search.service';

describe('YoutubeSearch Service', () => {
  beforeEachProviders(() => [YoutubeSearchService]);

  it('should ...',
      inject([YoutubeSearchService], (service: YoutubeSearchService) => {
    expect(service).toBeTruthy();
  }));
});
