import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SkillsComponent } from './components/tables/skills.component';
import { WorksComponent } from './components/works/works.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { NavbarComponent } from './components/navbarPanel/navbar.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardsComponent } from './components/cards/cards.component';
import { InputTableComponent } from './components/tables/input-table/input-table.component';
import { MatTreeModule } from '@angular/material/tree';
import { GalerryComponent } from './components/galerry/galerry.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ChartsComponent } from './components/charts/charts.component';
// import { ChartsModule } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { ExpandableComponent } from './components/tables/expandable/expandable.component';
import { HyperPopUpComponent } from './components/tables/expandable/hyper-pop-up/hyper-pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ColumsComponent } from './components/tables/expandable/colums/colums.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserInfoComponent } from './components/user-info/user-info.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSortModule} from '@angular/material/sort';
import { DragTableComponent } from './components/tables/drag-table/drag-table.component';
import { DataExchangeTableComponent } from './components/tables/data-exchange-table/data-exchange-table.component';
import { SearchColumnTableComponent } from './components/tables/search-column-table/search-column-table.component';


@NgModule({
  declarations: [
    HomeComponent,
    SkillsComponent,
    WorksComponent,
    NavbarComponent,
    NavigationComponent,
    CardsComponent,
    InputTableComponent,
    GalerryComponent,
    ChartsComponent,
    ExpandableComponent,
    HyperPopUpComponent,
    ColumsComponent,
    UserInfoComponent,
    DragTableComponent,
    DataExchangeTableComponent,
    SearchColumnTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    DragDropModule,
    MatAutocompleteModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MdbCarouselModule,
    NgChartsModule,
    MatDialogModule,
    MatSidenavModule,
    MatTabsModule,
    MatSortModule
  ],
})
export class HomeModule { }
