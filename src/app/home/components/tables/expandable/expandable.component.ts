import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HyperPopUpComponent } from './hyper-pop-up/hyper-pop-up.component';
import { ColumsComponent } from './colums/colums.component';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import * as FileSaver from 'file-saver';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: any[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    isClicked: false
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    isClicked: false,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    isClicked: false,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    isClicked: false,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    isClicked: false,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    isClicked: false,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    isClicked: false,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    isClicked: false,
  },
  {
    position: 9,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'OO',
    isClicked: false,
  },
  {
    position: 10,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'OOO',
    isClicked: false,
  },
  {
    position: 11,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    isClicked: false,
  }
]

// interface PeriodicElementNormal {
//   redirectName: string;
//   position: number;
//   hyperlink: string;
//   hyperlinkName: string;
//   symbol: string;
//   link: string;
//   redirect: string;
// }

const ELEMENT_DATANormal: any[] = [
  { position: 1, redirectName: 'Modules', hyperlink: '', hyperlinkName: 'Link 1', symbol: 'H', link: 'https://www.blobmaker.app/', redirect: '/home' },
  { position: 2, redirectName: 'Tables', hyperlink: '', hyperlinkName: 'Link 2', symbol: 'He', link: 'https://neumorphism.io/#e0e0e0', redirect: '/home/tables' },
  { position: 3, redirectName: 'Charts', hyperlink: '', hyperlinkName: 'Link 3', symbol: 'Li', link: 'https://blog.hubspot.com/website/css-animation-examples', redirect: '/home/chart' },
  { position: 4, redirectName: 'Beryllium 1', hyperlink: '', hyperlinkName: '', symbol: 'Be', link: 'https://animista.net/play/basic/shadow-drop', redirect: '' },
  { position: 5, redirectName: 'Beryllium 1', hyperlink: '', hyperlinkName: '', symbol: 'Be', link: 'https://animista.net/play/basic/shadow-drop', redirect: '' },
  { position: 6, redirectName: 'Beryllium 1', hyperlink: '', hyperlinkName: '', symbol: 'Be', link: 'https://animista.net/play/basic/shadow-drop', redirect: '' },
  { position: 7, redirectName: 'Beryllium 1', hyperlink: '', hyperlinkName: '', symbol: 'Be', link: 'https://animista.net/play/basic/shadow-drop', redirect: '' },
  { position: 8, redirectName: 'Beryllium 1', hyperlink: '', hyperlinkName: '', symbol: 'Be', link: 'https://animista.net/play/basic/shadow-drop', redirect: '' },
];

const ELEMENT_DATANormal2: any[] = [
  { position: 1, redirectName: 'Hydrogen 2', hyperlink: '', hyperlinkName: '', symbol: 'H', link: 'https://www.minimamente.com/project/magic/#google_vignette', redirect: '' },
  { position: 2, redirectName: 'Helium 2', hyperlink: '', hyperlinkName: '', symbol: 'He', link: 'http://dwarcher.github.io/reboundgen/examples/', redirect: '' },
  { position: 3, redirectName: 'Lithium 2', hyperlink: '', hyperlinkName: '', symbol: 'Li', link: '', redirect: '' },
  { position: 4, redirectName: 'Beryllium 2', hyperlink: '', hyperlinkName: '', symbol: 'Be', link: '', redirect: '' },
];



@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ExpandableComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  initialDataSource: MatTableDataSource<any> = new MatTableDataSource<any>(ELEMENT_DATA);
  columnsToDisplay = ['name', 'weight', 'symbol', 'position',];
  columnsToDisplayWithExpand: any[] = [];
  menuColumnsList: any[] = []; // menuda gostermek ucun
  modelColumns: any[] = [];
  modulModel: any[] = [];// localstorage yazib istifade etmek ucun

  initialColumnsToDisplayWithExpand: any[] = [];
  expandedElement!: PeriodicElement | null;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  filterForm!: FormGroup;
  orderRequestData: any = {
    filters: []
  }

  dataArray: any[] = [];
  totals: number = 0;
  totalsArray: any[] = [];

  expandedElements: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbol2', 'symbol3', 'symbol4', 'symbol5', 'symbol6', 'symbol7', 'symbol8'];
  dataSourceNormal: any;

  isFilter = false;
  isFiles = false;
  isFilesClick = false;

  dialogref?: MatDialogRef<HyperPopUpComponent>;
  dialogrefColums?: MatDialogRef<ColumsComponent>;

  pageEvent!: PageEvent;
  length?: number;
  lengthVender?: number;
  pageSize!: number;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  @ViewChild('commonPag') commonPaginator!: MatPaginator;

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA)
    // this.dataSource.paginator = this.commonPaginator;
    this.initialDataSource = new MatTableDataSource<any>(this.dataSource.data);

    let dtArr = ['expand', ...this.columnsToDisplay]

    dtArr.map((dt: any) => {
      this.initialColumnsToDisplayWithExpand.push({
        name: dt,
        isSelect: true
      })
    })

    if (!(localStorage.getItem('colums')?.split(','))?.length) {
      this.columnsToDisplayWithExpand = dtArr;
      this.menuColumnsList = this.initialColumnsToDisplayWithExpand;
    }
    else {
      this.columnsToDisplayWithExpand = (localStorage.getItem('colums')?.split(','))!;

      this.menuColumnsList = this.initialColumnsToDisplayWithExpand
      this.menuColumnsList.map((dt: any) => {
        let isSlct = false;
        this.columnsToDisplayWithExpand.map((clm: any) => {
          if (dt.name == clm) isSlct = true;
        })
        dt.isSelect = isSlct
      })
    }

    // this.menuColumnsList = JSON.parse(JSON.stringify(this.initialColumnsToDisplayWithExpand))
    // this.menuColumnsList.splice(this.menuColumnsList.indexOf('expand'), 1)

    const doc = new jsPDF();
    this.calculateTotals();
    this.generateForm();

    // this.filterTable();

  }

  generateForm() {
    let model: any = {};
    this.columnsToDisplayWithExpand.map((dt: any) => {
      model[dt] = '';
    })

    this.filterForm = this.fb.group(model)
  }

  // expandRow(element: any) {
  //   this.expandedElement = this.expandedElement === element ? null : element

  //   if (element.position == 1) {
  //     this.dataSourceNormal = ELEMENT_DATANormal;
  //   }

  //   else if (element.position == 2) {
  //     this.dataSourceNormal = ELEMENT_DATANormal2;
  //   }

  //   else {
  //     this.dataSourceNormal = '';
  //   }
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.commonPaginator;
  }

  openPopup(element: any) {
    this.dialogref = this.dialog.open(HyperPopUpComponent,
      {
        disableClose: true,
        hasBackdrop: true,
        width: '50%',
        height: 'auto',
        autoFocus: false,
        data: {
          id: element
        }

      });
  }

  openColumns() {
    this.dialogrefColums = this.dialog.open(ColumsComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: '30%',
      height: 'auto',
      autoFocus: false,
      data: {
        columns: this.columnsToDisplayWithExpand
      }
    })

    this.dialogrefColums.afterClosed().subscribe((dt: any) => {

      if ((localStorage.getItem('colums')?.split(','))?.length) {
        this.columnsToDisplayWithExpand = (localStorage.getItem('colums')?.split(','))!;
        this.columnsToDisplayWithExpand.sort();
        this.dataSource = this.dataSource;
        this.dataSource.paginator = this.commonPaginator;
        this.isFilter = true;
      }

      else {
        localStorage.setItem('colums', this.initialColumnsToDisplayWithExpand.toString());
        this.columnsToDisplayWithExpand = (localStorage.getItem('colums')?.split(','))!;
        this.columnsToDisplayWithExpand.sort();
        this.dataSource = this.dataSource;
        this.dataSource.paginator = this.commonPaginator;
      }

      this.generateForm();
      this.calculateTotals();

    })
  }

  removeFilter() {
    this.columnsToDisplayWithExpand = this.initialColumnsToDisplayWithExpand;
    this.isFilter = false;
  }

  Pdf() {

    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * fileWidth) / canvas.width;
      let heightLeft = imgHeight;
      heightLeft -= pageHeight;
      const FILEURI = canvas.toDataURL('image/png');

      let PDF = new jsPDF('p', 'mm', 'a4');
      var width = PDF.internal.pageSize.getWidth();
      var height = PDF.internal.pageSize.getHeight();
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, imgHeight, '', 'FAST');
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        PDF.addPage();
        PDF.addImage(canvas, 'PNG', 0, position, fileWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }
      PDF.save('test.pdf');
    });
  }

  downloadExcel(filename: string) {

    this.dataArray = JSON.parse(JSON.stringify(this.dataSource.data))
    let res = this.initialColumnsToDisplayWithExpand.filter(item => !this.columnsToDisplayWithExpand.includes(item));

    let uniqueArray = res.filter(function (item, pos) {
      return res.indexOf(item) == pos;
    })

    uniqueArray.map((dt: any) => {
      this.dataArray.forEach(function (v) { delete v[dt] });
    });

    const workSheet = XLSX.utils.json_to_sheet(this.dataArray);
    const workBook = XLSX.utils.book_new(); // book yaradir

    XLSX.utils.book_append_sheet(workBook, workSheet, 'datas')

    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: 'buffer' });
    XLSX.write(workBook, { bookType: "xlsx", type: 'binary' }); //binary string

    XLSX.writeFile(workBook, `${filename}.xlsx`); // download
  }

  displayFiles() {
    this.isFilesClick = true;
    this.isFiles = !this.isFiles;
  }

  handleFilter() {
    this.orderRequestData.filters = [];

    Object.keys(this.filterForm.controls).forEach((key: string) => {
      if (this.filterForm.get(key)?.value.length > 0) {
        this.orderRequestData.filters?.push({
          key: key,
          value: this.filterForm.get(key)?.value,
        })
      }
    });

    console.log(this.orderRequestData.filters)


    localStorage.setItem('filterData', JSON.stringify(this.orderRequestData.filters))

    this.filterTable();

  }

  filterTable() {
    let filters = JSON.parse(localStorage.getItem('filterData')!);
    let dataArr: any[] = [];
    filters.length ? filters = filters : filters = null;

    if (filters) {
      filters.forEach((element: any) => {
        dataArr = this.initialDataSource.data.filter((dt: any) => {
          if (dt[element.key].toString().toLowerCase().includes(element.value.toLowerCase())) return dt
        })
      });

      this.dataSource = new MatTableDataSource<any>(dataArr);
      this.dataSource.data = this.dataSource.data;
      this.dataSource.paginator = this.commonPaginator;

      this.calculateTotals();
    }

    else {
      this.dataSource = new MatTableDataSource<any>(this.initialDataSource.data);
      this.dataSource.data = this.dataSource.data;
      this.dataSource.paginator = this.commonPaginator;
    }
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.handleFilter();
    }
  }

  calculateTotals() {
    this.columnsToDisplayWithExpand.sort();
    this.columnsToDisplay.sort();
    this.totalsArray = [];

    for (let i = 1; i < this.columnsToDisplayWithExpand?.length; i++) {
      this.totals = 0;
      this.dataSource.data.map(t => {
        typeof (t[this.columnsToDisplayWithExpand[i]]) == 'string' ? this.totals += 0 : this.totals += Number(t[this.columnsToDisplayWithExpand[i]]);
      });

      this.totalsArray.push(this.totals.toFixed(2));
    }
  }

  toggleRow(row: any, indexRow: any) {

    if (indexRow == 0) {
      this.dataSource.data[0].dataSourceRow = ELEMENT_DATANormal;
    }

    else if (indexRow == 1) {
      this.dataSource.data[1].dataSourceRow = ELEMENT_DATANormal2;
    }

    else {
      this.dataSource.data[1].dataSourceRow = [];
    }

    const index = this.expandedElements.findIndex((x: any) => x.position == row.position);
    if (index === -1) {
      row.isClicked = true;
      this.expandedElements.push(row);
    } else {
      row.isClicked = false;

      this.expandedElements.splice(index, 1);
    }
  }

  sbmt(e: any) {
    //  console.log( this.dataSource)
    //  console.log(e.keyCode)


    //   if (e.keyCode === 13) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     this.dataSource.data = this.dataSource.data
    //   }
  }

  isExpanded(row: any): string {
    if (
      this.expandedElements.findIndex(x => x.position == row.position) !== -1
    ) {

      // row.isClicked = true;
      return 'expanded';
    }


    else {
      // row.isClicked = false;
      // console.log(row)
      return 'collapsed';
    }

  }





  //  EGER MAT MENUDAN SECECEKSE COLUMNLARI

  chooseColumn($event: any, name: string, status: boolean, index: any) {
    // this stops the menu from closing
    $event.stopPropagation();
    $event.preventDefault();

    if ($event.target && $event.target.tagName == 'BUTTON') {
      // $event.target.classList.toggle('selected');

      status == true ? this.menuColumnsList[index].isSelect = false : this.menuColumnsList[index].isSelect = true;

      this.menuColumnsList.map((dt: any) => {
        dt.isSelect ? this.modelColumns.push(dt.name) : (this.modelColumns.length ? this.modelColumns.splice(this.modelColumns.findIndex((dt: any) => dt == name), 1) : '')
      })

      
      let arr: any[] = [];

      this.menuColumnsList.map((dt: any) => {
        if (dt.isSelect == true) arr.push(dt.name)
      })

      localStorage.setItem('colums', arr.toString());

      if (!(localStorage.getItem('colums')?.split(','))?.length) this.columnsToDisplayWithExpand = this.initialColumnsToDisplayWithExpand;
      else this.columnsToDisplayWithExpand = (localStorage.getItem('colums')?.split(','))!;

    }

    // this.columnsToDisplayWithExpand.sort();
    this.generateForm();
    this.calculateTotals();

    // add additional selection logic here.

  }


}
