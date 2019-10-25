import { Directive, Input } from '@angular/core';
import { DataTable } from '../data-table';
import { FilterEvent } from '../interfaces/filter-event';

@Directive({
  selector: '[filterBy]',
  exportAs: 'dataFilter'
})
export class DataFilterDirective {
  @Input() filterBy: string = "";
  @Input() filterValue: string[] = [];

  constructor(private dataTable: DataTable) {
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
