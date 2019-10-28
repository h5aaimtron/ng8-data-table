import { Component, Input, OnChanges, SimpleChange, Optional } from '@angular/core';
import { Ng8DataTableDirective } from '../../directives/ng8-data-table.directive';
import { PageEvent } from '../../interfaces/page-event';

@Component({
  selector: 'ng8-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnChanges {
  @Input() dataTable: Ng8DataTableDirective;
  private _table: Ng8DataTableDirective

  public activePage: number;
  public rowsOnPage: number;
  public dataLength: number = 0;
  public lastPage: number;

  constructor(@Optional() private injectedTable: Ng8DataTableDirective) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    this._table = this.dataTable || this.injectedTable;
    this.onPageChangeSubscriber(this._table.getPage());
    this._table.onPageChange.subscribe(this.onPageChangeSubscriber);
  }

  public setPage(pageNumber: number): void {
    this._table.setPage(pageNumber, this.rowsOnPage);
  }

  public setRowsOnPage(rowsOnPage: number): void {
    this._table.setPage(this.activePage, rowsOnPage);
  }

  private onPageChangeSubscriber = (event: PageEvent) => {
    this.activePage = event.activePage;
    this.rowsOnPage = event.rowsOnPage;
    this.dataLength = event.dataLength;
    this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
  };

}
