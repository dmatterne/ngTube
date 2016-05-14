import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { APP_CONFIG, config, AppConfiguration } from './shared';

export enum YoutubeVideoDuration {
    ANY,
    SHORT,
    MEDIUM,
    LONG
}

export interface YoutubeSearchOptions {
    pageToken?: string;
    videoOnly?: boolean;
    duration?: YoutubeVideoDuration | string;
}

@Injectable()
export class YoutubeSearchService {

  constructor (@Inject(APP_CONFIG) private config: AppConfiguration, private http: Http) {}

  
  findAll (query: string, options: YoutubeSearchOptions = {}) {
      
      const search = new URLSearchParams();
      search.append('part', 'snippet');
      search.append('key', this.config.apiKey);
      search.append('type', options.videoOnly ? 'true' : 'false');
      search.append('q', query);
      
      if (options.duration) {
          search.append('videoDuration', this.getDuration(options.duration));
      }
      
      if (options.pageToken) {
        search.append('pageToken', options.pageToken);
      }
      
      const url = `${this.config.apiEndpoint}/search`;
      
      return this.http.get(url, { search });
  }
  
  private getDuration (duration: YoutubeVideoDuration | string) {
      
      if (typeof duration === 'string') {
          return duration;
      }
      
      switch (duration) {
          
        case YoutubeVideoDuration.ANY: 
            return 'any';
        case YoutubeVideoDuration.SHORT:
            return 'short';
        case YoutubeVideoDuration.MEDIUM:
            return 'medium';
        case YoutubeVideoDuration.LONG:
            return 'long';
      }
  }

}
