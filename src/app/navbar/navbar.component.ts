import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Control, ControlGroup } from '@angular/common';
import { YoutubeSearchService } from '../youtube-search.service';


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
               private youtubeSearchService: YoutubeSearchService) {
      
    this.form = fb.group({
        search: this.search
    });
  }
  
  onSearch () {
      
      this.youtubeSearchService.findAll(this.search.value).subscribe(
          (response) => {
              console.log(response.json());
          }
      )
  }
  
  resetSearch () {
      
      this.search.updateValue('');
  }

  ngOnInit() {
  }

}
