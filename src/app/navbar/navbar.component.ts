import { Component, OnInit } from '@angular/core';
import { FormBuilder, Control, ControlGroup } from '@angular/common';


@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form: ControlGroup;
  search: Control = new Control('');  

  constructor (fb: FormBuilder) {
      
    this.form = fb.group({
        search: this.search
    });
  }
  
  onSearch () {
      
      console.log(this.search.value);
  }

  ngOnInit() {
  }

}
