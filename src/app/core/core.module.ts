import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDatabase } from '../in-memory-database';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      progressBar:true
    }),
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    ToastrModule
  ],
  providers: [ToastrService]
})
export class CoreModule { }
