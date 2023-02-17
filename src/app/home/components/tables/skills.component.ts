import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { ShipmentService } from "src/app/services/shipment.service";
import { errorAlert, infoAlert } from 'src/app/utils/alert';
import Swal from "sweetalert2";
import { debounceTime } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import * as XLSX from "xlsx"

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  selectedValue: string = '';
  receiptFileExcel: MatTableDataSource<any> = new MatTableDataSource<any>([]);


  @ViewChild('OHPag') OHPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  excelData: any;
  routeData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  routeCurrentData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild('commonPag') commonPaginator!: MatPaginator;
  @ViewChild('excelPag') excelPaginator!: MatPaginator;
  dragDisabled = true;
  currentRouteColumns: any[] = [];
  forwardTotals: number[] = [];
  sumForwardTotals = 0;
  backwardTotals: number[] = [];
  sumBackwardTotals = 0;
  forwardTotal: number = 0;
  backwardTotal: number = 0;
  fileName?= '';
  excelFileName?= '';
  file?: File;
  excelFile?: File;
  firstLocationY!: number;
  secondLocationY!: number;
  firstLocationContent!: string;

  isLineFormValid = true;
  readonly requiredText = 'Required text!';


  displayedreceiptColumns: string[] = [
    "qaimeNo",
    "vaqonNo",
    "contPrefix",
    "containerNo",
    "fileName",
    "operation",
  ];


  displayedcommontColumns: string[] = [
    'TrackingNo',
    'Status',
    'Countries',
    'LoadStationName',
    'DestStationName',
    'ContCount',
    'Date',
    'Eta',
    'RouteId'
  ];

  displayedColumns: string[] = [];
  //   'AZ',
  //   'AZKH',
  //   'COUNTRY',
  //   'Direction',
  //   'GE',
  //   'GEAZ',
  //   'KG',
  //   'KH',
  //   'KHTM',
  //   'RouteId',
  //   'TM',
  //   'TMUZ',
  //   'TR',
  //   'TRGE',
  //   'TrackingNo',
  //   'UZ',
  //   'UZKG'
  // ]

  constructor(private fb: FormBuilder,) { }

  lineForm = this.fb.group({
    routeLineId: [0],
    overhead: [''],
    wagonNo: [],
    contPrefix: ['', Validators.required],
    containerNo: ['', Validators.required],
    qnq: [''],
    qnqId: [1],
    fileName: [''],
    filePath: [''],
    checkStatus: [1]
  });

  get Lf(): { [key: string]: AbstractControl } {
    return this.lineForm.controls;
  }

  ngOnInit(): void {

    this.currentRouteColumns = [
      {
        Name: "TrackingNo",
        Type: 1
      },

      {
        Name: "Direction",
        Type: 1
      },

      {
        Name: "TR",
        Type: 1
      },

      {
        Name: "TRGE",
        Type: 2
      },

      {
        Name: "GE",
        Type: 1
      },

      {
        Name: "GEAZ",
        Type: 2
      },

      {
        Name: "AZ",
        Type: 1
      },

      {
        Name: "AZKH",
        Type: 2
      },

      {
        Name: "KH",
        Type: 1
      },

      {
        Name: "KHTM",
        Type: 2
      },

      {
        Name: "TM",
        Type: 1
      },

      {
        Name: "TMUZ",
        Type: 2
      },

      {
        Name: "UZ",
        Type: 1
      },

      {
        Name: "UZKG",
        Type: 2
      },

      {
        Name: "KG",
        Type: 1
      },
    ]

    this.routeCurrentData = new MatTableDataSource<any>([
      {
        AZ: null,
        AZKH: null,
        COUNTRY: "Gürcüstan  --  Türkmənistan",
        Direction: 0,
        GE: null,
        GEAZ: null,
        KG: null,
        KH: null,
        KHTM: 2,
        RouteId: 72,
        TM: 2,
        TMUZ: null,
        TR: null,
        TRGE: null,
        TrackingNo: "2208-0045",
        UZ: null,
        UZKG: null
      },

      {
        AZ: null,
        AZKH: 2,
        COUNTRY: "Gürcüstan  --  Türkmənistan",
        Direction: 1,
        GE: 3,
        GEAZ: null,
        KG: null,
        KH: 5,
        KHTM: 2,
        RouteId: 73,
        TM: 0,
        TMUZ: null,
        TR: null,
        TRGE: 3,
        TrackingNo: "2208-0046",
        UZ: null,
        UZKG: 2
      }
    ]);

    this.displayedColumns = this.currentRouteColumns.map(c => c.Name);
    this.getTotals()


    this.routeData = new MatTableDataSource<any>([
      {
        Color: " #007bff",
        ContCount: 7,
        Countries: "Turkey / Kyrgyzstan",
        Date: "2022-07-27",
        DestCode: "kg",
        DestCountry: "Kyrgyzstan",
        DestCountryId: 122,
        DestStationId: 6358,
        DestStationName: "72222 - Ош",
        Eta: "10 d 2 h",
        LoadCode: "tr",
        LoadCountry: "Turkey",
        LoadCountryId: 231,
        LoadStationId: -1,
        LoadStationName: "Biherova 0344-6",
        RouteId: 61,
        Status: "Loaded",
        TrackingNo: "2207-0034", 
      },
 
    ])

    this.routeData.paginator = this.excelPaginator;

  }

  // private getRoutes() {
  //   this.shipmentService.getRoutes().subscribe(res => {
  //     this.routeData = new MatTableDataSource<any>(res);
  //     this.routeData.paginator = this.commonPaginator;
  //   });
  // }

  highlight(event: any) {
    [...event.target.parentElement.parentElement.children].forEach(e => {
      if (e !== event.target.parentElement) {
        e.style.backgroundColor = '';
      }
    });
    event.target.parentElement.style.backgroundColor = event.target.parentElement.style.backgroundColor === ''
      ? '#b3ebff' : '';
  }

  deleteCommonRow(routeId: number, trackingNo: string) {
    Swal.fire({
      title: `Are you sure you want to delete Loading with tracking № ${trackingNo}?`,
      text: 'Attention: It will delete all data related to this route!',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: 'Cancel',
      icon: 'warning'

    }).then((result) => {
      // if (result.isConfirmed) {
      //   this.shipmentService.deleteRoute(routeId).subscribe((res) => {
      //     if (res.result) {
      //       infoAlert(`Shipment with tracking no ${trackingNo} was deleted`).then(() => this.getRoutes());
      //     }
      //     else {
      //       errorAlert(`This route is in process, so you can not delete it.`).then(() => this.getRoutes());
      //     }
      //   });
      // }
    });
  }

  openEtaPopUp(id: number) {
    // this.dialog.open(EtaPopUpComponent, {
    //   disableClose: true,
    //   hasBackdrop: true,
    //   width: '40%',
    //   height: 'auto',
    //   autoFocus: false,
    //   data: {
    //     routeID: id
    //   }
    // });
  }

  openCountPopUp(id: number) {
    // this.dialog.open(ContCountPopUpComponent, {
    //   disableClose: true,
    //   hasBackdrop: true,
    //   width: '50%',
    //   height: 'auto',
    //   maxHeight: '95%',
    //   autoFocus: false,
    //   data: {
    //     routeId: id,
    //     operationId: 0,
    //     type: this.postFilterData?.type,
    //     month: this.postFilterData?.month,
    //     year: this.postFilterData?.year
    //   }
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.routeData.filter = filterValue.trim().toLowerCase();
  }

  getRowSecond(element: any) {
    this.secondLocationY = element.screenY;
    console.log("sagol")
    console.log(this.secondLocationY)

    console.log("ferq:  " + ((this.secondLocationY - this.firstLocationY) / 48) + ` ${Math.round(((this.secondLocationY - this.firstLocationY) / 48))}`)

    for (let index = 0; index < Math.round(((this.secondLocationY - this.firstLocationY) / 48)); index++) {
      let model = {
        Color: "",
        ContCount: 0,
        Countries: "",
        Date: "",
        DestCode: "",
        DestCountry: "",
        DestCountryId: 0,
        DestStationId: 0,
        DestStationName: "",
        Eta: "",
        LoadCode: "",
        LoadCountry: "",
        LoadCountryId: 0,
        LoadStationId: -1,
        LoadStationName: "",
        RouteId: 0,
        Status: "",
        TrackingNo: "",
      }

      model.DestStationName = this.firstLocationContent;

      this.routeData = new MatTableDataSource<any>([...this.routeData.data, model]);
      // this.routeData.data.push(model);
      // this.routeData.paginator = this.excelPaginator;

    }

  }

  getRowFirst(element: any) {

    
    this.firstLocationY = element.screenY;
    this.firstLocationContent = element.target.textContent;
    console.log(element.target.textContent)
    console.log(this.firstLocationY)


    // var rect = element.target.parentElement.getBoundingClientRect();

    // console.log(element.offsetY);

    // console.log(rect.top);

    // console.log((rect.top - element.offsetY) / 48);


    // console.log(element)
    // console.log(index + "   row   " + colIndex + "   column" );

    // const newArr = new Array(this.displayedcommontColumns.length);

    // let tempDataSource = new Array()

    // // insert empty cells for new row
    // // look for the right row to edit
    // for (let i = 0; i < this.routeData.data.length; i++) {
    //   if (index === i) { // if row index equal the index of clicked add button then add new header
    //     tempDataSource.push(this.routeData.data[i]);
    //     tempDataSource.push(element);
    //   } else {
    //     tempDataSource.push(this.routeData.data[i]);
    //   }
    // }
    // this.routeData.data = tempDataSource;
  }

  getPosition(element: any) {
    var rect = element.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top
    };
  }

  drop(event: any) {
    moveItemInArray(this.routeData.data, event.previousIndex, event.currentIndex);
  }


  // TOTAL OLAN TABLE BASLAYIR
  clearSearchResult(index: number = 0) {
    this.sumBackwardTotals = 0;
    this.sumForwardTotals = 0;
    // if (index == 0) {
    //   this.searchResult = {
    //     trackingNo: '',
    //     wagonNo: '',
    //     containerNo: '',
    //     overhead: '',
    //     countryId: 0
    //   }
    //   this.refreshTable(this.searchResult)
    // }
  }

  private getTotals() {
    this.forwardTotals = [];
    this.backwardTotals = [];
    this.forwardTotal = 0;
    this.backwardTotal = 0;
    this.sumBackwardTotals = 0;
    this.sumForwardTotals = 0;

    for (let i = 1; i < this.displayedColumns?.length; i++) {
      this.forwardTotal = 0;
      this.backwardTotal = 0;
      this.routeCurrentData.data.map(t => {
        t.Direction === 1 ? this.forwardTotal += Number(t[this.displayedColumns[i]] || 0) : this.backwardTotal += Number(t[this.displayedColumns[i]] || 0);
      });
      this.forwardTotals.push(this.forwardTotal);
      this.backwardTotals.push(this.backwardTotal);
    }
    for (let index = 1; index < this.forwardTotals.length; index++) {
      this.sumForwardTotals += this.forwardTotals[index];
    }
    for (let index = 1; index < this.backwardTotals.length; index++) {
      this.sumBackwardTotals += this.backwardTotals[index];
    }
  }

  openTotalPopUp(direction: number, type: number, code: number) {
    // this.total_dialogRef = this.dialog.open(TotalPopUpComponent, {
    //   data: {
    //     direction: direction,
    //     type: type,
    //     columnName: code,
    //   },
    //   disableClose: true,
    //   hasBackdrop: true,
    //   width: '160vh',
    //   height: 'auto'
    // });

    // this.total_dialogRef.afterClosed().subscribe(res => {
    //   if (res === 1) {
    //     this.onHandleRefresh();
    //   }
    // })
  }

  openDialog(direction: number, type: number, columnName: string, trackingNo: string, routeId: number, index: number) {
    // if (index === 0 || index === 1)
    //   return;
    // this.routeOpr = {
    //   direction: direction,
    //   type: type,
    //   code: columnName,
    //   routeId: routeId
    // }
    // this.cell_dialogRef = this.dialog.open(CurrentRootPopUpComponent, {
    //   data: {
    //     direction: direction,
    //     type: type,
    //     columnName: columnName,
    //     trackingNo: trackingNo,
    //     routeId: routeId
    //   },
    //   disableClose: true,
    //   hasBackdrop: true,
    //   width: '160vh',
    //   height: 'auto'
    // });

    // this.cell_dialogRef.afterClosed().subscribe(res => {
    //   if (res === 1) {
    //     this.onHandleRefresh();
    //   }
    // });
  }



  //EXCEL IMPORTLU TABLE
  deleteLine(index: number) {
    this.receiptFileExcel.data.splice(index, 1);
    this.receiptFileExcel.paginator = this.OHPaginator;
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file?.name;
  }

  onCreateOverhead() {
    if (!this.lineForm.valid) {
      this.isLineFormValid = false;
      return;
    }

    this.excelFileName = '';
    this.fileName = '';
    this.Lf['routeLineId'].setValue(0);
    this.Lf['qnqId'].setValue(-1);
    this.Lf['checkStatus'].setValue(1);

    // this.receiptFileExcelExcel.data.push(this.lineForm.value);
    // this.receiptFileExcel.paginator = this.OHPaginator;
    // this.lineForm.reset();
    if (this.file) {
      console.log("salam")
      this.Lf['filePath'].setValue('dataFilePath');
      this.Lf['fileName'].setValue("dataFile");
      this.receiptFileExcel = new MatTableDataSource<any>([...this.receiptFileExcel.data, this.lineForm.value]);
      this.receiptFileExcel.paginator = this.OHPaginator;
      this.lineForm.reset();
      this.file = undefined;
    } else {
      console.log("salam")
      this.receiptFileExcel = new MatTableDataSource<any>([...this.receiptFileExcel.data, this.lineForm.value]);
      this.receiptFileExcel.paginator = this.OHPaginator;
      this.lineForm.reset();
      this.file = undefined;
    }
  }

  uploadExcel(event: any) {

    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    this.excelFileName = file.name;
    fileReader.onload = (e) => {
      let book = XLSX.read(fileReader.result, { type: 'binary' });
      let sheetNames = book.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(book.Sheets[sheetNames[0]]);

      for (let index = 0; index < this.excelData.length; index++) {

        let json = {
          routelineId: 0,
          containerNo: '',
          overhead: '',
          qnq: "",
          qnqId: -1,
          wagonNo: 0,
          contPrefix: '',
          fileName: "",
          filePath: "",
          checkStatus: 1,
        }

        json.containerNo = String(this.excelData[index].ContainerNo);
        json.overhead = String(this.excelData[index].Waybill);
        json.wagonNo = this.excelData[index].Wagon;
        json.contPrefix = this.excelData[index].Prefix;
        json.routelineId = 0;
        this.receiptFileExcel.data.push(json)
      }

      this.receiptFileExcel.sort = this.sort;

    }
  }

  saveRoute() {
    if (this.receiptFileExcel.data.length == 0) {
      errorAlert('Add at least a container!');
      return;
    }
    console.log(this.receiptFileExcel.data)

  }





}
