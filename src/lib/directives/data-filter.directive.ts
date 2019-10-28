import { Directive, Input } from '@angular/core';
import { FilterEvent } from '../interfaces/filter-event';
import { Ng8DataTableDirective } from './ng8-data-table.directive';

@Directive({
  selector: '[ng8-data-filter]'
})
export class DataFilterDirective {
  @Input() filterBy: string = "";
  @Input() filterValue: string[] = [];

  constructor(private dataTable: Ng8DataTableDirective) {
    this.dataTable.onFilterChange.subscribe((event: FilterEvent) => {
      
    });
  }

  public filter(): void {
    console.log("Filter Data");
    console.log(this.filterBy);
    console.log(this.filterValue);
    this.dataTable.setFilter(this.filterBy, this.filterValue);
  }
}
