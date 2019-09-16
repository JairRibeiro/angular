import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { IMaskModule } from 'angular-imask';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from "@angular/forms";
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [],
  imports: [    
    CalendarModule,
    CommonModule,
    IMaskModule,   
    InfiniteScrollModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,    
    TooltipModule.forRoot()
  ],
  exports: [
    CalendarModule,
    CommonModule,
    IMaskModule,   
    InfiniteScrollModule,
    ModalModule,
    ReactiveFormsModule,
    TooltipModule
  ]    
})
export class SharedModule { }
