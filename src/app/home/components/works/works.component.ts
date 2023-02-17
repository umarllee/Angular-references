import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { ShipmentService } from "src/app/services/shipment.service";
import { errorAlert, infoAlert } from 'src/app/utils/alert';
import Swal from "sweetalert2";
import { debounceTime } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
declare var $: any;

interface FoodNode {
  name: string;
  submenus?: FoodNode[];
}

const TREE_DATA: any[] = [
  {
    id: 1,
    imagePath: "../../assets/icon/shipment.svg",
    orderBy: 1,
    parentId: 0,
    subMenus: [],
    title: "Loaded",
    url: "loaded"
  },
  {
    id: 9,
    imagePath: "../../assets/icon/settings.svg",
    orderBy: 5,
    parentId: 0,
    title: "Settings",
    url: null,
    subMenus: [
      {
        id: 4,
        imagePath: "../../assets/icon/settings.svg",
        orderBy: 6,
        parentId: 9,
        subMenus: null,
        title: "Adjustments",
        url: "settings"
      },

      {
        id: 7,
        imagePath: "../../assets/icon/settings.svg",
        orderBy: 7,
        parentId: 9,
        subMenus: null,
        title: "Users and Roles",
        url: "user-userRole"
      }
    ],

  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
//FOR TREE




interface Food {
  id: number;
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.subMenus && node.subMenus.length > 0,
      title: node.title,
      url: node.url,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.subMenus,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  fruits: string[] = ['AAA'];
  allFruits: string[] = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  displayedSelect: string[] = [
    'id',
    'value',
    'viewValue',
  ];
  isDisplayNone = true;
  routeFoodData: MatTableDataSource<Food> = new MatTableDataSource<any>([]);
  foods: Food[] = [
    { id: 1, value: 'steak-0', viewValue: 'Steak' },
    { id: 2, value: 'pizza-1', viewValue: 'Pizza' },
    { id: 3, value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor() {
    this.dataSource.data = TREE_DATA; // for tree


    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );  // display options when click chips
  }

  hasChild = (_: number, node: any) => node.expandable;

  ngOnInit(): void {

    this.routeFoodData = new MatTableDataSource<any>(this.foods)
    // console.log(this.fruits) // chipsde secdiyimiz datalari ozunde saxlayir 
  }

  // CHIPS FEATURE *****************************
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: any): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  //END CHIPS *******************************************


  highlight(event: any) {
    [...event.target.parentElement.parentElement.subMenus].forEach(e => {
      if (e !== event.target.parentElement) {
        e.style.backgroundColor = '';
      }
    });
    event.target.parentElement.style.backgroundColor = event.target.parentElement.style.backgroundColor === ''
      ? '#b3ebff' : '';
  }

  openFilter() {
    this.isDisplayNone = !this.isDisplayNone;
  }

  closeDropdown() {
    this.isDisplayNone = true;
  }


}
