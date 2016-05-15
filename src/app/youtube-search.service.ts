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
    maxResults?: string;
}

@Injectable()
export class YoutubeSearchService {

  constructor (@Inject(APP_CONFIG) private config: AppConfiguration, private http: Http) {}

  findIds (query: string, options: YoutubeSearchOptions = {}) {
      
      const search = new URLSearchParams();
      search.append('part', 'id');
      
      this.setOptions(search, query, options);
      
      if (typeof options.videoOnly === 'undefined') {
          options.videoOnly = true;
      }
      
      if (options.videoOnly) {
          search.append('fields', 'nextPageToken,items(id/videoId)');
      }
      else {
          search.append('fields', 'nextPageToken,items(id)');
      }
      
      const url = `${this.config.apiEndpoint}/search`;
      
      return this.http.get(url, { search });
  }
  
  findByIds (ids: string[]) {
      
      const search = new URLSearchParams();
      search.append('id', ids.join(','));
      search.append('part', 'contentDetails,snippet');
      search.append('key', this.config.apiKey);
      search.append('fields', 'items(id,snippet/title,snippet/description,snippet/thumbnails,contentDetails/duration)');
      
      const url = `${this.config.apiEndpoint}/videos`;
      return this.http.get(url, { search });
  }
  
  private setOptions (search: URLSearchParams, query: string, options: YoutubeSearchOptions) {
      
      search.append('key', this.config.apiKey);
      
      search.append('q', query);
      options.maxResults = options.maxResults || '25';
      search.append('maxResults', options.maxResults);
      
      if (options.duration) {
          search.append('videoDuration', this.getDuration(options.duration));
      }
      
      if (options.pageToken) {
        search.append('pageToken', options.pageToken);
      }
  }
  
  findAll (query: string, options: YoutubeSearchOptions = {}) {
      
      const search = new URLSearchParams();
      this.setOptions(search, query, options);
      search.append('part', 'snippet');
      
      options.videoOnly = typeof options.videoOnly === 'undefined' || true;
      if (options.videoOnly) {
        search.append('type', 'video');
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
