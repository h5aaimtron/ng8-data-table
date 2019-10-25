import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTable } from './data-table';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { SorterComponent } from './components/sorter/sorter.component';
import { DataFilterDirective } from './directives/data-filter.directive';



@NgModule({
  declarations: [DataTable, PaginationComponent, PaginateComponent, SorterComponent, DataFilterDirective],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [DataTable, PaginationComponent, SorterComponent, DataFilterDirective]
})
export class DataTableModule { }
