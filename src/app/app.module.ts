import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserFormComponent } from './dataShare/user-form/user-form.component';
import { ShowUserComponent } from './home/components/show-user/show-user.component';
import { DataShareComponent } from './dataShare/data-share.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';

// import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    ShowUserComponent,
    DataShareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule
  
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
