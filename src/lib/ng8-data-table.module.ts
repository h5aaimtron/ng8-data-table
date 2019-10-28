import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { Ng8DataTableDirective } from './directives/ng8-data-table.directive';
import { DataFilterDirective } from './directives/data-filter.directive';
import { ColumnSorterComponent } from './components/column-sorter/column-sorter.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginateComponent } from './components/paginate/paginate.component';

@NgModule({
  declarations: [
    Ng8DataTableDirective,
    DataFilterDirective,
    ColumnSorterComponent,
    PaginationComponent,
    PaginateComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    Ng8DataTableDirective,
    DataFilterDirective,
    ColumnSorterComponent,
    PaginationComponent
  ]
})
export class Ng8DataTableModule { }
