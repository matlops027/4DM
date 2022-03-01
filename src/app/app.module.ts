import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NbThemeModule, NbDatepickerModule, NbLayoutModule, NbUserModule, NbMenuModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AutenticationModule } from './autentication/autentication.module';
import { NbCardModule } from '@nebular/theme'

import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { IndexModule } from './index/index.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AutenticationModule,
    NbCardModule,
    NbThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbLayoutModule,
    NbUserModule,
    NbMenuModule.forRoot(),
    IndexModule,
    
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
