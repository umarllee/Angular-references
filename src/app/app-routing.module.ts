import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataShareComponent } from './dataShare/data-share.component';
import { CardsComponent } from './home/components/cards/cards.component';
import { ChartsComponent } from './home/components/charts/charts.component';
import { GalerryComponent } from './home/components/galerry/galerry.component';
import { InputTableComponent } from './home/components/tables/input-table/input-table.component';
import { SkillsComponent } from './home/components/tables/skills.component';
import { WorksComponent } from './home/components/works/works.component';
import { HomeComponent } from './home/home.component';
import { ExpandableComponent } from './home/components/tables/expandable/expandable.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home/tables', component: SkillsComponent },
  { path: 'home/tables/inputTable', component: InputTableComponent },
  { path: 'home/tables/expandableTable', component: ExpandableComponent },
  { path: 'home/works', component: WorksComponent },
  { path: 'home/cards', component: CardsComponent },
  { path: 'home/gallery', component: GalerryComponent },
  { path: 'home/chart', component: ChartsComponent },
  { path: 'home/dataShare', component: DataShareComponent },
  {
    runGuardsAndResolvers: 'always',
    path: 'home', 
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
