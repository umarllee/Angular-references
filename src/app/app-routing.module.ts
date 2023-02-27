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
  {
    runGuardsAndResolvers: 'always',
    path: 'home', component: HomeComponent, children: [
      { path: 'tables', component: SkillsComponent },
      { path: 'tables/inputTable', component: InputTableComponent },
      { path: 'tables/expandableTable', component: ExpandableComponent },
      { path: 'works', component: WorksComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'gallery', component: GalerryComponent },
      { path: 'chart', component: ChartsComponent },
      { path: 'dataShare', component: DataShareComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
