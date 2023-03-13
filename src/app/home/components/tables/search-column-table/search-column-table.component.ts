import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-column-table',
  templateUrl: './search-column-table.component.html',
  styleUrls: ['./search-column-table.component.scss']
})
export class SearchColumnTableComponent implements OnInit {
  displayedcommontColumns: string[] = [
    'index',
    'TrackingNo',
    'Status',
    'Countries',
    'LoadStationName', 
    'DestStationName',
    'ContCount',
    'Date',
    'Eta',
    'RouteId',
    // 'status',
  ];

  routeData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  initialDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  pageEvent!: PageEvent;
  length?: number;
  lengthVender?: number;
  pageSize!: number;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  @ViewChild('commonPag') commonPaginator!: MatPaginator;

  orderRequestData: any = {
    filters: []
  }

  filterForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
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
        Eta: "1 d 9 h",
        LoadCode: "tr",
        LoadCountry: "Turkey",
        LoadCountryId: 231,
        LoadStationId: -1,
        LoadStationName: "Biherova 0232-3",
        RouteId: 61,
        Status: "Loaded",
        TrackingNo: "2207-0034", 
      },
      {
        Color: " #007bff",
        ContCount: 7,
        Countries: "Georgia / Ozbekhistan",
        Date: "2022-08-27",
        DestCode: "kg",
        DestCountry: "Kyrgyzstan",
        DestCountryId: 122,
        DestStationId: 6358,
        DestStationName: "71233 - Ош",
        Eta: "3 d 3 h",
        LoadCode: "tr",
        LoadCountry: "Turkey",
        LoadCountryId: 231,
        LoadStationId: -1,
        LoadStationName: "Biherova 0344-6",
        RouteId: 61,
        Status: "Loaded",
        TrackingNo: "2207-0035", 
      },
      {
        Color: " #007bff",
        ContCount: 7,
        Countries: "Turkey / Azerbaijan",
        Date: "2022-09-27",
        DestCode: "kg",
        DestCountry: "Kyrgyzstan",
        DestCountryId: 122,
        DestStationId: 6358,
        DestStationName: "83221 - Ош",
        Eta: "2 d 2 h",
        LoadCode: "tr",
        LoadCountry: "Turkey",
        LoadCountryId: 231,
        LoadStationId: -1,
        LoadStationName: "Biherova 0233-9",
        RouteId: 61,
        Status: "Loaded",
        TrackingNo: "2207-0036", 
      },

      {
        Color: " #007bff",
        ContCount: 7,
        Countries: "Georgia / Azerbaijan",
        Date: "2022-09-27",
        DestCode: "kg",
        DestCountry: "Azerbaijan",
        DestCountryId: 122,
        DestStationId: 6358,
        DestStationName: "83221 - Ош",
        Eta: "2 d 2 h",
        LoadCode: "tr",
        LoadCountry: "Georgia",
        LoadCountryId: 231,
        LoadStationId: -1,
        LoadStationName: "Biherova 0233-9",
        RouteId: 61,
        Status: "Loaded",
        TrackingNo: "2207-0036", 
      },
 
    ])

    this.initialDataSource = this.routeData;
    this.routeData.paginator = this.commonPaginator;

    this.generateForm();
  }
  

  highlight(event: any) {
    // [...event.target.parentElement.parentElement.children].forEach(e => {
    //   if (e !== event.target.parentElement) {
    //     e.style.backgroundColor = '';
    //   }
    // });
    // event.target.parentElement.style.backgroundColor = event.target.parentElement.style.backgroundColor === ''
    //   ? '#b3ebff' : '';
  }

  generateForm() {
    let model: any = {};
    this.displayedcommontColumns.map((dt: any) => {
      model[dt] = '';
    })

    this.filterForm = this.fb.group(model)
  }

  handleFilter() {
    this.orderRequestData.filters = [];
    console.log(this.filterForm)

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

          if (element.key == 'date') {
            let dArr = element.value.split("-");
            if (dt[element.key] == dArr[1] + "-" + dArr[2] + "-" + dArr[0]) return dt
          }
          else {
            if (dt[element.key].toString().toLowerCase().includes(element.value.toLowerCase())) return dt
          }

        })
      });

      this.routeData = new MatTableDataSource<any>(dataArr);
      this.routeData.data = this.routeData.data;
      this.routeData.paginator = this.commonPaginator;
    }

    else {
      this.routeData = new MatTableDataSource<any>(this.initialDataSource.data);
      this.routeData.data = this.routeData.data;
      this.routeData.paginator = this.commonPaginator;
    }
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.handleFilter();
    }
  }

  changeStatus(event: any, element: any) {

  }

}
