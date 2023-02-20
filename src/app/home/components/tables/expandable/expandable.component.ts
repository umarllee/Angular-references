import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HyperPopUpComponent } from './hyper-pop-up/hyper-pop-up.component';
import { ColumsComponent } from './colums/colums.component';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  }
]

interface PeriodicElementNormal {
  redirectName: string;
  position: number;
  hyperlink: string;
  hyperlinkName: string;
  symbol: string;
  link: string;
  redirect: string;
}

const ELEMENT_DATANormal: PeriodicElementNormal[] = [
  { position: 1, redirectName: 'Modules', hyperlink: '', hyperlinkName: 'Link 1', symbol: 'H', link: 'https://www.blobmaker.app/', redirect: '/home' },
  { position: 2, redirectName: 'Tables', hyperlink: '', hyperlinkName: 'Link 2', symbol: 'He', link: 'https://neumorphism.io/#e0e0e0', redirect: '/home/tables' },
  { position: 3, redirectName: 'Charts', hyperlink: '', hyperlinkName: 'Link 3', symbol: 'Li', link: 'https://blog.hubspot.com/website/css-animation-examples', redirect: '/home/chart' },
  { position: 4, redirectName: 'Beryllium 1', hyperlink: '', hyperlinkName: '', symbol: 'Be', link: 'https://animista.net/play/basic/shadow-drop', redirect: '' },
];

const ELEMENT_DATANormal2: PeriodicElementNormal[] = [
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
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplayWithExpand: any[] = [];
  initialColumnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  expandedElement!: PeriodicElement | null;
  constructor(
    private dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSourceNormal: any;

  isFilter = false;

  dialogref?: MatDialogRef<HyperPopUpComponent>;
  dialogrefColums?: MatDialogRef<ColumsComponent>;
  
ngOnInit(): void {
  this.columnsToDisplayWithExpand = (localStorage.getItem('colums')?.split(','))!;

  const doc = new jsPDF();

}

expandRow(element: any) {
  this.expandedElement = this.expandedElement === element ? null : element

  if (element.position == 1) {
    this.dataSourceNormal = ELEMENT_DATANormal;
  }

  else if (element.position == 2) {
    this.dataSourceNormal = ELEMENT_DATANormal2;
  }

  else {
    this.dataSourceNormal = '';
  }

  // alert();
}

openPopup(element: PeriodicElementNormal) {
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
      this.dataSource = this.dataSource;
      this.isFilter = true;
    }

    else {
      localStorage.setItem('colums', this.initialColumnsToDisplayWithExpand.toString());
    }
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



}
