import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'navbar-footer',
  templateUrl: 'navbar-footer.component.html',
  styleUrls: ['navbar-footer.component.css']
})
export class NavbarFooterComponent implements OnInit {

    constructor () {}
    
    public get playing() {
      return this._isPlaying;
    }

    ngOnInit () {
    }
  
    onPrevious () {
        
    }
    
    onNext () {
        
    }
  
    onPlay () {
      this._isPlaying = true;
    }
    
    onPause() {
      this._isPlaying = false;
    }
    
    onVolume () {
        
    }
    
    onRepeat () {
        
    }
  
  private _isPlaying: boolean = false;

}
