import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
}) 
export class GridComponent implements OnInit {

  isFlip = false;
  indexCard = -1;
  constructor() { }

  ngOnInit(): void {
  }

  cards = [
    {
      title: 'Document',
      desc: 'lorem ipsum',
      url: '../../../../assets/document.svg',
      color: '#85e67f',
    },

    {
      title: 'Settings',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, repellendus.',
      url: '../../../../assets/settings.svg',
      color: '#ff6b35',
    },
    {
      title: 'Transfer',
      desc: 'transfer lorem ipsum',
      url: '../../../../assets/transfer.svg',
      color: '#b5179e',
    },

    {
      title: 'Information',
      desc: 'Information lorem ipsum',
      url: '../../../../assets/info.svg',
      color: '#ffaa00',
    },
  ]

  flipCard(index: number){
    this.isFlip = !this.isFlip;
    this.indexCard = index;
  }

}
