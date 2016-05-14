import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Control, ControlGroup } from '@angular/common';
import { YoutubeSearchService } from '../youtube-search.service';
import { NgTubeStore } from '../shared';


@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form: ControlGroup;
  search: Control = new Control('');  

  constructor (fb: FormBuilder, 
               private youtubeSearchService: YoutubeSearchService,
               store: Store<NgTubeStore>) {
      
    this.form = fb.group({
        search: this.search
    });
  }
  
  onSearch () {
      
      this.store.dispatch({ type: 'SEARCHED', payload: { search: this.search.value }});
  }
  
  resetSearch () {
      
      this.search.updateValue('');
      this.store.dispatch({ type: 'CLEARED_SEARCH' });
  }

  ngOnInit() {
  }

}
