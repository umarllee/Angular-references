import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
}) 
export class GridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cards = [
    {
      title: 'Document',
      desc: 'lorem ipsum',
      url: '../../../../assets/document.svg'
    },

    {
      title: 'Settings',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, repellendus.',
      url: '../../../../assets/settings.svg',
    },
    {
      title: 'Test',
      desc: 'test lorem ipsum',
      url: '',
    },
  ]

}
