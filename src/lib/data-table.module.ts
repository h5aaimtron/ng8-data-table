import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTable } from './data-table';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { SorterComponent } from './components/sorter/sorter.component';



@NgModule({
  declarations: [DataTable, PaginationComponent, PaginateComponent, SorterComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [DataTable, PaginationComponent, SorterComponent]
})
export class DataTableModule { }
