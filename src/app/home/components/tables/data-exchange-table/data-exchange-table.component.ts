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

  pageEvent!: PageEvent;
  length?: number;
  lengthVender?: number;
  pageSize!: number;
  pageSizeOptions: number[] = [10, 15, 20];
  @ViewChild('commonPag') commonPaginator!: MatPaginator;
  @ViewChild('commonPagSecond') commonPaginatorSecond!: MatPaginator;


  todo = [
    {id: 1, order: 'Order1', wagon: '1000', disabled: false},
    {id: 1, order: 'Order1', wagon: '1000', disabled: false},
  ];

  done = [
    {id: 1, order: 'Order1', wagon: '1000', disabled: false},
    {id: 1, order: 'Order1', wagon: '1000', disabled: false},
  ];

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
  }
  constructor() { }

  ngOnInit(): void {

    console.log(JSON.parse(localStorage.getItem('firstTable')!))
    console.log(JSON.parse(localStorage.getItem('secondTable')!))

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterSecond(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSecond.filter = filterValue.trim().toLowerCase();
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
