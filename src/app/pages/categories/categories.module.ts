import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from "@angular/forms";

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';


@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,    
    TooltipModule.forRoot(),
    ModalModule.forRoot()    
  ],
  providers: []
})
export class CategoriesModule { }
