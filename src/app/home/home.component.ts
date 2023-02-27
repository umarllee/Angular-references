import { animate, state, style, transition, trigger } from '@angular/animations';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
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
        animate('320ms', style({ transform: "translateY(0px) rotateY(180deg)" }))
      ]),
      transition('flipped => default', [
        animate('320ms', style({ transform: "translateY(0px)" }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  // private _transformer = (node: any, level: number) => {
  //   console.log(node)
  //   return {
  //     expandable: !!node.subMenus && node.subMenus.length > 0,
  //     moduleName: node.title,
  //     url: node.url,
  //     level: node.id,
  //   };
  // };

  // treeControl = new FlatTreeControl<any>(
  //   node => node.level,
  //   node => node.expandable,
  // );

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer,
  //   node => node.level,
  //   node => node.expandable,
  //   node => node,
  // );

  // open(title: string, url: string) {

  // }

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // hasChild = (_: number, node: any) => node.expandable;

  openSideModule(name: string) {

  }

  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  moduleDatas = [
    {
      name: 'Drop Down',
      desc: 'Drop down features',
      url: 'works',
      stateName: 'default',  // bu bele gelmese cardlari ayri-ayri flip-flop elemek alinmir
      navData: [{ navName: 'Drop', navOptionData: [{ data: 'optDrop1' }, { data: 'optDrop2' }, { data: 'optDrop3' },] }, { navName: 'Down', navOptionData: [{ data: 'optDown1' }, { data: 'optDown2' }, { data: 'optDown3' },] }],

    },
    {
      name: 'Table',
      desc: 'Table feautures',
      url: 'tables',
      stateName: 'default',
      navData: [{ navName: 'Galery', navOptionData: [{ data: 'optGalery1' }, { data: 'optGalery2' }, { data: 'optGalery3' },] }, { navName: 'Order', navOptionData: [{ data: 'optOrder1' }, { data: 'optOrder2' }, { data: 'optOrder3' },] }, { navName: 'Contact', navOptionData: [{ data: 'optContact1' }, { data: 'optContact2' }, { data: 'optContact3' },] }],

    },
    {
      name: 'Cards',
      desc: 'Card with increment number feautures',
      url: 'cards',
      stateName: 'default',
      // navData: [{ navName: 'Galery', navOptionData: [{ data: 'optGalery1' }, { data: 'optGalery2' }, { data: 'optGalery3' },] }, { navName: 'Order', navOptionData: [{ data: 'optOrder1' }, { data: 'optOrder2' }, { data: 'optOrder3' },] }, { navName: 'Contact', navOptionData: [{ data: 'optContact1' }, { data: 'optContact2' }, { data: 'optContact3' },] }],

    },

    {
      name: 'Gallery',
      desc: 'Multiple img with carousel',
      url: 'gallery',
      stateName: 'default',
      // navData: [{ navName: 'Galery', navOptionData: [{ data: 'optGalery1' }, { data: 'optGalery2' }, { data: 'optGalery3' },] }, { navName: 'Order', navOptionData: [{ data: 'optOrder1' }, { data: 'optOrder2' }, { data: 'optOrder3' },] }, { navName: 'Contact', navOptionData: [{ data: 'optContact1' }, { data: 'optContact2' }, { data: 'optContact3' },] }],

    },

    {
      name: 'Charts',
      desc: 'Chart feauture',
      url: 'chart',
      stateName: 'default',
      // navData: [{ navName: 'Galery', navOptionData: [{ data: 'optGalery1' }, { data: 'optGalery2' }, { data: 'optGalery3' },] }, { navName: 'Order', navOptionData: [{ data: 'optOrder1' }, { data: 'optOrder2' }, { data: 'optOrder3' },] }, { navName: 'Contact', navOptionData: [{ data: 'optContact1' }, { data: 'optContact2' }, { data: 'optContact3' },] }],

    },

    {
      name: 'Data share',
      desc: 'Data share feauture',
      url: 'dataShare',
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

  ngAfterViewInit() {
    // this.dataSource.data = [
    //   {
    //     id: 1,
    //     imagePath: "../../assets/icon/shipment.svg",
    //     orderBy: 1,
    //     parentId: 0,
    //     subMenus: [
    //       {
    //         id: 1,
    //         imagePath: "../../assets/icon/shipment.svg",
    //         orderBy: 1,
    //         parentId: 0,
    //         subMenus: [],
    //         title: "Loaded",
    //         url: "loaded"
    //       }
    //     ],
    //     title: "Loaded",
    //     url: "loaded"
    //   }
    // ]
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
    // this.router.navigate([`${element.url}`])
    localStorage.setItem('data', JSON.stringify(element))
  }

  openSidebar() {
    this.drawer.toggle();
  }

  goHome() {
    this.router.navigate([`home`])
  }


}
