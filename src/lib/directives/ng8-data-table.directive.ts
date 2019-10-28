import { Directive, OnChanges, DoCheck, Input, Output, EventEmitter, IterableDiffer, IterableDiffers, SimpleChange } from '@angular/core';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';

import { SortEvent } from '../interfaces/sort-event';
import { PageEvent } from '../interfaces/page-event';
import { FilterEvent } from '../interfaces/filter-event';

@Directive({
  selector: 'table[ng8DataTable]',
  exportAs: 'ng8DataTable'
})
export class Ng8DataTableDirective implements OnChanges, DoCheck {
  private diff: IterableDiffer<any>;

  @Input("data") public inputData: any[] = [];

  /**
   * Sorting 
   */
  @Input("sortBy") public sortBy: string | string[] = "";
  @Input("sortOrder") public sortOrder = "asc";
  @Output("sortByChange") public sortByChange = new EventEmitter<string | string[]>();
  @Output("sortOrderChange") public sortOrderChange = new EventEmitter<string>();

  /**
   * Filtering
   */
  @Input("filterBy") public filterBy: string;
  @Input("filterValue") public filterValue: string[] = [];
  @Output("filterByChange") public filterByChange = new EventEmitter<string | string[]>();
  @Output("filterValueChange") public filtervalueChange = new EventEmitter<string | string[]>();

  /**
   * Paging
   */
  @Input("rowsOnPage") public rowsOnPage = 1000;
  @Input("activePage") public activePage = 1;

  private mustRecalculateData = false;

  public data: any[];

  public onSortChange = new ReplaySubject<SortEvent>(1);
  public onPageChange = new EventEmitter<PageEvent>();
  public onFilterChange = new EventEmitter<FilterEvent>();

  public constructor(private differs: IterableDiffers) {
    this.diff = differs.find([]).create(null);
  }

  public getFilter(): FilterEvent {
    return { filterBy: this.filterBy, value: this.filterValue };
  }

  public setFilter(filterBy: string, filterValue: string[]) {
    if (this.filterBy !== filterBy || this.filterValue !== filterValue) {
      this.filterBy = filterBy;
      this.filterValue = filterValue;
      this.mustRecalculateData = true;
      this.onFilterChange.next({ filterBy: filterBy, value: filterValue });
      this.filterByChange.emit(this.filterBy);
      this.filtervalueChange.emit(this.filterValue);
    }
  }

  public getSort(): SortEvent {
    return { sortBy: this.sortBy, sortOrder: this.sortOrder };
  }

  public setSort(sortBy: string | string[], sortOrder: string): void {
    if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
      this.sortBy = sortBy;
      this.sortOrder = _.includes(["asc", "desc"], sortOrder) ? sortOrder : "asc";
      this.mustRecalculateData = true;
      this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
      this.sortByChange.emit(this.sortBy);
      this.sortOrderChange.emit(this.sortOrder);
    }
  }

  public getPage(): PageEvent {
    return { activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.inputData.length };
  }

  public setPage(activePage: number, rowsOnPage: number): void {
    if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
      this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
      this.rowsOnPage = rowsOnPage;
      this.mustRecalculateData = true;
      this.onPageChange.emit({
        activePage: this.activePage,
        rowsOnPage: this.rowsOnPage,
        dataLength: this.inputData ? this.inputData.length : 0
      });
    }
  }

  private calculateNewActivePage(previousRowsOnPage: number, currentRowsOnPage: number): number {
    let firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
    let newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
    return newActivePage;
  }

  private recalculatePage() {
    let lastPage = Math.ceil(this.inputData.length / this.rowsOnPage);
    this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
    this.activePage = this.activePage || 1;

    this.onPageChange.emit({
      activePage: this.activePage,
      rowsOnPage: this.rowsOnPage,
      dataLength: this.inputData.length
    });
  }

  public ngOnChanges(changes: { [key: string]: SimpleChange }): any {
    if (changes["filterBy"] || changes["filterValue"]) {
      if (this.filterBy) {
        this.onFilterChange.next({ filterBy: this.filterBy, value: this.filterValue });
      }
      this.mustRecalculateData = true;
    }
    if (changes["rowsOnPage"]) {
      this.rowsOnPage = changes["rowsOnPage"].previousValue;
      this.setPage(this.activePage, changes["rowsOnPage"].currentValue);
      this.mustRecalculateData = true;
    }
    if (changes["sortBy"] || changes["sortOrder"]) {
      if (!_.includes(["asc", "desc"], this.sortOrder)) {
        console.warn("angular2-datatable: value for input sortOrder must be one of ['asc', 'desc'], but is:", this.sortOrder);
        this.sortOrder = "asc";
      }
      if (this.sortBy) {
        this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
      }
      this.mustRecalculateData = true;
    }
    if (changes["inputData"]) {
      this.inputData = changes["inputData"].currentValue || [];
      this.recalculatePage();
      this.mustRecalculateData = true;
    }
  }

  public ngDoCheck(): any {
    let changes = this.diff.diff(this.inputData);
    if (changes) {
      this.recalculatePage();
      this.mustRecalculateData = true;
    }
    if (this.mustRecalculateData) {
      this.fillData();
      this.mustRecalculateData = false;
    }
  }

  private fillData(): void {
    let data = this.inputData;
    console.log(data);
    // Filter Code
    var filterBy = this.filterBy;
    if (typeof filterBy === 'string' && filterBy.length > 0 && this.filterValue.length > 0) {
      console.log("Filter Code Executed.");
      console.log("FilterBy: " + this.filterBy);
      console.log("Filter Values: " + this.filterValue);
      data = data.filter(item => {
        return this.filterValue.includes(item[this.filterBy]);
      });

      console.log(data);
    }

    // Paging Sets
    this.activePage = this.activePage;
    this.rowsOnPage = this.rowsOnPage;


    // Sort Code
    let offset = (this.activePage - 1) * this.rowsOnPage;
    var sortBy = this.sortBy;
    if (typeof sortBy === 'string' || sortBy instanceof String) {
      data = _.orderBy(data, this.caseInsensitiveIteratee(<string>sortBy), [this.sortOrder]);
    } else {
      data = _.orderBy(data, sortBy, [this.sortOrder]);
    }
    data = _.slice(data, offset, offset + this.rowsOnPage);
    this.data = data;
  }

  private caseInsensitiveIteratee(sortBy: string) {
    return (row: any): any => {
      var value = row;
      for (let sortByProperty of sortBy.split('.')) {
        if (value) {
          value = value[sortByProperty];
        }
      }
      if (value && typeof value === 'string' || value instanceof String) {
        return value.toLowerCase();
      }
      return value;
    };
  }

}
