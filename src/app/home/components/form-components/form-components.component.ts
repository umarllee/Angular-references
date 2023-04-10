import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-components',
  templateUrl: './form-components.component.html',
  styleUrls: ['./form-components.component.scss']
})
export class FormComponentsComponent implements OnInit {

  constructor() { }

  value: any ;
  checkLineValue: any ;
  dateData = new Date("2022-03-25");
  dateVal  =new Date();

  val = 'datalar';

  ngOnInit(): void {
    console.log(this.dateVal)
    console.log(this.dateData)
  }


}
