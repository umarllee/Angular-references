import { Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-navbarPanel',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navBarDatas: any[] = [];
  navOptions: any[] = [];
  data: any;
  isDisplay = true;
   @ViewChildren("select") select!: QueryList<MatSelect>;
  constructor() { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('data')!);
    this.navBarDatas = this.data.navData;
  }

  openMenu(optionIndex: number) {    
    this.navOptions = this.data.navData[optionIndex].navOptionData;
    this.select.toArray()[optionIndex].open();
  }

  closeMenu(optionIndex: number) {
    this.select.toArray()[optionIndex].close();
  }

}
