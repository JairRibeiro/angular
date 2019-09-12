import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesRoutingModule } from './entries-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { EntryListComponent } from './entry-list/entry-list.component';

@NgModule({
  declarations: [EntryListComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ModalModule.forRoot()
  ]
})
export class EntriesModule { }
