import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-colums',
  templateUrl: './colums.component.html',
  styleUrls: ['./colums.component.scss']
})
export class ColumsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ColumsComponent>,
  ) { }

  displayedColumns: string[] = ['position', 'name'];
  dataSource: any = [
    // { position: 1, name: 'Expand', column: 'expand' },
    { position: 2, name: 'Name', column: 'name', isSelect: false },
    { position: 3, name: 'Weight', column: 'weight', isSelect: false },
    { position: 4, name: 'Symbol', column: 'symbol', isSelect: false },
    { position: 5, name: 'Position', column: 'position', isSelect: false },
  ];

  highlightRow: any[] = ['expand'];

  ngOnInit(): void {

    this.dataSource.map((dt: any) => {
      this.data.columns.map((subDt: any) => {
        if (dt.column == subDt) {
 
          dt.isSelect = true;
          this.highlightRow.push(dt.column)
        }
      })
    })

    this.dataSource = this.dataSource;

  }

  highlight (event: any, row: any) {
    // if (event.target.parentElement.style.backgroundColor === '') {
    //   event.target.parentElement.style.backgroundColor = '#b3ebff';
    //   this.highlightRow.push(row.column);
    // }
    // else {
    //   event.target.parentElement.style.backgroundColor = '';

    // }

    console.log(row);

    if (row.isSelect == true) {
      event.target.parentElement.style.backgroundColor = '';
      let findIndex = this.highlightRow.indexOf(row.column);
      this.highlightRow.splice(findIndex, 1);
      row.isSelect = false;
      this.dataSource = this.dataSource
    }

    else {
      event.target.parentElement.style.backgroundColor = '#b3ebff';
      this.highlightRow.push(row.column);
      row.isSelect = true;
    }
  }

  onCloseDialog() {
    var uniqueColumn = this.highlightRow.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })

    this.dialogRef.close(uniqueColumn);
    uniqueColumn.sort();

    localStorage.setItem('colums', uniqueColumn.toString());
    this.dialogRef.close([]);
  }

  removeFilter() {
    this.dialogRef.close([]);
    localStorage.removeItem('colums');
  }

  save() {

    var uniqueColumn = this.highlightRow.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.dialogRef.close(uniqueColumn);
    uniqueColumn.sort();

    localStorage.setItem('colums', uniqueColumn.toString());
  }

}
