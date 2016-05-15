import { Component, Input, OnInit, HostListener,
         HostBinding, EventEmitter, Output,
         ChangeDetectionStrategy } from '@angular/core';
import { Video } from '../shared';
import { IsoToHMSPipe } from '../iso-to-hms.pipe';
import { NewlinesPipe } from '../newlines.pipe';
import { ReplaceUrlPipe } from '../replace-url.pipe';

@Component({
  moduleId: module.id,
  selector: 'thumbnail',
  templateUrl: 'thumbnail.component.html',
  styleUrls: ['thumbnail.component.css'],
  pipes: [IsoToHMSPipe, NewlinesPipe, ReplaceUrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ThumbnailComponent implements OnInit {
    
    @Input() video: Video;
    @Input() isInPlaylist: boolean = false;
    
    @Output() clickThumbnail: EventEmitter<Video> = new EventEmitter();
    @Output() clickTitle: EventEmitter<Video> = new EventEmitter();
    
    constructor() {}
    
    ngOnInit() {}
    
    onThumbnailClick () {
        
        this.clickThumbnail.emit(this.video);
    }
    
    addToPlaylist () {
        
        this.clickTitle.emit(this.video);
    }
    
}