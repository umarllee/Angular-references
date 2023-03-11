import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-exchange-table',
  templateUrl: './data-exchange-table.component.html',
  styleUrls: ['./data-exchange-table.component.scss']
})
export class DataExchangeTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbol2', 'symbol3', 'symbol4', 'symbol5', 'symbol6'];
  displayedColumnsSecond: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>([]);
  dataSourceSecond = new MatTableDataSource<any>([]);

  filterValue: any;
  filterValueSecond: any;

  pageEvent!: PageEvent;
  length?: number;
  lengthVender?: number;
  pageSize!: number;
  pageSizeOptions: number[] = [10, 15, 20];
  @ViewChild('commonPag') commonPaginator!: MatPaginator;
  @ViewChild('commonPagSecond') commonPaginatorSecond!: MatPaginator;


  todo = [
    { id: 1, order: '2302-0001', wagon: '737373', overhead: '1212', disabled: false },
    { id: 1, order: '2302-0001', wagon: '929292', overhead: '2323', disabled: false },
  ];

  initialTodo: any[] = [];

  done = [
    { id: 1, order: '2302-0002', wagon: '202020', overhead: '8888', disabled: false },
    { id: 1, order: '2302-0002', wagon: '121212', overhead: '4343', disabled: false },
    { id: 1, order: '2302-0002', wagon: '343434', overhead: '9999', disabled: false },
    { id: 1, order: '2302-0002', wagon: '545454', overhead: '6565', disabled: false },
  ];

  initialDone: any[] = [];

  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.initialDone = this.done;
    this.initialTodo = this.todo;
  }

  constructor() { }

  ngOnInit(): void {

    this.initialTodo = this.todo;
    this.initialDone = this.done;

    if (!JSON.parse(localStorage.getItem('firstTable')!)) {

      this.dataSource.data = [
        { position: true, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: true, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: false, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: false, name: 'Boron', weight: 10.811, symbol: 'B' },
        { position: false, name: 'Boron2', weight: 10.811, symbol: 'B2' },
        { position: false, name: 'Carbon', weight: 12.0107, symbol: 'C' },
        { position: false, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
        { position: false, name: 'Nitrogen2', weight: 14.0067, symbol: 'N2' },
        { position: false, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
        { position: true, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
        { position: false, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
        { position: false, name: 'Lithium2', weight: 6.941, symbol: 'Li2' },
      ]
    }

    else {

      this.dataSource.data = JSON.parse(localStorage.getItem('firstTable')!)
    }

    if (!JSON.parse(localStorage.getItem('secondTable')!)) {
      this.dataSourceSecond.data = []
    }

    else {
      this.dataSourceSecond.data = JSON.parse(localStorage.getItem('secondTable')!)
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.commonPaginator;
    this.dataSourceSecond.paginator = this.commonPaginatorSecond;
  }

  applyFilter(event: any) {
    if (event.keyCode === 13) {
      let array = this.initialTodo.filter((o: any) => Object.keys(o).some((k: any) => o[k].toString().toLowerCase().includes(this.filterValue.toLowerCase())))
      this.todo = array;
    }
  }

  applyFilterSecond(event: any) {
    if (event.keyCode === 13) {
      let array = this.initialDone.filter((o: any) => Object.keys(o).some((k: any) => o[k].toString().toLowerCase().includes(this.filterValueSecond.toLowerCase())))
      this.done = array;
    }
  }


  moveToRight(i: any, element: any) {
    this.dataSource.data.splice(i, 1)

    this.dataSourceSecond.data.push(element)
    this.dataSource.data = this.dataSource.data
    this.dataSourceSecond.data = this.dataSourceSecond.data

    localStorage.setItem('firstTable', JSON.stringify(this.dataSource.data));
    localStorage.setItem('secondTable', JSON.stringify(this.dataSourceSecond.data));

  }

  moveToLeft(i: any, element: any) {
    this.dataSourceSecond.data.splice(i, 1)

    this.dataSource.data.push(element)
    this.dataSource.data = this.dataSource.data
    this.dataSourceSecond.data = this.dataSourceSecond.data
    localStorage.setItem('firstTable', JSON.stringify(this.dataSource.data));
    localStorage.setItem('secondTable', JSON.stringify(this.dataSourceSecond.data));

  }

}
