import { Component, OnInit } from '@angular/core';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-export-files',
  templateUrl: './export-files.component.html',
  styleUrls: ['./export-files.component.scss']
})
export class ExportFilesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  async exportWord() {
    let htmlContent: any = document.getElementById('content')?.innerHTML
    var converted: any = await asBlob(htmlContent, {
      orientation: 'landscape',
      margins: { top: 720 },
    });
    saveAs(converted, 'test.docx');
  }

  exportPdf() {
    let DATA: any = document.getElementById('content');
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
      PDF.save('Invoice.pdf');
    });
  }

  print() {
    // var frame = document.getElementById('content')?.innerHTML as any;
    // // frame!.contentWindow.focus();
    // console.log(frame)
    // frame!.contentWindow.print(); 

    // window.print();

    // var headstr = "<html><head><title></title></head><body>";
    // var footstr = "</body>";
    // var newstr = document.getElementById('content')!.innerHTML;
    // var oldstr = document.body.innerHTML;
    // document.body.innerHTML = headstr + newstr + footstr;
    // window.print();
    // document.body.innerHTML = oldstr;
    // return false;

    var divContents = document.getElementById("content")!.innerHTML;
    var a = window.open('', '', 'height=1000, width=1000');
    a!.document.write('<html>');
    a!.document.write('<body > <h1>Div contents are <br>');
    a!.document.write(divContents);
    a!.document.write('</body></html>');
    a!.document.close();
    a!.print();
  }


}
