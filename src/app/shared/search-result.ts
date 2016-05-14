export class SearchResult {
    
    public get videoId() {
        return this._videoId;
    }
    
    public get videoTitle() {
        return this._videoTitle;
    }
    
    public get channelTitle() {
        return this._channelTitle;
    }
    
    public get description() {
        return this._description;
    }
    
    public get uploadedDate() {
        return this._uploadedDate;
    }
    
    public get urlThumbnail() {
        return this._urlThumbnail;
    }
    
    constructor(private jsonResult: any) {
        if (jsonResult) {
            if (jsonResult.id)
                this._videoId = jsonResult.id.videoId;
            
            let snippet: any = jsonResult.snippet;
            if(jsonResult.snippet) {
                this._videoTitle = snippet.title;
                this._channelTitle = snippet.channelTitle;
                this._description = snippet.description;
                this._uploadedDate = snippet.publishedAt;
                
                if (snippet.thumbnails && snippet.thumbnails.default)
                    this._urlThumbnail = snippet.thumbnails.default.url;
            }
        }
    }
    
    private _videoId: string;
    private _videoTitle: string;
    private _channelTitle: string;
    private _description: string;
    private _uploadedDate: string;
    private _urlThumbnail: string;
}