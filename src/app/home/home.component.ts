import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)',
        
      })), 
      transition('default => flipped', [
        animate('320ms', style({transform: "translateY(0px) rotateY(180deg)" }))
      ]),
      transition('flipped => default', [
        animate('320ms', style({transform: "translateY(0px)" }))
      ])
    ]) 
  ]
})
export class HomeComponent implements OnInit {

  moduleDatas = [
    {
      name: 'Drop Down',
      desc: 'Drop down features',
      url: 'home/works',
      stateName: 'default',  // bu bele gelmese cardlari ayri-ayri flip-flop elemek alinmir
      navData: [{ navName: 'Drop', navOptionData: [{ data: 'optDrop1' }, { data: 'optDrop2' }, { data: 'optDrop3' },] }, { navName: 'Down', navOptionData: [{ data: 'optDown1' }, { data: 'optDown2' }, { data: 'optDown3' },]  }],

    },
    { 
      name: 'Table',
      desc: 'Table feautures',
      url: 'home/tables',
      stateName: 'default',
      navData: [{ navName: 'Galery', navOptionData: [{ data: 'optGalery1' }, { data: 'optGalery2' }, { data: 'optGalery3' },] }, { navName: 'Order', navOptionData: [{ data: 'optOrder1' }, { data: 'optOrder2' }, { data: 'optOrder3' },] }, { navName: 'Contact', navOptionData: [{ data: 'optContact1' }, { data: 'optContact2' }, { data: 'optContact3' },] }],

    },
    {
      name: 'Cards',
      desc: 'Card with increment number feautures',
      url: 'home/cards',
      stateName: 'default',
      // navData: [{ navName: 'Galery', navOptionData: [{ data: 'optGalery1' }, { data: 'optGalery2' }, { data: 'optGalery3' },] }, { navName: 'Order', navOptionData: [{ data: 'optOrder1' }, { data: 'optOrder2' }, { data: 'optOrder3' },] }, { navName: 'Contact', navOptionData: [{ data: 'optContact1' }, { data: 'optContact2' }, { data: 'optContact3' },] }],

    },

    {
      name: 'Gallery',
      desc: 'Multiple img with carousel',
      url: 'home/gallery',
      stateName: 'default',
      // navData: [{ navName: 'Galery', navOptionData: [{ data: 'optGalery1' }, { data: 'optGalery2' }, { data: 'optGalery3' },] }, { navName: 'Order', navOptionData: [{ data: 'optOrder1' }, { data: 'optOrder2' }, { data: 'optOrder3' },] }, { navName: 'Contact', navOptionData: [{ data: 'optContact1' }, { data: 'optContact2' }, { data: 'optContact3' },] }],

    },

    { 
      name: 'Charts',
      desc: 'Chart feauture',
      url: 'home/chart',
      stateName: 'default',
      // navData: [{ navName: 'Galery', navOptionData: [{ data: 'optGalery1' }, { data: 'optGalery2' }, { data: 'optGalery3' },] }, { navName: 'Order', navOptionData: [{ data: 'optOrder1' }, { data: 'optOrder2' }, { data: 'optOrder3' },] }, { navName: 'Contact', navOptionData: [{ data: 'optContact1' }, { data: 'optContact2' }, { data: 'optContact3' },] }],

    },

    { 
      name: 'Data share',
      desc: 'Data share feauture',
      url: 'home/dataShare',
      stateName: 'default',
      // navData: [{ navName: 'Galery', navOptionData: [{ data: 'optGalery1' }, { data: 'optGalery2' }, { data: 'optGalery3' },] }, { navName: 'Order', navOptionData: [{ data: 'optOrder1' }, { data: 'optOrder2' }, { data: 'optOrder3' },] }, { navName: 'Contact', navOptionData: [{ data: 'optContact1' }, { data: 'optContact2' }, { data: 'optContact3' },] }],

    },
    
  ]


  secondState: string = "default"
  thridState: string = "default" 
  forthdState: string = "default"
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  cardClicked(id: number) {
    if (this.moduleDatas[id].stateName === "default") {
      this.moduleDatas[id].stateName = "flipped";
    }
    else {
      this.moduleDatas[id].stateName = "default";
    }
  } 

  openModule(element: any) {
    this.router.navigate([`${element.url}`])
    localStorage.setItem('data', JSON.stringify(element))
  }

 
}
