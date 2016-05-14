export class SearchResult {
    
    videoId: string;
    videoTitle: string;
    channelTitle: string;
    description: string;
    uploadedDate: string;
    urlThumbnail: string;
    
    constructor(private item: any) {
        
        if (item) {
            
            this.videoId = item.id.videoId;
            let snippet: any = item.snippet;
            if (item.snippet) {
                this.videoTitle = snippet.title;
                this.channelTitle = snippet.channelTitle;
                this.description = snippet.description;
                this.uploadedDate = snippet.publishedAt;
                
                if (snippet.thumbnails && snippet.thumbnails.high) {
                    this.urlThumbnail = snippet.thumbnails.high.url;
                }
            }
        }
    }
    
}