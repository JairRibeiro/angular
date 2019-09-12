import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { InMemoryDatabase } from './in-memory-database';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      progressBar:true
   })
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
