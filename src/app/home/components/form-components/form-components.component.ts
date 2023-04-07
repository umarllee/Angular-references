import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-components',
  templateUrl: './form-components.component.html',
  styleUrls: ['./form-components.component.scss']
})
export class FormComponentsComponent implements OnInit {

  constructor() { }

  value: any ;

  ngOnInit(): void {
  }

  clickInput(){
    alert()
  }

}
