import { Component, OnInit, Input } from '@angular/core';
import { Ng8DataTableDirective } from '../../directives/ng8-data-table.directive';
import { SortEvent } from '../../interfaces/sort-event';

@Component({
  selector: 'ng8-column-sorter',
  templateUrl: './column-sorter.component.html',
  styleUrls: ['./column-sorter.component.css']
})
export class ColumnSorterComponent implements OnInit {
  @Input() sortBy: string;

  public isSortedByMeAsc: boolean = false;
  public isSortedByMeDesc: boolean = false;

  public constructor(private dataTable: Ng8DataTableDirective) { }

  public ngOnInit(): void {
    this.dataTable.onSortChange.subscribe((event: SortEvent) => {
      this.isSortedByMeAsc = (event.sortBy == this.sortBy && event.sortOrder == "asc");
      this.isSortedByMeDesc = (event.sortBy == this.sortBy && event.sortOrder == "desc");
    });
  }

  public sort() {
    console.log(this.sortBy);
    console.log("Asc: " + this.isSortedByMeAsc);
    if (this.isSortedByMeAsc) {
      this.dataTable.setSort(this.sortBy, "desc");
    } else {
      this.dataTable.setSort(this.sortBy, "asc");
    }
  }
}
