import { Component, OnInit, Input } from '@angular/core';
import { DataTable } from '../../data-table';
import { SortEvent } from '../../interfaces/sort-event';


@Component({
  selector: 'ng8-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {
  @Input() sortBy: string;

  public isSortedByMeAsc: boolean = false;
  public isSortedByMeDesc: boolean = false;

  public constructor(private dataTable: DataTable) { }

  public ngOnInit(): void {
    this.dataTable.onSortChange.subscribe((event: SortEvent) => {
      this.isSortedByMeAsc = (event.sortBy == this.sortBy && event.sortOrder == "asc");
      this.isSortedByMeDesc = (event.sortBy == this.sortBy && event.sortOrder == "desc");
    });
  }

  public sort() {
    if (this.isSortedByMeAsc) {
      this.dataTable.setSort(this.sortBy, "desc");
    } else {
      this.dataTable.setSort(this.sortBy, "asc");
    }
  }
}
