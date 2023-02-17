import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss']
})
export class InputTableComponent implements OnInit {
  file?: File;
  filePath!: string;
  displayBtns = false;
  openUpdateBtn = false;
  displayUpdateBtn!: number;
  displayId!: number;
  dataInputTable: any;

  displayedreceiptColumns: string[] = [
    "qaimeNo",
    "vaqonNo",
    'contPrefix',
    "containerNo",
    "fileName",
    // "filepath",
    "operation",
  ];
  receiptFile: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  routeData: any | undefined;
  anyForm!: FormGroup;
  readonly requiredText = 'REQUIRED_TEXT';
  hideFile = false;
  date!: Date;

  routeForm = this.fb.group({
    operationDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en')],
    trackingNo: '',
    trainNo: '',
    delayNote: '',
    operationType: 0,
    routeId: 0,
    nextArea: -1,
    nextAreaName: '',
    area: -1,
    areaName: '',
    port: '',
    shipName: '',
    shipType: -1,
  });

  constructor(private fb: FormBuilder) { }

  generateForm() {
    this.anyForm = this.fb.group({
      lines: this.fb.array([])
    })
  }

  onDataSetFormArray(model: any) {
    return this.fb.group({
      routeLineId: [model.routeLineId],
      overhead: [model.overhead],
      wagonNo: [model.wagonNo],
      contPrefix: [model.contPrefix],
      containerNo: [model.containerNo],
      fileName: [model.fileName],
      fileId: [model.fileId]
    });
  }

  get Rf(): { [key: string]: AbstractControl } {
    return this.routeForm.controls;
  }

  get lines() {
    return this.anyForm.get("lines") as FormArray
  }

  addLinesValue(frmArr: any) {
    this.lines.push(frmArr);
  }

  ngOnInit(): void {

    this.generateForm();
  }

  // getUrl(filePath: string) {
  //   console.log(filePath);
  // }

  onHandleApiData(fromApiResponse: Array<any>) {
    fromApiResponse.forEach((response: any) => {
      let frmArry = this.onDataSetFormArray(
        {
          routeLineId: response.routeLineId,
          contPrefix: response.contPrefix,
          containerNo: response.containerNo,
          fileName: response.fileName,
          fileId: response.fileId,
          overhead: response.overhead,
          wagonNo: response.wagonNo
        });

      this.addLinesValue(frmArry)
    });
  }


  addData() {
    this.dataInputTable = [
      {
        contPrefix: "ADYU",
        containerId: 0,
        containerNo: "1922245",
        fileId: -1,
        filePath: null,
        overhead: "597247",
        qnq: "",
        routeId: 8,
        routeLineId: 1602,
        wagonId: 0,
        wagonNo: 94302924,
        selectedFileName: ""
      },
      {
        contPrefix: "ADYU",
        containerId: 0,
        containerNo: "3233",
        fileId: -1,
        filePath: null,
        overhead: "453423",
        qnq: "",
        routeId: 8,
        routeLineId: 1602,
        wagonId: 0,
        wagonNo: 94302924,
        selectedFileName: ""
      },
      {
        contPrefix: "ADYU",
        containerId: 0,
        containerNo: "5555",
        fileId: -1,
        filePath: null,
        overhead: "",
        qnq: "",
        routeId: 8,
        routeLineId: 1602,
        wagonId: 0,
        wagonNo: 94302924,
        selectedFileName: ""
      },
    ]

    this.generateForm();
    this.receiptFile = new MatTableDataSource<any>(this.dataInputTable);
    this.onHandleApiData(this.dataInputTable);

  }

  onOpenBtns(id: number) {
    this.displayId = id;
    this.displayBtns = !this.displayBtns;
    this.receiptFile = new MatTableDataSource<any>(this.lines.value);
    this.displayUpdateBtn = -1;
  }

  updateLine(index: number) {
    this.displayUpdateBtn = index;
    this.openUpdateBtn = true;
    this.receiptFile = new MatTableDataSource<any>(this.lines.value);
    // this.receiptFile = new MatTableDataSource<any>(this.lines.value);

  }

  deleteLine(index: number) {
    this.receiptFile.data.splice(index, 1);
    this.lines.removeAt(index);


    // this.onHandleApiData(this.dataInputTable);
    this.displayBtns = false;
    // console.log(this.lines.value)
    this.receiptFile = new MatTableDataSource<any>(this.lines.value);
  }


  uploadFile(event: any, index: number) {
    this.receiptFile.data[index].selectedFileName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.anyForm.controls['lines'].value[index].fileName = 'res.fileName';
    this.anyForm.controls['lines'].value[index].fileId = 0;
    this.receiptFile.data[index].FilePath = 'res.filePath'
    this.hideFile = true;
  }

  saveRoute() {
    this.routeData = this.routeForm.value;
    this.routeData!.routeLines = this.anyForm.controls['lines'].value;
    console.log(this.routeData)
  }

}
