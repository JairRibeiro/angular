import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesRoutingModule } from './entries-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from "@angular/forms";
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntriesRoutingModule,
    ModalModule.forRoot(),
    CalendarModule,
    IMaskModule
  ]
})
export class EntriesModule { }
