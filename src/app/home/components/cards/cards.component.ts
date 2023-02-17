import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import pdfMake from 'pdfmake/build';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  filterCardsData: any[] = [];
  constructor(private ref: ChangeDetectorRef,) { }
  // @ViewChild('content') content!: HTMLElement;
  @ViewChild('htmlData') htmlData!: ElementRef;
  
  ngOnInit(): void {
    this.filterCardsData = [
      {
        ColorCode: "#6c5b7b",
        ContCount: 19,
        Operation: "All",
        Percentage: 100,
        RouteCount: 8,
        Type: -1,
      },

      {
        ColorCode: " #007bff",
        ContCount: 8,
        Operation: "Loaded",
        Percentage: 42.11,
        RouteCount: 5,
        Type: 1,
      },

      {
        ColorCode: " #ffc107",
        ContCount: 8,
        Operation: "In process",
        Percentage: 42.11,
        RouteCount: 4,
        Type: 2,
      },

      {
        ColorCode: "#28a745",
        ContCount: 3,
        Operation: "Arrival",
        Percentage: 15.79,
        RouteCount: 1,
        Type: 4,
      },
    ]

    this.filterCardsData.forEach((item, key) => {
      this.filterCardsData[key].counter = 0;
      this.filterCardsData[key].counterContainer = 0;
    })

    let cardData = this.filterCardsData;
    let rf = this.ref
    let intervalLoaded = setInterval(function () {
      if (cardData[0].RouteCount > 0) cardData[0].counter++;
      if (cardData[0].counter == cardData[0].RouteCount) clearInterval(intervalLoaded);
      rf.markForCheck();
    }, 100);

    let intervalLoadedContainer = setInterval(function () {
      if (cardData[0].ContCount > 0) cardData[0].counterContainer++;
      if (cardData[0].counterContainer == cardData[0].ContCount) clearInterval(intervalLoadedContainer);
      rf.markForCheck();
    }, 20);

    let intervalProcess = setInterval(function () {
      if (cardData[1].RouteCount > 0) cardData[1].counter++;
      if (cardData[1].counter == cardData[1].RouteCount) clearInterval(intervalProcess);
      rf.markForCheck();
    }, 100);

    let intervalProcessContainer = setInterval(function () {
      if (cardData[1].ContCount > 0) cardData[1].counterContainer++;
      if (cardData[1].counterContainer == cardData[1].ContCount) clearInterval(intervalProcessContainer);
      rf.markForCheck();
    }, 20);

    let intervalArrival = setInterval(function () {
      if (cardData[2].RouteCount > 0) cardData[2].counter++;
      if (cardData[2].counter == cardData[2].RouteCount) clearInterval(intervalArrival);
      rf.markForCheck();
    }, 100);

    let intervalArrivalContainer = setInterval(function () {
      if (cardData[2].ContCount > 0) cardData[2].counterContainer++;
      if (cardData[2].counterContainer == cardData[2].ContCount) clearInterval(intervalArrivalContainer);
      rf.markForCheck();
    }, 20);

    let intervalDeleted = setInterval(function () {
      if (cardData[3].RouteCount > 0) cardData[3].counter++;
      if (cardData[3].counter == cardData[3].RouteCount) clearInterval(intervalDeleted);
      rf.markForCheck();
    }, 100);

    let intervalDeletedContainer = setInterval(function () {
      if (cardData[3].ContCount > 0) cardData[3].counterContainer++;
      if (cardData[3].counterContainer == cardData[3].ContCount) clearInterval(intervalDeletedContainer);
      rf.markForCheck();
    }, 20);


  }

  Pdf(){
    const doc = new jsPDF();
   
    // const pdfTable = this.pdfTable.nativeElement;
   
    // var html = htmlToPdfmake(pdfTable.innerHTML);
     
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open();
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }


}
